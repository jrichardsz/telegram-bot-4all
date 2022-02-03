const uuidv1 = require('uuid/v1');
const TelegramBotActions = require("../common/TelegramBotActions.js");
const Helper = require("../common/Helper.js");
const TelegramBotActions = require("../common/TelegramBotActions.js");

function NewMessageEndpoint(commandsMap) {

  var telegramBotActions = new TelegramBotActions();

  this.execute = async (req,res) => {

    var chatMessageObject = Helper.getMessageByBotEnvironment(req.body);

    console.log(JSON.stringify(chatMessageObject, null, 4));

    global.httpRequestUuid = uuidv1();

    console.log("\n");
    console.log("incoming command: ["+chatMessageObject.text+"]");
    console.log("from:"+chatMessageObject.from.first_name);

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
    if (!chatMessageObject.text) {
      // In case a message is not present do nothing and return an empty response
      console.log("text is empty or wrong");
      return res.end()
    }

    console.log("searching some command in text:"+chatMessageObject.text.toLowerCase());

    var commandFounded;

    var basicCommand = Helper.searchBasicCommand(chatMessageObject.text.toLowerCase());

    if (typeof basicCommand !== 'undefined') {
       commandFounded = basicCommand;
       console.log("basic command was found");
    }else {
      var humanV1Command = Helper.searchHumanV1Command(chatMessageObject.text.toLowerCase(),commandsMap);
      if (typeof humanV1Command !== 'undefined') {
        commandFounded = humanV1Command;
        console.log("human v1 command was found");
      }
    }

    console.log("command:"+commandFounded);

    if (typeof commandFounded === 'undefined') {
      var sendMessageResponse = await telegramBotActions.sendMessage(chatMessageObject.chat.id, "The text you have entered does not contain any command that I know.");
      return res.end();
    }

    // get command instance in order to use it!
    var commandInstance = commandsMap[commandFounded];
    console.log("Command instance was found for this command? : "+((commandInstance)?'yes':'no'));

    var commandArguments = chatMessageObject.text.toLowerCase().replace(commandFounded, "").trim();
    console.log("commandArguments:"+commandArguments);

    if(typeof commandInstance !== 'undefined'){
      commandInstance.ask(commandArguments, function(botResponse){
        var sendMessageResponse = await telegramBotActions.sendMessage(chatMessageObject,botResponse);
        console.log("operation completed.");
        return res.end('ok')
      });
    }else {
      console.log("command was not registered");
      await telegramBotActions.sendMessage(chatMessageObject.chat.id, "The text you have entered has the command ["+commandFounded+"] but nothing is responding to it.",req, res);
      console.log("operation completed.");
    }
  };

}



module.exports = NewMessageEndpoint;
