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

