var request = require("request");
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'relayr.api'});
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
		callback(err, JSON.parse(body));
	});
}

api.channels = function(token, dev_id, callback) {
	var options = addHeaders({
		url: base + "/devices/" + dev_id + "/channels",
	});
	request.get(options,function(err,data, body){
		callback(err,body);
	});

}


api.deleteChannel = function(token, channel_id, callback) {
	var options = addHeaders({
		url: base + "/channels/" + channel_id,
	}, token);
	request.del(options,function(err,data){
		callback(err,data);
	});

}

api.createChannel = function(token, dev_id, callback) {
	var options = addHeaders({
		url: base + "/channels",
        json: true,
        body : {
            "deviceId":dev_id,
            "transport": "mqtt"
        }
	}, token);
	request.post(options,function(err,data, body){
		callback(err,body);
	});

}

api.command = function(token, device, command, callback) {
    log.info("sending command", command);
	var options = addHeaders({
        uri: base + "/devices/"+device+"/cmd/",
        json: true,
        body : command
    }, token);
    
	request.post(options,function(err,data){
		callback(err, data.statusCode);
	});

}

function addHeaders(options, token) {
	options.headers  = {'Authorization': 'Bearer ' + token}
    return options;
}
