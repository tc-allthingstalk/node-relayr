# node-relayr

Relayr sensor SDK for node.

Works by connecting to the MQTT channel associated with your Relayr connected
device.

## Status
This is still not much more thatn a utiity script, but will grow to expose a
lot more useful functionality.

## installation

```
npm install relayr
```

## connecting

Require the module

```js
var relayr = require('relayr');
```

Get the following from your account at relayr.io

```js
var relayrKeys = {
	app_id: "YOURAPPID",
	dev_id: "YOURDEVICEID",
	token:  "YOURSENSORTOKEN"
};
```

Connect using the keys:
```js
relayr.connect(relayrKeys);
```

Listen and do stuff
```js
relayr.listen(function(err,data){
	//fires for every sensor event
	if (err) {
		console.log("Oh No!", err)
	} else {
		console.log(data);
	}
});

```
## Credits
Big thanks to BinaryMax for putting in the ground work

## License
MIT License
