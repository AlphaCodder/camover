import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAd20W2RGDHvsOgTHkw4M9vxPRdpxV-DVQ",
  authDomain: "camover-17d96.firebaseapp.com",
  projectId: "camover-17d96",
  storageBucket: "camover-17d96.appspot.com",
  messagingSenderId: "110735444043",
  appId: "1:110735444043:web:8cb55c9ead4dea599d65ce",
  measurementId: "G-F7ZD50MBG8"
  });

  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, user => {
    if (user) {
    } else {
    }
  });

  // to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("pass_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
}

