import {auth, db, getDoc, doc, onAuthStateChanged} from './firebaseConfig.js';

const fullName = document.getElementById("full_name");
const availability = document.getElementById("availability");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", auth.currentUser.uid); // Referanse til brukerdokumentet
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                fullName.textContent = userData.fullName; // Sett fullt navn
                availability.textContent = userData.availability; // Sett tilgjengelighetsstatus
                // Setter farge utifra tilgjengelighetsstatus
                if (userData.availability === "Tilgjengelig") {
                    availability.style.color = "green";
                } else if (userData.availability === "Delvis tilgjengelig") {
                    availability.style.color = "orange";
                } else {
                    availability.style.color = "red";
                }
            } else {
                console.log("Ingen brukerdata funnet.");
                fullName.textContent = "Ingen data";
                availability.textContent = "Ingen data";
            }
        } catch (error) {
            console.error("Feil ved henting av brukerdata:", error);
            fullName.textContent = "Feil ved lasting";
            availability.textContent = "Feil ved lasting";
        }
    } else {
        console.log("Ingen bruker logget inn.");
        fullName.textContent = "Ikke logget inn";
        availability.textContent = "Ikke logget inn";
    }
})