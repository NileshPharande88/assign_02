function sortJSON(jsonObject, callback){
	try{
		//checks for json object is received or not.
		if( jsonObject === undefined ) throw new Error( " jsonObject is not passed to the function." );

		var students = jsonObject.students;
		//checks for the students tag in the json object.
		if(students === undefined) throw new Error( " jsonObject not contain students key." );
		//checks for the presence of students inan array of the students tag.
		else if (students.length == 0) throw new Error( " jsonObject not contain students in array." );

		//checks for the presence of elements of each object.
		students.forEach(function (value) {
	    	if( (value.id === undefined) ) throw new Error( " id is not found in object" );
	    	else if( (value.fName === undefined) ) throw new Error( " fName is not found in object" );
	    	else if( (value.lName === undefined) ) throw new Error( " lName is not found in object" );
	    	else if( (value.score === undefined) ) throw new Error( " score is not found in object" );
    	});

		//actual sorting of array elements
		students.sort( function (a, b) {
	        return b.score - a.score ;
	    });

	    //returning the sorted student array as a result.
		return callback(0,students);
	} catch (errorMessage) {
		return callback(errorMessage,null);//returning error message with object as null.
	}
}
module.exports.sortJSON = sortJSON;