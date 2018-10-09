
//for easy of path in require sentence
const path          = require('path');
global.appRoot = path.resolve(__dirname);

//add date to console.log
require('log-timestamp');

const express 		  = require('express');
const app 			    = express();
const bodyParser 		= require('body-parser');
const Helper        = require("./common/Helper.js");
const Log           = require("./common/Log.js");

const port         	= process.env.PORT || 8080;

//easy log detection in several http request environment
global.httpRequestUuid = "";
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// store commands intances
var commandsMap = [];
// instance commands
Helper.initializeCommands(commandsMap);

// Instance endpoints controllers
const IncomingNewMessageEndpoint  = require("./endpoints/IncomingNewMessageEndpoint.js");
var incomingNewMessageEndpoint = new IncomingNewMessageEndpoint();
// Bot http endpoints

// This is the endpoint the telegram bot api will call
app.post('/new-message', function(req, res) {
  incomingNewMessageEndpoint.execute(req, res,commandsMap);
});

// Finally, start our server
app.listen(port, function() {
    Log.info('Telegram-bot is running on:' + port);
});
