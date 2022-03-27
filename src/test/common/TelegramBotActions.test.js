var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const axios = require('axios');
const sinon = require('sinon');
const TelegramBotActions = require("../../main/common/TelegramBotActions.js");

const res =  { json: {greet: "hello"}, status: 200};
var mockStub;

describe('TelegramBotActions: sendMessage', function() {
  it('should retrieve the bot engine response whatever it be', async function() {
    var telegramBotActions = new TelegramBotActions();
    var botEngineResponse = await telegramBotActions.sendMessage();
    expect(botEngineResponse.status).to.eql(200);
    expect(botEngineResponse.json.greet).to.eql("hello");
  });

  beforeEach(function() {
    mockStub = sinon.stub(axios, 'post').resolves(res);
  });

  afterEach(function() {
    mockStub.restore();
  });
});
