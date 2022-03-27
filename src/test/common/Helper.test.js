var chai = require('chai');
var path = require('path');
var os = require('os');
var fs = require('fs');
var expect = chai.expect;
var assert = chai.assert;
const Helper = require("../../main/common/Helper.js");
var finder = require('find-package-json');
var f = finder(__dirname);
var sourceCodeRoot = path.dirname(f.next().filename);

describe('Helper: scanAndInstantiateCommands', function() {
  it('should return empty object on wrong location', async function() {
    var commandInstances = await Helper.scanAndInstantiateCommands("/foo/bar");
    expect(commandInstances).to.eql({});
  });
  it('should return error on commands without any expected methods', async function() {
    var commandsFolder = path.join(sourceCodeRoot,"src", "test", "resources", "common", "Helper.test.js", "no-methods-commands")
    var scanResponse = await Helper.scanAndInstantiateCommands(commandsFolder);
    var commandsCount = Object.keys(scanResponse.commands).length;
    var errorsCount = Object.keys(scanResponse.errors).length;
    expect(commandsCount).to.eql(0);
    expect(errorsCount).to.eql(2);
  });
  it('should return error on commands with compilation or severe problems', async function() {
    var commandsFolder = path.join(sourceCodeRoot,"src", "test", "resources", "common", "Helper.test.js", "wrong-commands")
    var scanResponse = await Helper.scanAndInstantiateCommands(commandsFolder);
    var commandsCount = Object.keys(scanResponse.commands).length;
    var errorsCount = Object.keys(scanResponse.errors).length;
    expect(commandsCount).to.eql(0);
    expect(errorsCount).to.eql(1);
  });
  it('should return valid commands on existent location', async function() {
    var commandsFolder = path.join(sourceCodeRoot,"src", "test", "resources", "common", "Helper.test.js", "success-commands")
    var scanResponse = await Helper.scanAndInstantiateCommands(commandsFolder);
    var commandsCount = Object.keys(scanResponse.commands).length;
    var errorsCount = Object.keys(scanResponse.errors).length;
    expect(commandsCount).to.eql(2);
    expect(errorsCount).to.eql(0);
    expect(true).to.eql(Object.keys(scanResponse.commands).includes("foo"));
    expect(true).to.eql(Object.keys(scanResponse.commands).includes("bar"));
  });
});

describe('Helper: searchBasicCommand', function() {
  it('should return undefined on missing raw text', async function() {
    var comandFound = await Helper.searchBasicCommand();
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand(null);
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand(undefined);
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand("");
    expect(comandFound).to.eql(undefined);
  });
  it('should return undefined on raw text without / at the begining', async function() {
    var comandFound = await Helper.searchBasicCommand("foo");
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand("foo /");
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand("foo / bar");
    expect(comandFound).to.eql(undefined);
  });
  it('should return undefined on raw text with / at the begining but missing string', async function() {
    var comandFound = await Helper.searchBasicCommand("/");
    expect(comandFound).to.eql(undefined);
  });
  it('should return undefined on raw text with / at the begining but missing string', async function() {
    var comandFound = await Helper.searchBasicCommand("/");
    expect(comandFound).to.eql(undefined);
  });
  it('should return undefined on raw text with / at the begining but not allowed command name', async function() {
    var comandFound = await Helper.searchBasicCommand("/****");
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand("/...");
    expect(comandFound).to.eql(undefined);
    comandFound = await Helper.searchBasicCommand("/!#$%&=");
    expect(comandFound).to.eql(undefined);
  });
  it('should return valid string on raw text with / at the begining and allowed command name', async function() {
    var comandFound = await Helper.searchBasicCommand("/foo");
    expect(comandFound).to.eql("foo");
  });
});
