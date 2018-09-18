var Properties = require(`${appRoot}/common/Properties.js`);

var prototype = By.prototype;
var botName;

function By() {
	botName = "/"+prototype.constructor.name.toLowerCase();
}

prototype.ask = function(commandArguments) {
	return Properties.get("author");
};

prototype.name = function() {
	return botName;
};

module.exports = By;
