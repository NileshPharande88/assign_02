function jsonObject(jsonFileName, callback) {
  try{
    //check for module is successfully installed and accessible or not.
    var fs = require("fs");
    if ((fs === undefined)) throw new Error( " Can't access fs module" );

    //check for the presence of source.json.
    if(!fs.existsSync(jsonFileName)) throw new Error( " File is not present in current folder" );
    //checks for json file is readable or not.
    var sourceString = fs.readFileSync("source.json");
    if ((sourceString === undefined)) throw new Error( " Can't read json file." );
    //checks for string json is parse or not.
    var sourceJSON = JSON.parse( sourceString );
    if ((sourceJSON === undefined)) throw new Error( " Can't parse json string." );
    else return callback(0,sourceJSON);
    
  }catch(errorMessage){
    return callback(1,errorMessage);
  }
}
  
module.exports.jsonObject = jsonObject;