var XMLFileCreator = function( xmlFileName, sortedStudentArray, callback ) {
	try{
		if( xmlFileName === undefined ) {
			return callback( new Error(" xmlFileName is not passed to the function."), null);
		}
		if( sortedStudentArray === undefined ) {
			return callback( new Error(" sortedStudentArray is not passed to the function."), null);
		} else if (sortedStudentArray.length == 0) {
			return callback( new Error(" sortedStudentArray not contain students in array."), null);
		}
		var fs = require("fs");
		var prompt = require('prompt');
		var builder = require("xmlbuilder");
		if ((fs === undefined)) {
			return callback( new Error(" Can't access fs module"), null);
		}
		if ((prompt === undefined)) {
			return callback( new Error(" Can't access prompt module"), null);
		}
		if ((builder === undefined)) {
			return callback( new Error(" Can't access builder module"), null);
		}

		//Create or modify destination.xml using "xmlbuilder" module from arrayElements.
		var createOrOverwriteXMLFile = function (callback) {
	        var rootElement = builder.create( "Students" );
	        //Getting Each element from an array and appending to xml file.
	        sortedStudentArray.forEach( function(value) {
	            var student = rootElement.ele( 'Student', {'id': value.id} );
	            student.ele( 'name', value.fName + value.lName );
	            student.ele( 'score', value.score  );
	        });
	        var xmlString = rootElement.end( {pretty: true} );
	        //console.log(xmlString);
	        fs.writeFileSync( xmlFileName, xmlString );
	        fs.exists(xmlFileName, function(exists) {
	            if (exists) {
	            	return callback( null, "xml file is created or modified.");
	            } else {
	            	return callback( new Error(" xml file is not created."), null);
	            }
	        });
	    }

		//check for the presence of xml File and perform specific task on the response.
	    var destXMLFile = function(callback) {
	        if (fs.existsSync(xmlFileName))
	        {
	            console.log("XML file is already present...Do you want to overwrite???(y/n)");
	            prompt.start();
	            prompt.get(['xml_reply'], function (err, result) {
	                if (err) {
	                	return onErr(err);
	                }
	                if (result.xml_reply == "y") {
	                	createOrOverwriteXMLFile(callback);
	                } else if (result.xml_reply == "n") {
	                	return callback(null, "xml file will remain unchanged.");
	                } else {
	                	return callback( new Error(" Please Enter only y or n ...Currently xml file will remain unchanged."), null);
	                }
	            });
	            function onErr(err) {  //returns a callback with errorMessage.
	                console.log(err);
	                return callback( new Error(" Failed to get reply from user for xml file"), null);
	            }
	        } else {
	            createOrOverwriteXMLFile(callback);
	        }
	    }//End of all code about XML File.


	    destXMLFile(callback);

	} catch(errorMessage) {
		return callback(errorMessage, null);  //returns a callback with error object as response
	}
}

module.exports.XMLFileCreator = XMLFileCreator;