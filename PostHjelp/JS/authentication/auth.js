import { auth, onAuthStateChanged } from '../firebaseConfig.js';

// Autentiseringsstatus sjekk
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = '/HTML/authentication/auth.html'; // Omdirigerer til innlogging hvis ikke innlogget
  }
});