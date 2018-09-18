var Properties = require(`${appRoot}/common/Properties.js`);

var prototype = Help.prototype;
var botName;

function Help() {
	  botName = "/"+prototype.constructor.name.toLowerCase();
}

prototype.ask = function(commandArguments) {

	var response = "Hi, I am "+Properties.get("chat.bot.name");

	return response;
};

prototype.name = function() {
	return botName;
};

module.exports = Help;
