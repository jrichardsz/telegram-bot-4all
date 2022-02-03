const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

var exports = module.exports = {};


exports.getMessageByBotEnvironment = function(body) {
  // const {message} = req.body //this works only in windows but no in heroku
  // const message = req.body	//this works only in heroku but no in windows

  //this works in all environments
  if (process.env.BOT_ENV === 'development') {
    return body;
  } else {
    var {
      message
    } = body
    return message;
  }
};

exports.searchBasicCommand = function(text) {
  var pattern = /^\/.+/;
  var match = pattern.exec(text);

  var result = pattern.test(text);
  if (result === true) {
    if (match && match[0]) {
      return match[0].split(/\s+/)[0]
    }
  }

}

exports.searchHumanV1Command = function(text, commandsMap) {

  var firstWord = text.split(" ")[0];

  if (typeof firstWord !== 'undefined') {
    if (commandsMap[firstWord] !== 'undefined') {
      return firstWord;
    }
  }
}

exports.initializeCommandsV1 = function(commandsMap) {
  fs.readdirSync(`${appRoot}/commands/`).forEach(function(file) {
    var commandRequire = require(`${appRoot}/commands/` + file);
    var command = new commandRequire();
    console.log("registering new command:"+command.name());
    commandsMap[command.name()] = command;
  });
}

exports.scanAndInstantiateCommands = async function(commandsLocation) {
  var files;
  try{
    files = await fsPromises.readdir(commandsLocation);
  }catch(err){
    console.log("Failed while commands are beign readed");
    console.log(err);
    return {};
  }
  var instancedBotCommands = {};
  var errorsOnInstantiateCommand = {};
  files.forEach((file) => {
    var commandRequire = require(path.join(commandsLocation, file));
    var command = new commandRequire();
    try{
      console.log("registering new command:"+command.name());
      instancedBotCommands[command.name()] = command;
    }catch(err){
      errorsOnInstantiateCommand[path.join(commandsLocation, file)] = err.toString();
    }
  });
  return {
    commands: instancedBotCommands,
    errors: errorsOnInstantiateCommand
  };
}
