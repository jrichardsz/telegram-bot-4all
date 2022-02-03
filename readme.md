# Telegram Bot Starter Template

![](./coverage/lines.svg) ![](./coverage/statements.svg) ![](./coverage/branches.svg) ![](./coverage/functions.svg)

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

# Development mode

Useful for test bot commands in local environment without deployment steps

Just run:

```
npm run dev
```

After that, just send an http post to `http://localhost:8080/new-message` with this [json sample](https://github.com/jrichardsz/telegram-bot-starter/wiki/newMessage-real-body-sent-by-telegram):


You must have a log like this:

```
[2020-07-12T23:47:12.369Z]:incoming command: [/by]
[2020-07-12T23:47:12.369Z]:from:Kirito
[2020-07-12T23:47:12.369Z]:searching some command in text:/by
[2020-07-12T23:47:12.369Z]:basic command was found
[2020-07-12T23:47:12.369Z]:command:/by
[2020-07-12T23:47:12.370Z]:Command instance was found for this command? : yes
[2020-07-12T23:47:12.370Z]:commandArguments:
[2020-07-12T23:47:12.370Z]:sending message:My creator is JRichardsz (https://jrichardsz.github.io)
[2020-07-12T23:47:12.371Z]:operation completed.
```

In development mode, message is not sent to chat. Is only printed in console. More details [here](https://github.com/jrichardsz/telegram-bot-starter/wiki/No-real-messages-in-development-mode)

# Production or real mode

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

**/by**

This command will return the creator of this bot. Customization here **application.properties**

---

# Create new commands

## I have no time to understand your geek ideas

- In this case, just duplicate this file **/commands/By.js** into another like **Health.js**
- Open Health.js and replace **By** (real name) with new name **Health**
- Put any string into **next()** callback like: `next('I am very fine sr.');`
- That's all, you will have a new command: **/health**.
- Note the first lower case!!. By default name of your command is the name of the js file but with first letter in lower case.


## How it works?

In order to add new commands, you must understand how commands works:

Command is very simple. Is just a javascript module with :

- constructor
- ask method
  - This method is called every time a user send some text which contains command name like : **/help**
- name method
  - This method is required to save an instance of command in a map with name command as key map.

## New command

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

# Road Map

- Improve default commands
- List commands files (reading commands folder XD)

# Regards

- https://www.sohamkamani.com/blog/2016/09/21/making-a-telegram-bot/
- https://github.com/jrichardsz/static_resources/blob/master/telegram-bot-example.pdf

# Author

- Richard Leon **(JRichardsz)**
