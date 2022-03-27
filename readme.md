# Telegram Bot 4all

![](./coverage/lines.svg) ![](./coverage/statements.svg) ![](./coverage/branches.svg) ![](./coverage/functions.svg)

![image](https://raw.githubusercontent.com/jrichardsz/static_resources/master/node-telegram-bot-intro.jpg)

Create telegram bots never been so easy.

# Goal

Serve as a starting point to develop telegram personal or public bots like :

- List my movies
- List my schedule
- Get random names
- Anything in your mind

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

  This step , will return to you the token. This is required to register and interact with your bot.

### Step 2 : New commands

- Clone the template : https://github.com/jrichardsz/telegram-bot-4all-demo.git
- Create a folder called `commands` and add the modules following the required syntax.

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

Start a new chat with your bot and enter anything like:

`/foo`

Response should be:

`My creator has not configured any command. Contact it.`

---

# Create new commands

- Create a module inside of commands folder. The **doit** method is mandatory

```
function Today() {
  this.doit = () => {
    var today = new Date();
    return today.toISOString().substring(0, 10);
  }
}
module.exports = Today;
```
- That's all. Redeploy your bot and you will have a new command, ready to use it in the chat with `/today`

# Road Map

- [ ] Emulate telegram service for local tests
- [ ] Add self webhook endpoint


# Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">Richard Leon</a></label>
      <br />
    </td>    
  </tbody>
</table>
