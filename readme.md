# Telegram Bot 4all

![](./coverage/lines.svg) ![](./coverage/statements.svg) ![](./coverage/branches.svg) ![](./coverage/functions.svg)

![image](https://i.ibb.co/r0Yq2qd/telegram-bot-4-all-home.png)

Create telegram bots never been so easy.

# Goal

Serve as a starting point to develop telegram personal or public bots like :

- List my movies
- List my schedule
- Get random names
- Or whatever you want

# Requirements

- Node.js >=14
- Telegram account
- Telegram Token (BotFather)

# Steps

### Step 1 : Telegram previous configurations

- Start new telegram chat with botFather and send the following commands:
- /start
- /newbot
- Enter : Name of your Bot
- Enter : Id of your Bot

  This step , will return to you the **token**. This is required to register and interact with your bot. Save it!!!

### Step 2 : Create the bot with nodejs

- Clone the template : https://github.com/jrichardsz/telegram-bot-4all-demo.git
- This template has a command sample called **/author** who returns the name of creator of this tool

### Step 3 : Deploy your bot

You need to deploy your bot (this source code) in a **public server or domain**: using some free or private service like: Heroku, Openshift, https://zeit.co/now, etc

Example with heroku:

- Create an account in heroku (for instance)
- Create a configuration variable called : **TELEGRAM_BOT_TOKEN** with token gotten in previous step.
- Push and save the public url of this heroku application.

### Step 4 : Register bot in Telegram Servers

If your bot is deployed and has a url like:

- https://my_awesome_bot.herokuapp.com

You must register it, executing this:

```
curl -F "url=https://my_awesome_bot.herokuapp.com/new-message"  https://api.telegram.org/bot<your_api_token>/setWebhook
```

### Step 5: Chat with your bot

If you followed all the steps without errors, you could use this command with your own bot:

![](https://i.ibb.co/VD5BTG1/telegram-bot-4all-sample.png)

If you don't have any response, check de logs or review the telegram father configurations.

# Create new commands

- We will create a command who return the data of the current day
- Create a module inside of commands folder. The **doit** method is mandatory

```
function Today() {
  this.doit = (commandArguments, chatMessageObject) => {
    var today = new Date();
    return today.toISOString().substring(0, 10);
  }
}
module.exports = Today;
```

The framework will inject you two variables: `(commandArguments, chatMessageObject)` in the `doit` method

**commandArguments**

The parameters received with your command. If the chat was: `/buy_coffee param1 param2`, you will receive: `param1 param2`

**chatMessageObject**

The entire json sent by telegram bot internal engine: 

```
{
  "message": {
    "from": {
      "id": 123456,
      "is_bot": false,
      "first_name": "JohnDoe",
      "last_name": "ENL",
      "username": "john_doe"
    },
    "chat": {
      "id": 87865786,
      "title": "My group or chat title",
      "type": "group"
    },
    "text": "/author param1 param2"
  }
}
```

You could use these variables for what you want to do with your bot command.

- That's all. Redeploy your bot and you will have a new command, ready to use it in the chat with `/today`

# Road Map

- [ ] Emulate telegram service for local tests
- [ ] Add self webhook endpoint
- [ ] Add complex feature : receive images
- [ ] Add complex feature : receive form data
- [ ] Add complex feature : payments


# Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>    
  </tbody>
</table>
