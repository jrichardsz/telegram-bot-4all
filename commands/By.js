var Properties = require(`${appRoot}/common/Properties.js`);

var prototype = By.prototype;
var botName;

function By() {
  botName = Properties.get("basic.command.start.char") + prototype.constructor.name.toLowerCase();
}

prototype.ask = function(commandArguments, next) {
  next(Properties.get("author"));
};

prototype.name = function() {
  return botName;
};

module.exports = By;