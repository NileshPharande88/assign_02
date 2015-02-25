var jsonReader = require("json-reader");
var jsonSort = require("json-sort");
var async = require("async");
var jsonToText = require("json-to-text");
var jsonToXML = require("json-to-xml");

if ((jsonReader === undefined)) throw new Error( " Can't access json-reader module" );
if ((jsonSort === undefined)) throw new Error( " Can't access json-sort module" );
if ((jsonToText === undefined)) throw new Error( " Can't access json-to-text module" );
if ((jsonToXML === undefined)) throw new Error( " Can't access json-to-xml module" );
if ((async === undefined)) throw new Error( " Can't access async module" );

jsonReader.jsonObject("source.json", function(err,object){
	if(err) console.log(object);
	else {
		jsonSort.sortJSON(object,function(err,sortedStudentArray){
			if(err) console.log(err);
			else {
				async.series( [
					function(callback){
						jsonToText.TextFileCreator("destination.txt", sortedStudentArray, function(err, res){
							 if(err){
							 	console.log("Failed: ", res);
							 	callback(null, 'one failed');
							 }else{
							 	console.log("Successful: ", res);
							 	callback(null, 'one success');
							 }
						});
					},
					function(callback){
						jsonToXML.XMLFileCreator("destination.xml", sortedStudentArray, function(err, res){
							 if(err){
							 	console.log("Failed: ", res);
							 	callback(null, 'two failed');
							 }else{
							 	console.log("Successful: ", res);
							 	callback(null, 'two success');
							 }
						});
					}
				], function(err, results){
					console.log("Final Result: " + results);
				});
			}
		});
	}
});