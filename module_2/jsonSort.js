function sortJSON(jsonObject, callback){
	try{
		//checks for json object is received or not.
		if( jsonObject === undefined ) {
			return callback( new Error(" jsonObject is not passed to the function."), null);
		}

		var students = jsonObject.students;
		//checks for the students tag in the json object.
		if(students === undefined) {
			return callback( new Error(" jsonObject not contain students key."), null);
		} else if (students.length == 0) {  //checks for the presence of students inan array of the students tag.
			return callback( new Error(" jsonObject not contain students in array."), null);
		}

		//checks for the presence of elements of each object.
		students.forEach(function (value) {
	    	if( (value.id === undefined) ) {
	    		return callback( new Error(" id is not found in object"), null);
	    	} else if( (value.fName === undefined) ) {
	    		return callback( new Error(" fName is not found in object"), null);
	    	} else if( (value.lName === undefined) ) {
	    		return callback( new Error(" lName is not found in object"), null);
	    	} else if( (value.score === undefined) ) {
	    		return callback( new Error(" score is not found in object"), null);
	    	}
    	});

		//actual sorting of array elements
		students.sort( function (a, b) {
	        return b.score - a.score ;
	    });
	    //returning the sorted student array as a result.
		return callback(null, students);

	} catch (errorMessage) {
		return callback(errorMessage, null);//returning error message with object as null.
	}
}
module.exports.sortJSON = sortJSON;