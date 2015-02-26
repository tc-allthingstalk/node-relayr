var request = require("request");
var api = require("./apiHelper");
var certificates = require("./certificate");
var rMQTT = require("./rMQTT");
var mqtt = new rMQTT();

var relayr = module.exports = {};

var listeners = [];

relayr.connect = function(options){
    console.log("relayr wants to connect");

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

mqtt.on('data', function(topic, mssg){
    console.log(topic);
    console.log(mssg);
});
mqtt.on('connect', function(topic, mssg){
    console.log("CONNECTED");
});

relayr.listen = function(listener){
	listeners.push(listener);
};


