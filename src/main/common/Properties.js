var exports = module.exports = {};

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('application.properties');

exports.get = function(propertyName) {
  return properties.get(propertyName);
};