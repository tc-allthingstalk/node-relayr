var request = require("request");
var api = module.exports = {};

var base = "https://api.relayr.io";

api.devices = function(user, token, callback) {

	var options = addHeaders({
        uri: base + "/users/"+user+"/devices",
    }, token);
    
	request.get(options,function(err,data, body){
		callback(err,JSON.parse(body));
	});
        

}
api.user = function(token, callback) {
	var options = addHeaders({
        uri: base + "/oauth2/user-info"
    }, token);
    
	request.get(options,function(err,data, body){
		callback(err, body);
	});
}

api.command = function(token, device, command, callback) {
	var options = addHeaders({
        uri: base + "/devices/"+device+"/cmd/",
        json: true,
        body : command
    }, token);
    
	request.post(options,function(err,data, body){
		callback(err, body);
	});

}

function addHeaders(options, token) {
	options.headers  = {'Authorization': 'Bearer ' + token}
    return options;
}
