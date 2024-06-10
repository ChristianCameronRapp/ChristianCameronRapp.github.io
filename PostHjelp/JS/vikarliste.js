import { db, getDocs, collection, where, query } from './firebaseConfig.js';

async function fetchVikars() {
    const vikarsRef = collection(db, "users");
    const vikarQuery = query(vikarsRef, where("role", "==", "vikar"));
    const querySnapshot = await getDocs(vikarQuery);

    const vikarsList = [];
    querySnapshot.forEach((doc) => {
        vikarsList.push([doc.data().fullName, doc.data().availability]);
    });

    updateVikarListHTML(vikarsList);
}
  
function updateVikarListHTML(vikars) {
    const section = document.getElementById('vikarliste');
    let htmlContent = '';
    for(let i = 0; i < vikars.length; i++) {
        let color = "green"; // Setter defaultfarge til grønn (tilgjengelig)
        
        if (vikars[i][1] === "Delvis tilgjengelig"){
            color = "orange";
        } else if (vikars[i][1] === "Ikke tilgjengelig"){
            color = "red";
        }

        htmlContent += `
            <div class="vikarliste_element">
                <div class="vikarliste_element_navn">${vikars[i][0]}</div>
                <div class="vikarliste_element_status" style="color: ${color}">${vikars[i][1]}</div>
            </div>
        `;
    }
    section.innerHTML = htmlContent;
}

fetchVikars();