
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

//check for active user
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    getUser(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
//login function
function login() {
  var email = document.getElementById("email_field").value;
  var password = document.getElementById("pass_field").value;

  if(ValidateEmail(email) == false || ValidatePass(password) == false){
    alert('Check your email and password!');
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function(){
    var user = auth.currentUser;
    var db_ref = database.ref();
    
    // updating last login details    
    var user_data = {
      last_login : Date.now()
    }
    db_ref.child('users/'+ user.uid).update(user_data);

  })
  .catch(function(error){
    var error_code = error.code
    var error_message = error.message
    alert(error_message)

  })
}

//register function
function register(){
  var email = document.getElementById("email_field").value;
  var password = document.getElementById("pass_field").value;
  var full_name = document.getElementById("user_name").value;

  //validate input
  if(ValidateEmail(email)==false && ValidatePass(password)==false){
    alert('Check your email or password!');
    return
  }

  auth.createUserWithEmailAndPassword(email,password)
  .then(function () {
    var user = auth.currentUser
    writeUserData(user.uid, full_name, email)
    alert('Welcome ' + full_name + '!');
      
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
  });
}

function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    alert("Signed out user!")
  }).catch((error) => {
    // An error happened.
  });
}


// writes user data to the databses
function writeUserData(userId, name, email) {
 
  var usersCollection = db.collection("users");

  var userDocument = usersCollection.doc(userId);

  userDocument.set({ 
    name : name,
    email : email,
    last_login : Date.now()
  })
  .then(()=>{
      firebase.database().ref('users/' + userId).set({
        name: name,
        email: email,
        last_login : Date.now()
      });
      console.log("User written successfully");
  })
  .catch(error=>{
    console.log(error.message);
  });


}

// checks for a valid email address
function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
// checks for a valid password
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

function getUser(uid){
  // fetching user details
  var docRef = db.collection("users").doc(uid);
  docRef.get().then((doc) => {
      if (doc.exists) {
        data = doc.data();
        currUsername = data.name;
        document.getElementById("acc_name").innerHTML = currUsername;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}