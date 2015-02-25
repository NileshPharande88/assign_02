var jsonReader = require("json-reader");
var jsonSort = require("json-sort");
var async = require("async");
var jsonToText = require("json-to-text");

if ((jsonReader === undefined)) throw new Error( " Can't access jsonReader module" );
if ((jsonSort === undefined)) throw new Error( " Can't access jsonSort module" );
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
							 	callback(1, 'one failed');
							 }else{
							 	console.log("Successful: ", res);
							 	callback(null, 'one success');
							 }
						});
					},
					function(callback){
						callback(null, 'one success');
					}
				], function(err, results){
					console.log("Final Result: " + results);
				});
			}
		});
	}
});