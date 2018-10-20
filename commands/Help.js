var Properties = require(`${appRoot}/common/Properties.js`);

var prototype = Help.prototype;
var botName;

function Help() {
	botName = Properties.get("basic.command.start.char")+prototype.constructor.name.toLowerCase();
}

prototype.ask = function(commandArguments,next) {
	var response = "Hi, I am "+Properties.get("chat.bot.name")+" and this are my commands: ...";
	next(response);
};

prototype.name = function() {
	return botName;
};

module.exports = Help;
