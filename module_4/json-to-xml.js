var XMLFileCreator = function( xmlFileName, sortedStudentArray, cb ) {
	try{
		if( xmlFileName === undefined ) throw new Error( " xmlFileName is not passed to the function." );
		if( sortedStudentArray === undefined ) throw new Error( " sortedStudentArray is not passed to the function." );
		else if (sortedStudentArray.length == 0) throw new Error( " sortedStudentArray not contain students in array." );
		var fs = require("fs");
		if ((fs === undefined)) throw new Error( " Can't access fs module" );
		var prompt = require('prompt');
		if ((prompt === undefined)) throw new Error( " Can't access prompt module" );
		var builder = require("xmlbuilder");
		if ((builder === undefined)) throw new Error( " Can't access builder module" );


		//Create or modify destination.xml using "xmlbuilder" module from arrayElements.
		var createOrOverwriteXMLFile = function(cb){
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
	        fs.exists(xmlFileName, function(exists){
	            if (exists) return cb(null, "xml file is created or modified.");
	            else return cb(1, "xml file is not created.");
	        });
	    }

		//check for the presence of xml File and perform specific task on the response.
	    var destXMLFile = function(cb){
	        if (fs.existsSync(xmlFileName))
	        {
	            console.log("XML file is already present...Do you want to overwrite???(y/n)");
	            prompt.start();
	            prompt.get(['xml_reply'], function (err, result) {
	                if (err) { return onErr(err); }
	                if (result.xml_reply == "y") { createOrOverwriteXMLFile(cb); }
	                else if (result.xml_reply == "n") { return cb(null, "xml file will remain unchanged."); }
	                else  { return cb(1, "Please Enter only y or n ...Currently xml file will remain unchanged."); }
	            });
	            function onErr(err) {
	                console.log(err);
	                return cb(1, "Failed to get reply from user for xml file");//returns a callback with errorMessage.
	            }
	        } else {
	            createOrOverwriteXMLFile(cb);
	        }
	    }//End of all code about XML File.
	    destXMLFile(cb);

	} catch(errorMessage) {
		return cb(1, errorMessage );//returns a callback with error object as response
	}
}
module.exports.XMLFileCreator = XMLFileCreator;