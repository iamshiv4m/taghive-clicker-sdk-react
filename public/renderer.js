// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { listenClickerEvent} = require("../src/Taghive-Clicker-SDK");
const { stopListening } = require("../src/Taghive-Clicker-SDK");
const { register } = require('../src/Taghive-Clicker-SDK').register;
const portList = require('../src/Taghive-Clicker-SDK').portList;

async function listSerialPorts() {
  console.log('listSerialPorts');
  let count = 1;
  portList().then((ports) => {
  
    const finalPort = [];
    for(const port of ports){
      if(!port.vendorId){
        continue;
      }
      finalPort.push(port);
  listenClickerEvent((eventNum, deviceID) => {
    console.log(count);
    console.log(deviceID);
    console.log(eventNum);
    $('.tbody').prepend('<tr><th scope="row">' + (count++) + '</th><td>' + deviceID + '</td><td>' + eventNum + '</td</tr>');
    });
    }

// Code for testing register
document.getElementById('register').onclick = function() {
  stopListening();
  //modal.style.display = 'block';
  document.getElementById('h1').innerHTML = '';

  window.onclick = function(event) {
          if (document.getElementById('registerKey') !== 'Register is successfull !') {
              stopListening();
          }
  }

  var classNum = 255;
  var studentNum = 255;
  var clickerNum = Math.floor(Math.random() * 4) + 2;
  document.getElementById('startListening').innerHTML = 'Start Litening!';
  document.getElementById('registerKey').innerHTML = 'Press clicker number ' + clickerNum;
  register(classNum, studentNum, clickerNum)
      .then((clickerId) => {
          document.getElementById('registerKey').innerHTML = 'Register is successfull !';
      });
}

document.getElementById('startListening').onclick = function() {
  if (document.getElementById('startListening') === 'Stop Listening!') {
      stopListening();
  } else {
      document.getElementById('h1').innerHTML = 'Listening Clicker!';
      document.getElementById('startListening').innerHTML = 'Stop Listening!';
      listenClickerEvent((eventNum, deviceID) => {
          $('.tbody').prepend('<tr><th scope="row">' + (count++) + '</th><td>' + deviceID + '</td><td>' + eventNum + '</td</tr>');
      });
  }
}
  })
}
listSerialPorts()
