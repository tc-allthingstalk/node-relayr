

function MQTT(){

}


MQTT.prototype.connect = function(channelInfo) {
    var credentials = channelInfo.credentials;
        console.log('connecting');
	var client = mqtt.connect({
        servers:[{'host':'mqtt.relayr.io','port':8883}],
        username: credentials.user,
        password: credentials.password,
        clientId: credentials.clientId,
        protocol : 'mqtts',
        certPath: certificates.CERT,
        rejectUnauthorized : false, 
    });

    client.on('connect', function () {
        console.log('connected');
        client.subscribe(credentials.topic, function (err, granted) {
            if (err) {
                console.log(err);
            } else {
                //console.log(granted);
            }
        });
    });

    client.on('error', function (error) {
        console.log("connection error");
        console.log(error);
    });

    client.on('message', function(topic, message, packet) {
        var err;
        try {
            message = JSON.parse(new Buffer(message).toString("ascii"));
        } catch (ex) {
            err = ex;
        }
        handleData(err, message);
    })

};

module.exports = MQTT;
