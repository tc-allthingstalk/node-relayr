var events = require("events");
var util = require("util");
var request = require("request");
var api = require("./apiHelper");
var certificates = require("./certificate");
var rMQTT = require("./rMQTT");
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'relayr'});

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
    log.debug("Relayr created");
}
util.inherits(Relayr, events.EventEmitter);

var listeners = [];

Relayr.prototype.user = api.user;
Relayr.prototype.devices = api.devices;
Relayr.prototype.command = api.command;

Relayr.prototype.connect = function(token, dev_id){
    var mqtt = this.mqtt;
    log.debug("connecting");

    certificates.check(function () {
        log.info("creating channel for %s:%s", token, dev_id); 
        api.createChannel(token, dev_id, function(err,data){
            if (err) {
                log.err(err, "unable to create channel for %s", token); 
            } else {
                log.info("created channel for %s", token, data); 
                mqtt.connect(data);
            }
        });
    });
};


Relayr.prototype.listen = function(listener){
	listeners.push(listener);
};

module.exports = Relayr;

