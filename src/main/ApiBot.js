const path = require('path');
const express = require('express');
const util = require('util');
const app = express();
const bodyParser = require('body-parser');
const Helper = require("./common/Helper.js");
const NewMessageEndpoint = require("./endpoints/NewMessageEndpoint.js");

function ApiBot() {

  this.newMessageEndpoint = new NewMessageEndpoint();

  this.init = async (commandsLocation) => {
    var port = process.env.PORT || 8080;

    app.use(bodyParser.json());
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    // instance commands scanning
    var scannedInformation = await Helper.scanAndInstantiateCommands(commandsLocation);

    this.newMessageEndpoint.setCommands(scannedInformation.commands);
    app.post('/new-message', this.newMessageEndpoint.execute);

    function listen(port) {
      return new Promise((resolve, reject) => {
        app.listen(port)
          .once('listening', resolve)
          .once('error', reject);
      });
    }

    await listen(port);
    console.log('ApiBot sever is running on:' + port);
  };
}


module.exports = ApiBot;
