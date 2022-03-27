const uuidv1 = require('uuid/v1');
const TelegramBotActions = require("../common/TelegramBotActions.js");
const Helper = require("../common/Helper.js");

function NewMessageEndpoint() {

  this.telegramBotActions = new TelegramBotActions();
  this.commandsMap = {};

  this.setCommands = (commandsMap) => {
    this.commandsMap = commandsMap;
  }

  this.execute = async (req, res) => {

    var chatMessageObject = req.body.message;

    console.log("incoming message: "+JSON.stringify(chatMessageObject, null, 4));

    console.log("\n");
    console.log("incoming raw string : [" + chatMessageObject.text + "]");
    console.log("from:" + chatMessageObject.from.first_name);

    if (Object.keys(this.commandsMap).length == 0) {
      var message = "My creator has not configured any command. Contact it.";
      console.log(message);
      var sendMessageResponse = await this.telegramBotActions.sendMessage(chatMessageObject.chat.id, message);
      console.log("telegram engine bot response:");
      console.log(sendMessageResponse.statusText);
      res.set("code-to-client",500);
      return res.end('ok')
    }

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
    if (chatMessageObject.text.replace(/\s/g, "") == "") {
      // In case a message is not present do nothing and return an empty response
      var message = "received text is empty";
      console.log(message);
      var sendMessageResponse = await this.telegramBotActions.sendMessage(chatMessageObject.chat.id, message);
      console.log("telegram engine bot response:");
      console.log(sendMessageResponse.statusText);
      res.set("code-to-client",501);
      return res.end('ok')
    }

    console.log("searching some command in text: " + chatMessageObject.text.toLowerCase());

    var commandFounded = Helper.searchBasicCommand(chatMessageObject.text.toLowerCase());

    if (typeof commandFounded === 'undefined') {
      var message = "basic command syntax was not found in the received text: [" + chatMessageObject.text + "] Expected syntax: /foo /help /whatever";
      console.log(message);
      var sendMessageResponse = await this.telegramBotActions.sendMessage(chatMessageObject.chat.id, message);
      console.log("telegram engine bot response:");
      console.log(sendMessageResponse.statusText);
      res.set("code-to-client",502);
      return res.end('ok')
    }

    // get command instance in order to use it!
    var botCommandInstance = this.commandsMap[commandFounded];
    if (typeof botCommandInstance === 'undefined') {
      console.log("Command instance was not found for this command : " + commandFounded);
      var sendMessageResponse = await this.telegramBotActions.sendMessage(chatMessageObject.chat.id,
        "The text you have entered has a valid command [" + chatMessageObject.text + "] but there is not a command instance to handle it");
      console.log("telegram engine bot response:");
      console.log(sendMessageResponse.statusText);
      res.set("code-to-client",503);
      return res.end('ok')
    }

    console.log("Command instance was found for this command : " + commandFounded);

    var commandArguments = chatMessageObject.text.toLowerCase().replace(commandFounded, "").trim();
    console.log("commandArguments:" + commandArguments);

    var botResponse = await Promise.resolve(botCommandInstance.doit(commandArguments, chatMessageObject));
    console.log("bot response:");
    console.log(botResponse);
    var sendMessageResponse;
    try {
      sendMessageResponse = await this.telegramBotActions.sendMessage(chatMessageObject.chat.id, botResponse);
      console.log("operation completed.");
      console.log("telegram engine bot response:");
      console.log(sendMessageResponse.statusText);
      res.set("code-to-client",200);
      return res.end('ok')
    } catch (e) {
      console.log(e);
      res.set("code-to-client",504);
      return res.end('ok')
    }

  };

}



module.exports = NewMessageEndpoint;
