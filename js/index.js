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
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
    } else {
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
    }
  });