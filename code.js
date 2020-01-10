// Read Synchrously
var fs = require("fs");
var content = fs.readFileSync("SignIns.json");
var json = JSON.parse(content);
console.log("\n  B2C Login Activity from JSON File  \n")
console.log("Total Login Attempts (Success or Failure) counted in JSON file:" + json.length + "\n");
var dates = [];
var logins = [];
var uniqueUsers = [];
var successLogins = [];

//gets dates in file
for (var i = 0; i < json.length; i++) {
    cutdate = json[i].createdDateTime;
    cutdate = cutdate.substring(0, 10);
    if (!dates.includes(cutdate)) {
        dates.push(cutdate);
    }
}

console.log("Dates Available in JSON file: " + dates + "\n");

//initialize totalLogins and success to the correct amounts of entries
totalLogins = [];
for (var i = 0; i < dates.length; i++) {
    totalLogins[i] = 0;
    successLogins[i] = 0;
}

//Count total logins per date
for (var i = 0; i < json.length; i++) {
    datestr = json[i].createdDateTime;
    for (var n = 0; n < dates.length; n++)
        if (datestr.substring(0, 10) == dates[n]) {
            totalLogins[n] = totalLogins[n] + 1;
            //console.log(json[n].userPrincipalName)
        }
    //console.log(datestr);
    //console.log(json[i].userPrincipalName);
}

//Count SUCCESS logins per date
for (var i = 0; i < json.length; i++) {
    datestr = json[i].createdDateTime;
    for (var n = 0; n < dates.length; n++)
        if ((datestr.substring(0, 10) == dates[n]) && (json[i].status.errorCode == "0")) {
            successLogins[n] = successLogins[n] + 1;
            //console.log(json[n].userPrincipalName)
        }
    //console.log(datestr);
    //console.log(json[i].userPrincipalName);
}

//Count UNIQUE Users
for (var i = 0; i < dates.length; i++) {
    todaysLogins = [];
    for (var n = 0; n < json.length; n++) {
        cutdate = json[n].createdDateTime;
        cutdate = cutdate.substring(0, 10);
        if (json[n].status.errorCode == "0") {
            if ((cutdate == dates[i]) && (!todaysLogins.includes(json[n].userPrincipalName))) {
                todaysLogins.push(json[n].userPrincipalName);
            }
        }
    }
    console.log("Total Logins (SUCCESS or FAILURE) for " + dates[i] + ": " + totalLogins[i]);
    console.log("Total SUCCESS Logins for " + dates[i] + ": " + successLogins[i]);
    console.log("Total SUCCESS UNIQUE Logins for " + dates[i] + ": " + todaysLogins.length + "\n");
}