var Relayr = require("../");

var app_id = "0e5b71a9-ad78-4e24-9ec1-8b3de04ff710";
var token =  "BwwORoJcI9iKDN9NEHs1hXYOeCV3cEoS";
var htu =  "6fbb27dd-ac8f-4d1f-bd82-8d37405d8cfb";
var snd =  "a0dde2dc-bce6-4df3-8f6c-2b773ce6fb90";
relayr = new Relayr(app_id);


relayr.connect(token, htu);

relayr.on('connect', function () {
    relayr.connect(token, snd);
});
relayr.on('data', function (topic, msg) {
    console.log("TOPIC:"+topic);
    console.log(msg);
});

