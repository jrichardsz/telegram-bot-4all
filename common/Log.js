const fs = require('fs');

var exports = module.exports = {};

exports.info = function(message) {
  console.log(`[${httpRequestUuid}]:` + message);
};
