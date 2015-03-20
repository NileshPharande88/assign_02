var XMLFileCreator = function ( xmlFileName, sortedStudentArray, callback ) {
    try{
        var fs = require("fs");
        var prompt = require('prompt');
        var builder = require("xmlbuilder");
        if (fs === undefined) {
            return callback( new Error(" Can't access fs module"), null);
        }
        if ( prompt === undefined ) {
            return callback( new Error(" Can't access prompt module"), null);
        }
        if (builder === undefined) {
            return callback( new Error(" Can't access builder module"), null);
        }
        if(xmlFileName === undefined) {
            return callback( new Error(" xmlFileName is not passed to the function."), null);
        }
        if(sortedStudentArray === undefined) {
            return callback( new Error(" sortedStudentArray is not passed to the function."), null);
        } else if (sortedStudentArray.length === 0) {
            return callback( new Error(" sortedStudentArray not contain students in array."), null);
        }


        //Create or modify destination.xml using "xmlbuilder" module from arrayElements.
        var createOrOverwriteXMLFile = function (cb) {
            var rootElement = builder.create( "Students" );
            //Getting Each element from an array and appending to xml file.
            for (x in sortedStudentArray) {
                var student = rootElement.ele( 'Student', {'id': sortedStudentArray[x].id} );
                student.ele( 'name', sortedStudentArray[x].fName + " "+ sortedStudentArray[x].lName );
                student.ele( 'score', sortedStudentArray[x].score );
            }
            var xmlString = rootElement.end( {pretty: true} );
            fs.writeFileSync( xmlFileName, xmlString );
            fs.exists(xmlFileName, function (exists) {
                if (exists) {
                    return cb(null, "destination.xml is created or modified.");
                }
                return cb(new Error(" destination.xml is not created."), null);
            });
        }


        //check for the presence of xml File and perform specific task on the response.
        var destXMLFile = function (callback) {
            if ( !fs.existsSync(xmlFileName) ) {
                return createOrOverwriteXMLFile(callback);
            }
            //File is exists already. So ask user before override it.
            console.log("destination.xml is already present...Do you want to overwrite???(y/n)");
            prompt.start();
            prompt.get(['xml_reply'], function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(new Error(" Failed to get reply from user for xml file."), null);
                }
                if (result.xml_reply == "y") {
                    return createOrOverwriteXMLFile(callback);
                } else if (result.xml_reply == "n") {
                    return callback(null, "xml file will remain unchanged.");
                }  //User not giving proper response so send an error.
                return callback(new Error(" Please Enter only y or n ...Currently xml file will remain unchanged."), null);
            });
        }//End of all code about destination.xml.


        destXMLFile(callback);

    } catch (errorMessage) {
        return callback(errorMessage, null);  //returns a callback with error object as response
    }
}

module.exports.XMLFileCreator = XMLFileCreator;