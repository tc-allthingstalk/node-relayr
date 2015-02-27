var relayr = require("../");

var relayrKeys = {
    app_id: "304c4901-d9fc-4683-9511-672a65ceeff6",
    dev_id: "2ea6a1ff-6cdc-49ab-8680-4f7d11752a87",
    token:  "2r.MY-kAs-eVN6OOT_YThGH4Z9Z67Egb"
};

relayr.connect(relayrKeys);

relayr.on("connect", function () {
 console.log("EVENT EMITTED");
});

relayr.listen(function(err,data){
    //fires for every sensor event 
    if (err) {
        console.log("Oh No!", err)
    } else {
        console.log(data);
    }
});

