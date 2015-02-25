var relayr = require("../relayr");

var relayrKeys = {
    app_id: "0e5b71a9-ad78-4e24-9ec1-8b3de04ff710",
    dev_id: "6fbb27dd-ac8f-4d1f-bd82-8d37405d8cfb",
    token:  "BwwORoJcI9iKDN9NEHs1hXYOeCV3cEoS"
};

relayr.connect(relayrKeys);

relayr.listen(function(err,data){
    //fires for every sensor event 
    if (err) {
        console.log("Oh No!", err)
    } else {
        console.log(data);
    }
});

