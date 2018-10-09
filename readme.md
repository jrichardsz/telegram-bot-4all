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

# Step 1 : Telegram previous configurations

- Start new telegram chat with botFather and send the following commands:
- /start
- /newbot
- Enter : Name of your Bot
- Enter : Id of your Bot

  This step , will return to you the token. This is required to register and interact with your bot.

# Step 2 : Deploy your bot

- Clone this repository
- Create an account in heroku (for instance)
- Create a configuration variable called : **TELEGRAM_BOT_TOKEN** with token gotten in previous step.
- Push and save the public url of this heroku application.

# Step 3 :Register bot in Telegram Servers

**Note :** Execute this step if your bot is ready to use (deployed in somewhere)

You need to deploy your bot (this source code) in a **public server or domain**:

- Heroku
- Openshift
- https://zeit.co/now
- Some server by your own

If your bot is deployed and has a url like:

- https://my_awesome_bot.herokuapp.com

You must register it, executing this:

```
curl -F "url=https://my_awesome_bot.herokuapp.com/new-message"  https://api.telegram.org/bot<your_api_token>/setWebhook
```

# Step 4: Chat with your bot

Start a new chat with your bot and enter :

**/help**

This command will return you a list of default commands of your bot.

---

### Add new commands

In order to add new commands, you must understand how commands works:

#### Command strategy

Commands are very simple. Is just a javascript module with :

- constructor
- ask method
  - This method is called every time a user send some text which contains command name like : **/help**
- name method
  - This method is required to save an instance of command in a map with name command as key map.

#### New command

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

### Start Bot for Development purposes

- npm install
- npm run dev


### Test bot commands in local environment

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

## /by

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

## /help

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

# Regards

- https://www.sohamkamani.com/blog/2016/09/21/making-a-telegram-bot/
- https://github.com/jrichardsz/static_resources/blob/master/telegram-bot-example.pdf

# Author

- Richard Leon **(JRichardsz)**
