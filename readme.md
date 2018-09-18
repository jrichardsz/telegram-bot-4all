# Telegram Bot Starter Template

![image](https://raw.githubusercontent.com/jrichardsz/static_resources/master/node-telegram-bot-intro.jpg)

This repository is a simple starter to develop a telegram bot.

# Goal

Serve as a starting point to develop telegram personal or public bots like :

- List my movies
- List my schedule
- Get random names
- Anything in our minds :D

# Requirements

- Node.js 8
- Telegram account
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

# Register bot in Telegram Servers

**Note :** Execute this step if your bot is ready to use (deployed in somewhere)

You need to deploy your bot (this source code) in a **public server or domain**:

- Heroku
- Openshift
- https://zeit.co/now
- Some server by your own

If your bot is deployed and has a domain like:

- https://my_awesome_bot.herokuapp.com

You must register it, executing this:

```
curl -F "url=https://my_awesome_bot.herokuapp.com/new-message"  https://api.telegram.org/bot<your_api_token>/setWebhook
```

# Start Bot in Development mode

- npm install
- npm run dev

# Start in Production mode

- npm install
- export TELEGRAM_BOT_TOKEN="my_generated_token_using_botfather"
- npm run start

# Test bot commands in local environment

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

## /by command

```
curl -H "Content-Type: application/json" -X POST -d '{"text":"/by","from":{"first_name":"Richard"}}' \
http://localhost:8080/new-message
```

**Success Log**

```
incoming command: [/by]
from:Richard
searching command in text:/by
basic command:/by
Command instance was found for this command? : yes
commandArguments:
sending message:JRichardsz
mesage was not send. BOT env is local (development mode)
operation completed.
```

## /help command

```
curl -H "Content-Type: application/json" -X POST -d '{"text":"/help","from":{"first_name":"Richard"}}' \
http://localhost:8080/new-message
```

**Success Log**

```
incoming command: [/help]
from:Richard
searching command in text:/help
basic command:/help
Command instance was found for this command? : yes
commandArguments:
sending message:Hi, I am Template Starter Bot, and this are my commands: ...
mesage was not send. BOT env is local (development mode)
operation completed.
```

In development mode, message is not sent to chat. Is only printed in console.

# Command strategy

Commands are very simple. Is just a javascript module with :

- constructor
- ask method
  - This method is called every time a user send some text which contains command name like : **/help**
- name method
  - This method is required to save an instance of command in a map with name command as key map.

# Add new commands

By default, this bot has two commands:

- /by
  - Show the author of this bot
- /help
  - Show a list of commands and some tips     

If you want to add new command, follow this steps :

- Copy/past **By**  or **Help** commands, located in **commands** folder (In order to comply with **Command Strategy**)
- Rename to some name like : **Hello.js**. This name will be the command name to use.
- Replace **old name** occurrences by **new name** : Hello
- Add some logic inside **ask** method. Don't forget to return some string.

That's all. Restart application and a new command called **/hello** are available :D


# Regards

- https://www.sohamkamani.com/blog/2016/09/21/making-a-telegram-bot/
- https://github.com/jrichardsz/static_resources/blob/master/telegram-bot-example.pdf

# Author

- Richard Leon **(JRichardsz)**
