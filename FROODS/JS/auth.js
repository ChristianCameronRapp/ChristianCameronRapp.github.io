// Import the auth instance from database.js
import { auth } from './database.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

export function getCurrentUser() {
    return auth.currentUser;
}

// Check if the user is logged in
onAuthStateChanged(auth, user => {
    if (user) {
        // User is signed in, you can manipulate the DOM here
        const userImg = document.getElementById('userImg');
        const welcomeElement = document.getElementById('welcomeElement');

        userImg.src = `${user.photoURL}`
        if (welcomeElement){
            welcomeElement.textContent = `${user.displayName} sitt kjøleskap`;
        }
    } else {
        // No user is signed in, redirect to the login page
        window.location.href = 'logg-in.html';
    }
});
