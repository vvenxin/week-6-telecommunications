var serial; 
var portName = '/dev/cu.usbmodem1411';

var x = 0;
var xspeed = 2;
var c = 200;

function setup() {
  
  createCanvas(800, 600);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
 
}

function draw() {
  
  background (c,c,c);
 	noStroke();
 	fill('#ffffff')
 	ellipse(200, 200, 300, 300);
 	ellipse(600, 200, 300, 300);
 	arc(400, 400, 150, 150, 0, PI, CHORD);
 	fill('#000000')
 	ellipse(x, 200, 100, 100);
 	ellipse(x+400, 200, 100, 100);
 	
 	
  	
  if (x > width/2 || x < 0)  {
     	xspeed = -xspeed;
  	}

  x += xspeed;

}


function serialEvent() {
   var inString = serial.readStringUntil('\r\n'); 
  if (inString.length > 0) { 
    c = 255 - (Number(inString)*255);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

