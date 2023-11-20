import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBy1SKEkQP-bWdy2kr4zDCNR1XhrncSTzE",
  authDomain: "mat-app-test.firebaseapp.com",
  projectId: "mat-app-test",
  storageBucket: "mat-app-test.appspot.com",
  messagingSenderId: "846609323196",
  appId: "1:846609323196:web:49700fbbe6a82d501f2cb9",
  measurementId: "G-SD0VH9TD42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app)
export { signInWithEmailAndPassword };