var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const Index = require("../main/Index.js");

describe('Index', function() {
  it('should export the ApiBot', async function() {
    expect(Index.ApiBot)
  });
});
