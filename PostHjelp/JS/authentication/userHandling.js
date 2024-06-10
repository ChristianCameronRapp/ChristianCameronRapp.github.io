import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, db, doc, setDoc } from '../firebaseConfig.js';

// Logg inn bruker
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Bruker logget inn:", userCredential.user);
        window.location.href = '../index.html'; // Eller annen dashboard side
    } catch (error) {
        console.error("Innloggingsfeil:", error);
        alert("Innloggingsfeil: " + error.message);
    }
}

// Registrer bruker med navn og tilgjenglighetsstatus
export async function registerUser(email, password, fullName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
            fullName: fullName,
            availability: "Tilgjengelig", // Standard tilgjengelighetsstatus ved ny bruker
            role: "vikar" // Standard rolle ved ny bruker
        });
        console.log("Bruker registrert og data lagret!");
        window.location.href = '/HTML/authentication/registrert_bruker.html'; // Omdirigerer etter vellykket registrering
    } catch (error) {
        console.error("Registreringsfeil:", error);
        alert("Registreringsfeil: " + error.message);
    }
}

// Logg ut bruker
export function logoutUser() {
    signOut(auth).then(() => {
        console.log('Bruker logget ut');
        window.location.href = '/HTML/authentication/auth.html';
    }).catch((error) => {
        console.error('Feilmelding ', error);
    });
}