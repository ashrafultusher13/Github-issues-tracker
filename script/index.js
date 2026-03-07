document.getElementById("login-btn").addEventListener("click", function () {
  // getting the username
  const inputName = document.getElementById("input-name");
  const userName = inputName.value;
  console.log(userName);
  // getting the password
  const inputPin = document.getElementById("input-pin");
  const password = inputPin.value;
  console.log(password);
  // matching values
  if (userName == "admin" && password == "admin123") {
    window.location.assign("home.html");
  } else {
    alert("Username or password is invalid");
    return;
  }
});