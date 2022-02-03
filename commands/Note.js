var Properties = require(`${appRoot}/common/Properties.js`);
const axios = require('axios');

var prototype = Note.prototype;
var botName;

function Note() {
  botName = Properties.get("basic.command.start.char") + prototype.constructor.name.toLowerCase();
}

prototype.ask = function(commandArguments, next) {

  axios.get('https://script.google.com/macros/s/AKfycbyjQvjMYUdmg8kfWZhdiPRbFJZbNwJZ7uyQ7k5JIZI8hSw6rXR2UtNsSvhP3buHtE_W/exec', {
      params: {
        token: "45006bf2-da19-491f-8637-cdb7fa6838e9",
        operation: "create",
        group_id: 12345,
        datetime: 12345,
        note: commandArguments
      }
    })
    .then(function (response) {
      console.log(response);
      next("note saved");
    })

};

prototype.name = function() {
  return botName;
};

module.exports = Note;
