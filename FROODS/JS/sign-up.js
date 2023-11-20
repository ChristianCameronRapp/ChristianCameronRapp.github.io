import { auth } from "./database.js";
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';;
import { updateProfile } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';

const storage = getStorage();

async function signUpUser(email, password, username, profilePicture) {
  if (!validateEmail(email)) {
    console.error('Invalid email format');
    return;
  }

  if (!validatePassword(password)) {
    console.error('Password does not meet minimum requirements');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username
    });

    // Upload profile picture to Firebase Storage (assuming you have Firebase Storage set up)
    const profilePictureRef = storageRef(storage, `profile_pictures/${user.uid}`);
    const snapshot = await uploadBytes(profilePictureRef, profilePicture);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update user profile with profile picture URL
    await updateProfile(user, {
      photoURL: downloadURL
    });


    // The user is now signed up and authenticated, user contains the updated user info
    console.log(user);
    window.location.href = 'signed-up.html';
  } catch (error) {
    console.error(error);
    // Handle errors here, such as email already in use
    if (error.code === 'auth/email-already-in-use') {
      console.log("Email already in use!");
    } else {
      // Handle other errors
    }
  }
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // This is a simple regex for demonstration purposes
  return regex.test(email);
}

function validatePassword(password) {
  return password.length > 6;
}

// Event listener for the sign-up button
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById('emailInp').value.trim();
    const password = document.getElementById('passwordInp').value.trim();
    const username = document.getElementById('usernameInp').value.trim();
    const profilePicture = document.getElementById('profilePictureInp').files[0];

    await signUpUser(email, password, username, profilePicture);
  });
});