const fs = require('fs');

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
      return match[0]
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

exports.initializeCommands = function(commandsMap) {
  fs.readdirSync(`${appRoot}/commands/`).forEach(function(file) {
    var commandRequire = require(`${appRoot}/commands/` + file);
    var command = new commandRequire();
    commandsMap[command.name()] = command;
  });
}