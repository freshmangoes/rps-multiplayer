var firebaseConfig = {
  apiKey: "AIzaSyARmLVFjqNcIup_N3sZgcF5vYXmbOXf-Ds",
  authDomain: "rps-multiplayer-aee22.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-aee22.firebaseio.com",
  projectId: "rps-multiplayer-aee22",
  storageBucket: "rps-multiplayer-aee22.appspot.com",
  messagingSenderId: "797060947172",
  appId: "1:797060947172:web:b563eec21648a66e9b60f1",
  measurementId: "G-9R51M0G1YC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.database();
var connectionsRef = db.ref("/connections");
var connectedRef = db.ref(".info/connected");
var usersRef = db.ref("/users");

var playerData = {
  connected: false,
  choice: null,
  key: null,
}

var chooseWeapon = (string) => {
  playerData.choice = string;
  console.log("PlayerData:", playerData);
}

connectedRef.on("value", (snap) => {
  if(snap.val()) {
    var connection = connectionsRef.push(true);
    connection.onDisconnect().remove();
    var conKey = connection.getKey();

    playerData.connected = true;
    playerData.key = conKey;

    usersRef.once('value', (snap) => {

      if(snap.hasChild("player1")) {
        console.log("player 1 exists");
        usersRef.update({
          player2: playerData
        })
        usersRef.child("player2").onDisconnect().remove();
      } else if(!snap.hasChild("player1")) {
        console.log("player 1 does not exist");
        usersRef.update({
          player1: playerData
        })
        usersRef.child("player1").onDisconnect().remove();
      }
    })
  }
});

usersRef.on("value", (snap) => {
  console.log("usersRef snap:", snap);
  var key = Object.keys(snap.val())[0];
  console.log(`${key} has connected!`);
  // console.log(snap.val());

});

connectionsRef.on("value", (snap) => {
  $(".connected-players").text(snap.numChildren());
});

db.ref().on("value", (snap) => {
  // console.log("Snapshot:", snap);
}, (errorObj) => {
  console.log("Read failed:", errorObj.code);
});

$(".weapon").click(() => {
  var btnVal = $(this).attr("value");
  console.log(`buttonVal: ${btnVal}`);
});

// chooseWeapon("rock");