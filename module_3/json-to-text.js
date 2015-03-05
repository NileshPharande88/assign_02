var TextFileCreator = function( textFileName, sortedStudentArray, callback ) {
	try{
		if( textFileName === undefined ) {
			return callback( new Error(" textFileName is not passed to the function."), null);
		}
		if( sortedStudentArray === undefined ) {
			return callback( new Error(" sortedStudentArray is not passed to the function."), null);
		} else if (sortedStudentArray.length == 0) {
			return callback( new Error(" sortedStudentArray not contain students in array."), null);
		}
		var fs = require("fs");
		var prompt = require('prompt');
		if ((fs === undefined)) {
			return callback( new Error(" Can't access fs module"), null);
		}
		if ((prompt === undefined)) {
			return callback( new Error(" Can't access prompt module"), null);
		}

		//Create Text File or modify if already present, from arrayElements.
	    var createOrOverwriteTextFile = function(callback){
	        fs.writeFileSync( textFileName, "First Name | Last Name | Score\n" );
	        //Getting Each element from an array and appending to txt file.
	        sortedStudentArray.forEach( function (value) {
	            fs.appendFile( textFileName, value.id + " | " + value.fName + " | " + value.lName + " | " + value.score + "\n", function (err) {
	                if( err ) {  //throwing an user defined error.
	                	return callback( new Error(" Error in appending data"), null);
	                }
	            });
	        });
	        fs.exists(textFileName, function(exists){
	            if (exists) {
	            	return callback(null, "Text File is created or modified.");
	            } else {
	            	return callback( new Error(" Text file is not created."), null);
	            }
	        });
	    }

		//check for the presence of Text File and perform specific task on the response.
	    var destTextFile = function(callback){
	        if ( fs.existsSync(textFileName) )
	        {
	            console.log("text file is already present...Do you want to overwrite???(y/n)");
	            prompt.start();
	            prompt.get(['text_reply'], function (err, result) {
	                if (err) {
	                	return onErr(err);
	                }
	                if (result.text_reply == "y") {
	                	createOrOverwriteTextFile(callback);
	                } else if (result.text_reply == "n") {
	                	return callback(null, "txt file will remain unchanged.");
	                } else {
	                	return callback( new Error(" Please Enter only y or n ...Currently txt file will remain unchanged."), null);
	                }
	            });
	            function onErr(err) {
	                console.log(err);
	                return callback( new Error(" Failed to get reply from user for txt file"), null);//returns a callback with errorMessage.
	            }
	        } else {
	            createOrOverwriteTextFile(callback);
	        }
	    }//End of all code about Text File.



	    destTextFile(callback); //actual call to function for execution.

	} catch(errorMessage) {
		return callback(errorMessage, null);//returns a callback with error object as response
	}
}
module.exports.TextFileCreator = TextFileCreator;