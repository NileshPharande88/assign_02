function jsonObject(jsonFileName, callback) {
  try{
    //check for module is successfully installed and accessible or not.
    var fs = require("fs");
    if ((fs === undefined)) {
        return callback( new Error( " Can't access fs module" ), null);
    }

    //check for the presence of source.json.
    if(!fs.existsSync(jsonFileName)) {
        return callback( new Error( " File is not present in current folder" ), null);
    }
    //checks for json file is readable or not.
    var sourceString = fs.readFileSync("source.json");
    if ((sourceString === undefined)) {
        return callback( new Error( " Can't read json file." ), null);
    }
    //checks for string json is parse or not.
    var sourceJSON = JSON.parse( sourceString );
    if ((sourceJSON === undefined)) {
        return callback( new Error( " Can't parse json string." ), null);
    } else {
        return callback(null, sourceJSON);
    }
    
  }catch(errorMessage){
    return callback( errorMessage, null);
  }
}
  
module.exports.jsonObject = jsonObject;