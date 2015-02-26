var fs = require("fs");
var http = require("http");

var CERT = __dirname + '/relayr.crt';

var certificates = module.exports = {};
certificates.CERT = CERT;

certificates.check = function (callback) {
    fs.exists(CERT, function(exists){
    
        if (!exists) {
            var file = fs.createWriteStream(CERT);
            var request = http.get("http://mqtt.relayr.io/relayr.crt", function(response) {
              response.pipe(file);
              response.on('close', function () {
                callback();
              });
            });
        } else {
            callback();
        }
    });
};
