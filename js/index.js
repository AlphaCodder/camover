
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
const database = firebase.database()

//register function
function register(){
  var email = document.getElementById("email_field").value;
  var password = document.getElementById("pass_field").value;
  var fullname = document.getElementById("user_name").value;

  //validate input
  if(ValidateEmail(email)==false && ValidatePass(password)==false){
    alert('Check your email or password!');
    return
  }

  //auth user
  auth.createUserWithEmailAndPassword(email,password)
  .then(function () {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      email :email,
      fullname : fullname,
      last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).set(user_data)
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

  alert('Sign Up Successful!')
}

function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function ValidatePass(password) {
  if(password<6){
    return false;
  }
  else{ 
    return true;
  }
}

// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// function login(){
//   var userEmail = document.getElementById("email_field").value;
//   var userPass = document.getElementById("pass_field").value;

//   firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
  
//       window.alert("Error : " + errorMessage);
  
//       // ...
//     });
// }

