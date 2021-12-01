
var firebaseConfig = {
    apiKey: "AIzaSyAd20W2RGDHvsOgTHkw4M9vxPRdpxV-DVQ",
    authDomain: "camover-17d96.firebaseapp.com",
    projectId: "camover-17d96",
    storageBucket: "camover-17d96.appspot.com",
    messagingSenderId: "110735444043",
    appId: "1:110735444043:web:8cb55c9ead4dea599d65ce",
    measurementId: "G-F7ZD50MBG8"
};
//Initialize firebase
firebase.initializeApp(firebaseConfig);

//Initialize variables
const auth = firebase.auth()
var database = firebase.database()
var db = firebase.firestore();
var user = firebase.auth().currentUser;
var loggedIn = false;
var user_id;