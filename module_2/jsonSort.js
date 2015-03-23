function sortJSON ( jsonObject, callback ) {
    try {
        //checks for json object is received or not.
        if ( jsonObject === undefined ) {
            return callback( new Error(" jsonObject is not passed to the function."), null);
        }

        var students = jsonObject.students;
        if (students === undefined) {  //checks for the students tag in the json object.
            return callback( new Error(" jsonObject not contain students key."), null);
        } else if (students.length === 0) {  //checks for the presence of students inan array of the students tag.
            return callback( new Error(" jsonObject not contain students in array."), null);
        }

        //checks for the presence of elements of each object.
        for (var x = 0; x < students.length; x++) {
            if( students[x].id === undefined ) {
                return callback( new Error(" id not found in object"), null);
            } else if( students[x].fName === undefined ) {
                return callback( new Error(" First name not found in object"), null);
            } else if( students[x].lName === undefined ) {
                return callback( new Error(" Last name not found in object"), null);
            } else if( students[x].score === undefined ) {
                return callback( new Error(" score not found in object"), null);
            }
        }

        //actual sorting of array elements.
        for ( var x = 0; x < students.length-1; x++) {
            for ( var y = x+1; y < students.length; y++) {
                if(students[x].score < students[y].score) {
                    var tempStudent = students[x];
                    students[x] = students[y];
                    students[y] = tempStudent;
                }
            }
        }
	    //returning the sorted student array as a result.
		return callback(null, students);

	} catch (errorMessage) {
		return callback(errorMessage, null);//returning error message with object as null.
	}
}
module.exports.sortJSON = sortJSON;