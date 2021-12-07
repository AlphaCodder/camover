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
    loggedIn = true;
    window.location.href = "index.html";

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
//signout function
function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    document.getElementById("acc_name").innerHTML = "MY ACCOUNT";
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
//logout function
function LogOut(loggedIn) {
  if(loggedIn == false){
    document.getElementById(logOutBtn).style.visibility = "hidden";
  }
  else{
  }
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
//check for active user
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    getUser(uid);
    loggedIn = true;
  } else {
    loggedIn = false;
    document.getElementById("logOutBtn").style.display = "none";
    // User is signed out
  }
});
//display user
function getUser(uid){
  // fetching user details
  var docRef = db.collection("users").doc(uid);
  docRef.get().then((doc) => {
      if (doc.exists) {
        data = doc.data();
        currUsername = data.name;
        document.getElementById("acc_name").innerHTML = currUsername;
        document.getElementById("acc_name").href = "profile.html";
        retUser(data);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        document.getElementById("acc_name").innerHTML = "MY ACCOUNT";
      }
      user_id = uid;
      return user_id;
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}
//update user info
function profileUpdate() {
  console.log(user_id);
  username = document.getElementById("fullName").value;
  gender = document.getElementById("gender").value;
  mobNo = document.getElementById("phno").value;
  address  = document.getElementById("location").value;
   
  db.collection("users").doc(user_id).update({ 
    name: username,
    mobNo:mobNo,
    address: address,
    gender:gender,
    last_login : Date.now()
  },{merge : true})
  .then(()=>{
      firebase.database().ref('users/' + user_id).update({
        name: username,
        mobNo:mobNo,
        address: address,
        gender:gender,
        last_login : Date.now()
      });
      console.log("User written successfully");
  })
  .catch(error=>{
    console.log(error.message);
  });
}

function retUser(data){
  document.getElementById("fullName").placeholder = data.name;
  document.getElementById("gender").placeholder = data.gender;
  document.getElementById("phno").placeholder = data.mobNo;
  document.getElementById("location").placeholder = data.address;
}