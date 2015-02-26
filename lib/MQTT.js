var events = require("events");

function MQTT(){
    this.client = undefined
    events.EventEmitter.call(this);
}
util.inherits(Relayr, events.EventEmitter);


MQTT.prototype.connect = function(channelInfo) {
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
    }

    this.client.on('connect', function () {
        console.log('connected');
        client.subscribe(credentials.topic, function (err, granted) {
            if (err) {
                console.log(err);
            } else {
                //console.log(granted);
            }
        });
    });

    this.client.on('error', function (error) {
        console.log("connection error");
        console.log(error);
    });

    this.client.on('message', function(topic, message, packet) {
        var err;
        try {
            message = JSON.parse(new Buffer(message).toString("ascii"));
        } catch (ex) {
            err = ex;
        }
        handleData(err, message);
    })

};
var handleData = function (err, message) {
    listeners.forEach(function(listener){
        listener(err, message);
    });
}

module.exports = MQTT;
