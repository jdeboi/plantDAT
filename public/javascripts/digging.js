let ws;
var x = 0, y = 0, sendx = 50, sendy = 50;
let canvas;
let shovelImg;
let arrow;
let div;
let plantName;

function preload() {
  shovelImg = loadImage("../../images/shovel.png");
  arrow = loadImage("../../images/arrow.png");
  div = select("#digdiv");
  plantName = select("#namediv").html();
}

function setup() {
  canvas = createCanvas(div.width-2, div.height-2); //, WEBGL);
  canvas.parent("digdiv")

  x = width/2;
  y = height/2;
  if (!"WebSocket" in window) {
    // The browser doesn't support WebSocket
    alert("So sorry! Websocket is supported by your Browser!");
  }
  else {
    // get this number in preferences > network > advanced > TCIP > ipv4 address
    // also in ifconfig en0 inet
    // NOT from google "what is my ip address" (184.189.154.10)
    // NOT from other website that claims "here's your external ip"
    ws = new WebSocket("ws://172.17.15.216:8025/");



    ws.onopen = function() {
      // Web Socket is connected, send data using send()
      let s = "Opening Connection";
      ws.send(s);
      // alert("Message is sent...");
    };
    ws.onmessage = function (evt) {
      var received_msg = evt.data;
      // alert("Message is received...");
    };
    ws.onclose = function() {
      // websocket is closed.
      // alert("Connection is closed...");
    };
  }
}

function draw() {
  background(255);

  push();
  imageMode(CENTER);
  translate(width/2, height/2);
  image(arrow, 0, 0, width/2, width/2);
  pop();

  fill(0);
  stroke(0);

  imageMode(CORNER);
  // ellipse(x, y, 30, 30);

  push();

  // translate(x-shovelImg.width*1.8, -shovelImg.height*.2, y-shovelImg.height*.7)

  let factor = map(y, 0, height, .2, 1.0);
  translate((x-shovelImg.width*.75*factor), y-shovelImg.height*.7*factor)
  rotate(radians(-35));


  image(shovelImg, 0, 0, shovelImg.width*factor, shovelImg.height*factor);
  // texture(shovelImg);
  // stroke(0);
  // plane(shovelImg.width, shovelImg.height);
  pop();
  // text(mouseX + " " + floor(mouseY), mouseX, mouseY);

}

function touchStarted() {
  if (inBounds()) {
    setXY();
    sendXY();
    return false;
  }

}

function touchMoved() {
  if (inBounds()) {
    if (frameCount % 5 == 0) {
      setXY();
      sendXY();
    }
    return false;
  }

}

function inBounds() {
  return mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0;
}

function touchEnded() {
  if (inBounds()) {
    setXY();
    sendXY();
    return false;
  }

}

function sendXY() {
  if (inBounds()) {
    let s = "T" + plantName + "X" + sendx + "Y" + sendy;
    ws.send(s)
  }
}

function setXY() {
  x = mouseX;
  x = constrain(x, 0, width);
  y = mouseY;
  y = constrain(y, 0, height);
  sendx = map(mouseX, 0, width, 0, 100);
  sendx = floor(constrain(sendx, 0, 100));
  sendy = map(mouseY, 0, height, 0, 100);
  sendy = floor(constrain(sendy, 0, 100));
}

function spawn() {

  let url="http://localhost:5000/api/spawn";
  let postData = {
    'short_name': plantName,
    'x': sendx,
    'y': sendy
  };
  // let postData = {
  //   'headers' : {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   'short_name': plantName,
  //   'x': sendx,
  //   'y': sendy
  // };


  httpPost(url, postData,()=> { console.log("win?"); window.location.href = "/thanks"   }, ()=> { console.log(" didn't worked")});

}
