var TextFileCreator = function( textFileName, sortedStudentArray, cb ) {
	try{
		if( textFileName === undefined ) throw new Error( " textFileName is not passed to the function." );
		if( sortedStudentArray === undefined ) throw new Error( " sortedStudentArray is not passed to the function." );
		else if (sortedStudentArray.length == 0) throw new Error( " sortedStudentArray not contain students in array." );
		var fs = require("fs");
		if ((fs === undefined)) throw new Error( " Can't access fs module" );
		var prompt = require('prompt');
		if ((prompt === undefined)) throw new Error( " Can't access prompt module" );


		//Create Text File or modify if already present, from arrayElements.
	    var createOrOverwriteTextFile = function(cb){
	        fs.writeFileSync( textFileName, "First Name | Last Name | Score\n" );
	        //Getting Each element from an array and appending to txt file.
	        sortedStudentArray.forEach( function (value) {
	            fs.appendFile( textFileName, value.id + " | " + value.fName + " | " + value.lName + " | " + value.score + "\n", function (err) {
	                if( err )
	                    throw new Error( " Error in appending data" ); //throwing an user defined error.
	            });
	        });
	        fs.exists(textFileName, function(exists){
	            if (exists) return cb(null, "Text File is created or modified.");
	            else return cb(1, "Text file is not created.");
	        });
	    }


		//check for the presence of Text File and perform specific task on the response.
	    var destTextFile = function(cb){
	        if (fs.existsSync(textFileName))
	        {
	            console.log("text file is already present...Do you want to overwrite???(y/n)");
	            prompt.start();
	            prompt.get(['text_reply'], function (err, result) {
	                if (err) { return onErr(err); }
	                if (result.text_reply == "y") { createOrOverwriteTextFile(cb); }
	                else if (result.text_reply == "n") { return cb(null, "txt file will remain unchanged."); }
	                else  { return cb(1, "Please Enter only y or n ...Currently txt file will remain unchanged."); }
	            });
	            function onErr(err) {
	                console.log(err);
	                return cb(1, "Failed to get reply from user for txt file");//returns a callback with errorMessage.
	            }
	        } else {
	            createOrOverwriteTextFile(cb);
	        }
	    }//End of all code about Text File.

	    destTextFile(cb);

	} catch(errorMessage) {
		return cb(1, errorMessage );//returns a callback with error object as response
	}
}
module.exports.TextFileCreator = TextFileCreator;