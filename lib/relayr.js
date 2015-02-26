var request = require("request");
var mqtt = require("mqtt");
var api = require("./apiHelper");
var certificates = require("./certificates");
var MQTT = require("./MQTT");
var mqtt = new MQTT();

var relayr = module.exports = {};

var listeners = [];

relayr.connect = function(options){


    certificates.check(function () {
        api.createChannel(options.token, options.dev_id, function(err,data){
            if (err) {
                console.log(err);
            } else {
                mqtt.connect(data);
            }
        });
    });

};

relayr.listen = function(listener){
	listeners.push(listener);
};


