const path = require('path');
const Max = require('max-api');

var PORT = 49160;
var HOST = '127.0.0.1';

var dgram = require('dgram');

//Here is command to send to ORCA.
var message = new Buffer('bpm:130');

var client = dgram.createSocket('udp4');


//This log is posted at first.
Max.post(`Loaded the ${path.basename(__filename)} script`);

// When bang is fired.
Max.addHandler("bang", () => {
	Max.post("banged!!");
	
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    	if (err) throw err;
    	Max.post('UDP message sent to ' + HOST +':'+ PORT);
    	client.close();
	});
	
});


/*
Max.addHandler("echo", (msg) => {
	Max.outlet(msg);
});
*/