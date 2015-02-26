var events = require("events");
var mqtt = require("mqtt");
var util = require("util");
var certificates = require("./certificate");

function rMQTT(){
    this.client = undefined;
    this.queue = [];
    events.EventEmitter.call(this);
}
util.inherits(rMQTT, events.EventEmitter);


rMQTT.prototype.subscribe = function(topic) {
    console.log("subscribe " + topic);
    this.client.subscribe(topic, function (err, granted) {
        if (err) {
            console.log(err);
        }
        console.log("subscribed");
    });
}

rMQTT.prototype.connect = function(channelInfo) {
    var self = this;
    var credentials = channelInfo.credentials;
        console.log('connecting');
    if (!this.client) {
        this.client = mqtt.connect({
            servers:[{'host':'mqtt.relayr.io','port':8883}],
            username: credentials.user,
            password: credentials.password,
            clientId: credentials.clientId,
            protocol : 'mqtts',
            certPath: certificates.CERT,
            rejectUnauthorized : false, 
        });
        this.queue.push(credentials.topic);
    } else {
        if (this.queue === undefined) {
            this.queue.push(credentials.topic);
        } else {
            this.subscribe(credentials.topic); 
        }
    }

    this.client.on('connect', function () {
        console.log('connected');
        self.emit('connect');

        self.queue.forEach(function (topic) {
            self.subscribe(topic);
        }, self);

        this.queue = undefined;
    });

    this.client.on('error', function (error) {
        console.log("connection error");
        console.log(error);
    });

    this.client.on('message', function(topic, message, packet) {
        var err;
        try {
            message = JSON.parse(new Buffer(message).toString("ascii"));
            self.emit('data', topic, message);
        } catch (ex) {
            console.log(ex);
        }
    })

};

module.exports = rMQTT;
