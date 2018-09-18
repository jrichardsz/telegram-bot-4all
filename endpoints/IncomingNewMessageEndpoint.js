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

  Log.info("incoming command: ["+chatMessageObject.text+"]");
  Log.info("from:"+chatMessageObject.from.first_name);

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  if (!chatMessageObject.text) {
    // In case a message is not present do nothing and return an empty response
    Log.info("text is empty or wrong");
    return res.end()
  }

  Log.info("searching command in text:"+chatMessageObject.text.toLowerCase());

  //get command name from chat text
  var basicCommand = Helper.searchBasicCommand(chatMessageObject.text.toLowerCase());
  Log.info("basic command:"+basicCommand)

  if (!basicCommand) {
    TelegramBotActions.sendMessage(message, "The text you have entered does not contain any command that I know.",req, res);
    return res.end();
  }

  // get command instance in order to use it!
  var commandInstance = commandsMap[basicCommand];
  Log.info("Command instance was found for this command? : "+((commandInstance)?'yes':'no'));

  var commandArguments = chatMessageObject.text.toLowerCase().replace(basicCommand, "");
  Log.info("commandArguments:"+commandArguments);

  if(commandInstance){
    TelegramBotActions.sendMessage(chatMessageObject, commandInstance.ask(commandArguments),req, res);
  }else {
    Log.info("command was not registered");
    TelegramBotActions.sendMessage(chatMessageObject, "El texto que has ingresado no contiene ningun comando que conozco.",req, res);
  }

  Log.info("operation completed.");
  return res.end()
};

module.exports = IncomingNewMessageEndpoint;
