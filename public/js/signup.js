function validateEmail(email) {
    var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
}


function signup() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirm = document.getElementById('confirm').value;
  if (password != confirm) {
    alert("Passwords do not match.");
    document.getElementById('password').value = '';
    document.getElementById('confirm').value = '';
  } else if (password.length < 6) {
    alert("Password should be at least 6 characters");
    document.getElementById('password').value = '';
    document.getElementById('confirm').value = '';
  }
  // } else if (validateEmail(email)) {
  //   alert("Please enter a valid email address");
  //   document.getElementById('email').value = '';
  //   document.getElementById('password').value = '';
  //   document.getElementById('confirm').value = '';
  // }
  else {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      if (error) {
        console.log('Error in creating new user');
      }
      window.location.assign('/login');
    });
  }
};

var initApp = function() {
  // document.getElementById('sign-in-with-redirect').addEventListener(
  //     'click', signInWithRedirect);
  // document.getElementById('sign-in-with-popup').addEventListener(
  //     'click', signInWithPopup);
  document.getElementById('submit').addEventListener('click', function() {
    signup();
  });
  console.log("HELLOOOOO");
};

window.addEventListener('load', initApp);
