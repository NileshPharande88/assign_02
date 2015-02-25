var jsonReader = require("json-reader");
var jsonSort = require("json-sort");

jsonReader.jsonObject("source.json", function(err,object){
	if(err) console.log(object);
	else {
		jsonSort.sortJSON(object,function(err,sortedStudentArray){
			if(err) console.log(err);
			else console.log(sortedStudentArray);
		});
	}
});