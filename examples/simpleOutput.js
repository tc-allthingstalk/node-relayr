var Relayr = require("../");

relayr = new Relayr("0e5b71a9-ad78-4e24-9ec1-8b3de04ff710");

var relayrKeys = {
    dev_id: "6fbb27dd-ac8f-4d1f-bd82-8d37405d8cfb",
    token:  "BwwORoJcI9iKDN9NEHs1hXYOeCV3cEoS"
};

relayr.connect(relayrKeys.token, relayrKeys.dev_id);
relayr.connect(relayrKeys.token, "a0dde2dc-bce6-4df3-8f6c-2b773ce6fb90");

relayr.on('connect', function () {
    console.log("hell yeah");
});
relayr.on('data', function (topic, msg) {
    console.log("TOPIC:"+topic);
    console.log(msg);
});

