try {
    var jsonReader = require("json-reader");
    var jsonSort = require("json-sort");
    var async = require("async");
    var jsonToText = require("json-to-text");
    var jsonToXML = require("json-to-xml");


    //Throws an error if any of these modules are not required properly.
    if (jsonReader === undefined) {
        throw new Error(" Can't access json-reader module");
    }
    if (jsonSort === undefined) {
        throw new Error(" Can't access json-sort module");
    }
    if (jsonToText === undefined) {
        throw new Error(" Can't access json-to-text module");
    }
    if (jsonToXML === undefined) {
        throw new Error(" Can't access json-to-xml module");
    }
    if (async === undefined) {
        throw new Error(" Can't access async module");
    }

    jsonReader.jsonObject("source.json", function jsonReaderHandler( err,object ) {
        if (err) {
            console.log(err);
            throw new Error(" Error from json-reader module.");
        }
        jsonSort.sortJSON ( object, function jsonSorterHandler(err,sortedStudentArray) {
            if (err) {
                console.log(err);
                throw new Error(" Error from json-sort module.");
            }
            async.series([
                function (callback) {
                    jsonToText.TextFileCreator("destination.txt", sortedStudentArray, function jsonToTextHandler(err, res) {
                        if (err) {
                            console.log(err);
                            return callback(null, 'one failed');
                        }
                        console.log("Successful: ", res);
                        return callback(null, 'one success');
                    });
                },
                function (callback) {
                    jsonToXML.XMLFileCreator("destination.xml", sortedStudentArray, function jsonToXMLHandler(err, res) {
                    	if (err) {
                            console.log(err);
                            return callback(null, 'two failed');
                        }
                        console.log("Successful: ", res);
                        return callback(null, 'two success');
                    });
                }
            ], function asyncSeriesHandler(err, results) {
                console.log("Final Result: " + results);
            });
        });
    });
} catch (err) {
    console.log(err);
}