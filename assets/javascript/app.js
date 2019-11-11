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

connectedRef.on("value", (snap) => {
  if(snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", (snap) => {
  console.log('connectionsRef snap', snap);
  console.log("Number of connections:", snap.numChildren());
  $(".connected-players").text(snap.numChildren());
});

var player1 = {
  connected: false,
  move: null,
}

var player2 = {
  connected: false,
  move: null,
}

db.ref().on("value", (snap) => {
  console.log("Snapshot:", snap);
}, (errorObj) => {
  console.log("Read failed:", errorObj.code);
});