import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    document.getElementById("log-in").style.display = "initial";
    document.getElementById("logged-in").style.display = "none";
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    
    document.getElementById("log-in").style.display = "none";
    document.getElementById("logged-in").style.display = "initial";
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
    window.alert(userEmail + " " + userPass);
}