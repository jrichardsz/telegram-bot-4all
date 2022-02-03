const axios = require('axios');

function TelegramBotActions() {

  this.sendMessage = async (chatId, responseText, token) => {
    console.log("sending message:" + responseText);

    // If we've gotten this far, it means that we have received a message and some of our bots are ready to response.
    // Respond by hitting the telegram bot API and responding to the appropriate chat_id with some word
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"

    if (process.env.BOT_MODE === 'development') {
      console.log("mesage was not send. BOT_MODE env is development")
      console.log("More details https://github.com/jrichardsz/telegram-bot-starter/wiki/No-real-messages-in-development-mode")
      return false;
    }

    var response = await axios.post('https://api.telegram.org/bot' + token + '/sendMessage', {
      chat_id: chatId,
      text: responseText
    });
    return true;

  };

}


module.exports = TelegramBotActions;
