import { db, auth, signInWithEmailAndPassword } from "./database.js";

// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(event){
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Redirect to index.html on successful login
            window.location.href = '../index.html';
        })
        .catch((error) => {
            // Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // Optionally, implement user feedback
        });
});