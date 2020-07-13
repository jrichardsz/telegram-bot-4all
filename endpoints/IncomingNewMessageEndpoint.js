const uuidv1 		    = require('uuid/v1');

const Log = require(`${appRoot}/common/Log.js`);
const TelegramBotActions = require(`${appRoot}/common/TelegramBotActions.js`);
const Helper = require(`${appRoot}/common/Helper.js`);

var prototype = IncomingNewMessageEndpoint.prototype;

function IncomingNewMessageEndpoint() {
}

prototype.execute = function(req,res,commandsMap) {
  var chatMessageObject = Helper.getMessageByBotEnvironment(req.body);

  global.httpRequestUuid = uuidv1();

  Log.info("\n");
  Log.info("incoming command: ["+chatMessageObject.text+"]");
  Log.info("from:"+chatMessageObject.from.first_name);

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  if (!chatMessageObject.text) {
    // In case a message is not present do nothing and return an empty response
    Log.info("text is empty or wrong");
    return res.end()
  }

  Log.info("searching some command in text:"+chatMessageObject.text.toLowerCase());

  var commandFounded;

  var basicCommand = Helper.searchBasicCommand(chatMessageObject.text.toLowerCase());

  if (typeof basicCommand !== 'undefined') {
     commandFounded = basicCommand;
     Log.info("basic command was found");
  }else {
    var humanV1Command = Helper.searchHumanV1Command(chatMessageObject.text.toLowerCase(),commandsMap);
    if (typeof humanV1Command !== 'undefined') {
      commandFounded = humanV1Command;
      Log.info("human v1 command was found");
    }
  }

  Log.info("command:"+commandFounded);

  if (typeof commandFounded === 'undefined') {
    TelegramBotActions.sendMessage(chatMessageObject, "The text you have entered does not contain any command that I know.",req, res);
    return res.end();
  }

  // get command instance in order to use it!
  var commandInstance = commandsMap[commandFounded];
  Log.info("Command instance was found for this command? : "+((commandInstance)?'yes':'no'));

  var commandArguments = chatMessageObject.text.toLowerCase().replace(commandFounded, "");
  Log.info("commandArguments:"+commandArguments);

  if(typeof commandInstance !== 'undefined'){
    commandInstance.ask(commandArguments, function(botResponse){
      TelegramBotActions.sendMessage(chatMessageObject,botResponse,req, res);
      Log.info("operation completed.");
    });
  }else {
    Log.info("command was not registered");
    TelegramBotActions.sendMessage(chatMessageObject, "The text you have entered has the command ["+commandFounded+"] but nothing is responding to it.",req, res);
    Log.info("operation completed.");
  }  
};

module.exports = IncomingNewMessageEndpoint;
