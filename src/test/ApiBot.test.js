var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const axios = require('axios');
const sinon = require('sinon');
const ApiBot = require("../main/ApiBot.js");
const NewMessageEndpoint = require("../main/endpoints/NewMessageEndpoint.js");

const successResponseTelegramEngineMock = {
  json: {
    message: "received"
  },
  status: 200
};

describe('ApiBot: init', function() {
  it('should register the default command on empty commands', async function() {

    process.env.TELEGRAM_BOT_TOKEN = 123;

    var apiBot = new ApiBot();

    var newMessageEndpointMock = function() {
      this.execute = function(req, res) {
        return res.send("ok");
      }
      this.setCommands = function() {
      }
    }

    apiBot.newMessageEndpoint = new newMessageEndpointMock();
    await apiBot.init(__dirname + "/resources/ApiBot.test.js/empty-commands")

    var response = await axios.post('http://localhost:8080/new-message', {
      "message": {
        "from": {
          "id": 123,
          "is_bot": false,
          "first_name": "Kirito",
          "last_name": "ENL",
          "username": "Kiritoxz"
        },
        "chat": {
          "id": 456,
          "title": "Season anime bot test",
          "type": "group",
          "all_members_are_administrators": true
        },
        "text": "/aaa bbbb"
      }
    });
    expect(response.data).to.eql("ok");

  });
});
