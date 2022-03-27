const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

var exports = module.exports = {};

exports.searchBasicCommand = function(text) {
  var pattern = /^\/[a-zA-Z_]+/;
  var result = pattern.test(text);
  if (result === true) {
    var match = pattern.exec(text);
    return match[0].split(/\//)[1]
  }

}

exports.scanAndInstantiateCommands = async function(commandsLocation) {
  var files;
  try{
    files = await fsPromises.readdir(commandsLocation);
  }catch(err){
    console.log("Failed while commands are beign readed");
    console.log(err);
    return {};
  }
  var instancedBotCommands = {};
  var errorsOnInstantiateCommand = {};
  files.forEach((file) => {
    if(!file.endsWith(".js")){
      return;
    }
    var commandId = path.basename(file, '.js').toLowerCase();
    console.log("registering new command:"+file+" as: "+commandId);

    try{
      var commandRequire = require(path.join(commandsLocation, file));
      var command = new commandRequire();
    }catch(err){
      console.log(err);
      errorsOnInstantiateCommand[path.join(commandsLocation, file)] = err.toString();
      return;
    }

    if(typeof command.doit === 'undefined'){
      console.log("command don't have the expect method: doit(...)");
      errorsOnInstantiateCommand[path.join(commandsLocation, file)] = "command don't have the expect method: doit(...)";
      return;
    }

    instancedBotCommands[commandId] = command;
  });
  return {
    commands: instancedBotCommands,
    errors: errorsOnInstantiateCommand
  };
}
