const fs = require('fs');

var exports = module.exports = {};


exports.getMessageByBotEnvironment = function(body) {
  // const {message} = req.body //this works only in windows but no in heroku
	// const message = req.body	//this works only in heroku but no in windows

	//this works in all environments
	if(process.env.BOT_ENV === 'local'){
		return body;
	}else {
		var {message} = body
		return message;
	}
};

exports.searchBasicCommand = function(text) {
	var pattern = /^\/[a-zA-Z]+/;
	var match = pattern.exec(text);

	if(match && match[0]){
		return match[0]
	}
}

exports.initializeCommands = function(commandsMap) {
  fs.readdirSync(`${appRoot}/commands/`).forEach(function(file){
  	var commandRequire = require(`${appRoot}/commands/`+file);
  	var command = new commandRequire();
  	commandsMap[command.name()] = command;
  });
}
