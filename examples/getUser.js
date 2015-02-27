var relayr = require("../");

var token =  "2r.MY-kAs-eVN6OOT_YThGH4Z9Z67Egb";


relayr.user(token, function (err, user) {
    console.log(err);
    console.log(user);

    user.ping();
    
    user.devices(function (err, devices) {
        devices.forEach(function (device) {
            if (device.model.manufacturer === "Siemens") {
                console.log(device);
            }
        });
    } );
});

