const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Helper = require("./common/Helper.js");
const NewMessageEndpoint = require("./endpoints/NewMessageEndpoint.js");

function Server() {

  var commandsMap;

  this.init = async (commandsLocation) => {
    var port = process.env.PORT || 8080;

    app.use(bodyParser.json());
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    // instance commands scanning
    commandsMap = await Helper.scanAndInstantiateCommands(commandsLocation);

    var newMessageEndpoint = new NewMessageEndpoint(commandsMap);
    app.post('/new-message', newMessageEndpoint.execute);

    // Finally, start our server
    app.listen(port, function() {
      console.log('Telegram-bot sever is running on:' + port);
    });
  };
}


module.exports = Server;
