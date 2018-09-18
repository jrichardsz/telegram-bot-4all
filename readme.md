# Telegram Bot Starter Template

This repository is a simple starter to develop a telegram bot.

# Requirements

- Node.js 8
- Telegram Token (BotFather)

# Telegram previous configurations

- Start new telegram chat and add botFather
- Send : /start
- Send : /newbot
- Send : Name of your Bot
- Send : Id of your Bot

  This step , will return to you the token. This is required to register and interact with your bot.

- Send : /setjoingroups
- Send : @id_of_your_bot
- Send : Enable

# Register bot

You need to deploy your bot (this source code) in a **public server or domain**:

- Heroku
- Openshift
- https://zeit.co/now
- Some server by your own

If your bot is deployed and has a domain like:

- https://my_awesome_bot.herokuapp.com

You must register it, executing this:

`
curl -F "url=https://my_awesome_bot.herokuapp.com/new-message"  https://api.telegram.org/bot<your_api_token>/setWebhook
`



# Start Bot in Development mode

- npm install
- npm run dev


# Testing

This is a sample of json sent by telegram server to your bot:

```json
{
  "text":"Hello",
  "from":{
    "first_name":"Richard"
  }
}
```

Execute this samples to test the correct behavior of this bot

`
curl -H "Content-Type: application/json" -X POST -d '{"text":"/by","from":{"first_name":"Richard"}}' \
http://localhost:8080/new-message
`

`
curl -H "Content-Type: application/json" -X POST -d '{"text":"/help","from":{"first_name":"Richard"}}' \
http://localhost:8080/new-message
`

Check log console.

# Run in Production mode

- npm install
- export TELEGRAM_BOT_TOKEN="my_generated_token_using_botfather"
- npm run start

# Regards

- https://www.sohamkamani.com/blog/2016/09/21/making-a-telegram-bot/
- https://github.com/jrichardsz/static_resources/blob/master/telegram-bot-example.pdf
