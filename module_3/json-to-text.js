var TextFileCreator = function ( textFileName, sortedStudentArray, callback ) {
    try{
        var fs = require("fs");
        var prompt = require('prompt');
        if (fs === undefined) {
            return callback( new Error(" Can't access fs module"), null);
        }
        if (prompt === undefined) {
            return callback( new Error(" Can't access prompt module"), null);
        }
        if( textFileName === undefined ) {
            return callback( new Error(" textFileName is not passed to the function."), null);
        }
        if( sortedStudentArray === undefined ) {
            return callback( new Error(" sortedStudentArray is not passed to the function."), null);
        } else if (sortedStudentArray.length == 0) {
            return callback( new Error(" sortedStudentArray not contain students in array."), null);
        }


        //Create Text File or modify if already present, from arrayElements.  /////studentArray
        var createOrOverwriteTextFile = function (cb) {
            fs.writeFileSync( textFileName, "First Name | Last Name | Score\n" );
            //Getting Each element from an array and appending to txt file.
            for (var x = 0; x < sortedStudentArray.length; x++) {
                fs.appendFileSync( textFileName, sortedStudentArray[x].id + " | " + sortedStudentArray[x].fName + " | " + sortedStudentArray[x].lName + " | " + sortedStudentArray[x].score + "\n");
            }
            fs.exists("destination.txt",function isTextFileExists(exists) {
                if (exists) {
                    return cb(null, "destination.txt is created or modified.");
                }
                return cb(new Error(" destination.txt is not created."), null);
            });
        }

        //check for the presence of Text File and perform specific task on the response.
        var destTextFile = function (cb) {
            if ( !fs.existsSync(textFileName) ) {
                return createOrOverwriteTextFile(cb);
            }
            //File is exists already. So ask user before override it.
            console.log("destination.txt is already present...Do you want to overwrite???(y/n)");
            prompt.start();
            prompt.get(['text_reply'], function afterXMLPromptReply(err, result) {
                if (err) {
                    console.log(err);
                    return cb(new Error(" Failed to get reply from user for text file."), null);
                }
                if (result.text_reply == "y") {
                    return createOrOverwriteTextFile(cb);
                } else if (result.text_reply == "n") {
                    return cb(null, "txt file will remain unchanged.");
                }  //User not giving proper response so send an error.
                return cb(new Error(" Please Enter only y or n ...Currently txt file will remain unchanged."), null);
            });
        }//End of all code about destination.txt.

        destTextFile(callback); //actual call to function for execution.

    } catch (errorMessage) {
        return callback(errorMessage, null);//returns a callback with error object as response.
    }
}

module.exports.TextFileCreator = TextFileCreator;