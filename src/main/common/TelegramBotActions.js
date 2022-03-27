const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;

function TelegramBotActions() {

  this.sendMessage = async (chatId, responseText) => {
    console.log("sending message:" + responseText);
    var response = await axios.post('https://api.telegram.org/bot' + token + '/sendMessage', {
      chat_id: chatId,
      text: responseText
    });
    return response;
  };
}


module.exports = TelegramBotActions;
