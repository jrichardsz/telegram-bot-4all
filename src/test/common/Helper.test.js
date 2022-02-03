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
  it('should returns empty object on wrong location', async function() {
    var commandInstances = await Helper.scanAndInstantiateCommands("/foo/bar");
    expect(commandInstances).to.eql({});
  });
  it('should returns error on commands without any expected methods', async function() {
    var commandsFolder = path.join(sourceCodeRoot,"src", "test", "resources", "common", "Helper.test.js", "no-methods-commands")
    var scanResponse = await Helper.scanAndInstantiateCommands(commandsFolder);
    var commandsCount = Object.keys(scanResponse.commands).length;
    var errorsCount = Object.keys(scanResponse.errors).length;
    expect(commandsCount).to.eql(0);
    expect(errorsCount).to.eql(2);
  });
  it('should returns valid commands on existent location', async function() {
    var commandsFolder = path.join(sourceCodeRoot,"src", "test", "resources", "common", "Helper.test.js", "success-commands")
    var scanResponse = await Helper.scanAndInstantiateCommands(commandsFolder);
    var commandsCount = Object.keys(scanResponse.commands).length;
    var errorsCount = Object.keys(scanResponse.errors).length;
    expect(commandsCount).to.eql(2);
    expect(errorsCount).to.eql(0);
  });
});
