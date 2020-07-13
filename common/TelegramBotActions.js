const Log = require("./Log.js");
const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;

var exports = module.exports = {};

exports.sendMessage = function(message, responseText, req, res) {
  Log.info("sending message:" + responseText);

  // If we've gotten this far, it means that we have received a message and some of our bots are ready to response.
  // Respond by hitting the telegram bot API and responding to the appropriate chat_id with some word
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"

  if (process.env.BOT_MODE === 'development') {
    Log.info("mesage was not send. BOT_MODE env is development")
    Log.info("More details https://github.com/jrichardsz/telegram-bot-starter/wiki/No-real-messages-in-development-mode")

    return res.end('ok');
  }

	console.log("axios!!");

  axios.post('https://api.telegram.org/bot' + token + '/sendMessage', {
      chat_id: message.chat.id,
      text: responseText
    })
    .then(response => {
      // We get here if the message was successfully posted
      Log.info('message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
			console.log(">>>>");
      Log.info('error :', err)
      res.end('error :' + err)
    })
};
