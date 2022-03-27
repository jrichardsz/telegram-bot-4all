var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const axios = require('axios');
const sinon = require('sinon');
const NewMessageEndpoint = require("../../main/endpoints/NewMessageEndpoint.js");
const TelegramBotActions = require("../../main/common/TelegramBotActions.js");

function Acme() {
  this.doit = () => {
    return "im the bot"
  }
}

var commandsMap = {
  "acme": new Acme()
}

var resMock = function() {
  this.headers = {};
  this.end = function(data) {
    return data;
  }
  this.set = function(key, value) {
    this.headers[key] = value;
  }
}

const successResponseTelegramEngineMock = {
  json: {
    message: "received"
  },
  status: 200
};

const res =  { json: {greet: "hello"}, status: 200};
var mockStub;

describe('NewMessageEndpoint: execute', function() {

  it('should return code-to-client=500 if there is not command instances', async function() {

    var newMessageEndpoint = new NewMessageEndpoint();
    var resMockInstance = new resMock();
    var newMessageEndpointResponse = await newMessageEndpoint.execute({
      body: {
        message: {
          text: "",
          from: {
            "first_name": "Jrichardsz"
          },
          chat: {
            id: "foo"
          }
        }
      }
    }, resMockInstance);

    expect(newMessageEndpointResponse).to.eql('ok');
    expect(resMockInstance.headers["code-to-client"]).to.eql(500);
  });

  it('should return code-to-client=501 if text is empty or null', async function() {

    var newMessageEndpoint = new NewMessageEndpoint();
    var resMockInstance = new resMock();
    newMessageEndpoint.setCommands(commandsMap);
    var newMessageEndpointResponse = await newMessageEndpoint.execute({
      body: {
        message: {
          text: "",
          from: {
            "first_name": "Jrichardsz"
          },
          chat: {
            id: "foo"
          }
        }
      }
    }, resMockInstance);

    expect(newMessageEndpointResponse).to.eql('ok');
    expect(resMockInstance.headers["code-to-client"]).to.eql(501);
  });

  it('should return code-to-client=502 if text is fine but dont contain a valid bot syntax', async function() {

    var newMessageEndpoint = new NewMessageEndpoint();
    newMessageEndpoint.setCommands(commandsMap);
    var resMockInstance = new resMock();
    var newMessageEndpointResponse = await newMessageEndpoint.execute({
      body: {
        message: {
          text: "foo bar baz",
          from: {
            "first_name": "Jrichardsz"
          },
          chat: {
            id: "foo"
          }
        }
      }
    }, resMockInstance);

    expect(newMessageEndpointResponse).to.eql('ok');
    expect(resMockInstance.headers["code-to-client"]).to.eql(502);
  });

  it('should return code-to-client=503 if text is fine and contains a valid bot syntax but dont exist as command instance', async function() {

    var resMockInstance = new resMock();
    var newMessageEndpoint = new NewMessageEndpoint();
    newMessageEndpoint.setCommands(commandsMap);
    var newMessageEndpointResponse = await newMessageEndpoint.execute({
      body: {
        message: {
          text: "/foo bar baz",
          from: {
            "first_name": "Jrichardsz"
          },
          chat: {
            id: "foo"
          }
        }
      }
    }, resMockInstance);

    expect(newMessageEndpointResponse).to.eql('ok');
    expect(resMockInstance.headers["code-to-client"]).to.eql(503);
  });

  it('should return code-to-client=200  if text is fine and contains a valid bot syntax and exists as command instance', async function() {

    var resMockInstance = new resMock();

    var newMessageEndpoint = new NewMessageEndpoint();
    newMessageEndpoint.setCommands(commandsMap);
    var newMessageEndpointResponse = await newMessageEndpoint.execute({
      body: {
        message: {
          text: "/acme bar baz",
          from: {
            "first_name": "Jrichardsz"
          },
          chat:{
            id:"foo"
          }
        }
      }
    }, resMockInstance);

    expect(newMessageEndpointResponse).to.eql('ok');
    expect(resMockInstance.headers["code-to-client"]).to.eql(200);
  });

  beforeEach(function() {
    mockStub = sinon.stub(axios, 'post').resolves(res);
  });

  afterEach(function() {
    mockStub.restore();
  });
});
