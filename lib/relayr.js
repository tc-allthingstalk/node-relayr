var events = require("events");
var util = require("util");
var request = require("request");
var api = require("./apiHelper");
var certificates = require("./certificate");
var rMQTT = require("./rMQTT");

function Relayr(app){

    var app_id = app;
    events.EventEmitter.call(this);
    var mqtt = new rMQTT();
    var self = this;

    mqtt.on('data', function(topic, mssg){
        self.emit('data', topic, mssg);
    });
    mqtt.on('connect', function(){
        self.emit('connect');
    });

    this.mqtt = mqtt;
}
util.inherits(Relayr, events.EventEmitter);

var listeners = [];

Relayr.prototype.user = api.user;
Relayr.prototype.user = api.devices;
Relayr.prototype.user = api.command;

Relayr.prototype.connect = function(token, dev_id){
    var mqtt = this.mqtt;
    console.log("relayr wants to connect");

    certificates.check(function () {
        api.createChannel(token, dev_id, function(err,data){
            if (err) {
                console.log(err);
            } else {
                mqtt.connect(data);
            }
        });
    });
};


Relayr.prototype.listen = function(listener){
	listeners.push(listener);
};

module.exports = Relayr;

