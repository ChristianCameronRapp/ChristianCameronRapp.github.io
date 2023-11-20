import { db, auth } from "./database.js";
import { getCurrentUser } from "./auth.js";
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { collection, addDoc, query, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

var barcodeScanner = document.querySelector('#barcode-scanner');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        // Now it's safe to get the fridge items because we know the user is logged in
        getFridgeItems(user.uid).then(displayFridgeItems).catch(console.error);
    } else {
        // No user is signed in
        console.error("No user logged in");
        // Redirect to login or handle it as needed
    }
});

Quagga.onDetected(function(data) {
    console.log(data.codeResult.code); // This is your EAN-13 barcode data
    Quagga.stop(); // Stop scanning
    barcodeScanner.style.display = "none";
    document.getElementById("kjoleskap-container").style.display = "block";
    hentData(data.codeResult.code);
});

document.getElementById('skannStrekkodeBtn').addEventListener('click', function() {
    barcodeScanner.style.display = "block";
    barcodeScanner.willReadFrequently = true;
    
    if (barcodeScanner) {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: barcodeScanner
            },
            decoder: {
                readers: ["ean_reader"], // specify barcode formats
                multiple: false // Specify that you want to detect one barcode at a time
            },
            locate: true, // try to locate the barcode in the image
            patchSize: "medium"
        }, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
            document.getElementById("kjoleskap-container").style.display = "none"
        });
    } else {
        console.error('Element #barcode-scanner not found');
    }
});

async function hentData(strekkodedata) {
    //lager definisjoner til henting av data
    const url = `https://kassal.app/api/v1/products/ean/${strekkodedata}`;

    const apiKey = 'EDWOrNbIMAW3XU6GvG0jR22TUsYvM5zlUvzykle2';
    const headers = {'Authorization': `Bearer ${apiKey}`};

    try {
        const response = await fetch(url, { headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        const produkt_data = data['data']['products'];
        const navn = produkt_data[0]['name'];
        const image_url = produkt_data[0]['image'];
        const selskap = produkt_data[0]['vendor'];

        const produkt_info = {
            name: navn,
            image: image_url,
            company: selskap
        }

        processData(produkt_info);
    } catch (error) {
        console.error("Could not fetch data: ", error);
    }
}

async function processData(produkt_info){
    const user = auth.currentUser;

    if (user) {
        try {
        const docRef = await addDoc(collection(db, `users/${user.uid}/fridgeList`), produkt_info);
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        getFridgeItems(user.uid).then(displayFridgeItems).catch(console.error);
    } else {
        console.error("No user logged in");
    }
}

async function getFridgeItems(userId) {
    const fridgeListRef = collection(db, 'users', userId, 'fridgeList');
    const q = query(fridgeListRef); // Add where() if needed for filtering
    try {
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
            // Combine the document data and the document ID in the items array
            items.push({id: doc.id, ...doc.data()});
        });
        return items;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

async function displayFridgeItems(items){
    var kjoleskapItem = document.getElementById("kjoleskap_item");
    kjoleskapItem.innerHTML = ""; // Clear existing items

    items.forEach((item) => {
        // Create the container for the item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('kjoleskap_item_innerHTML');
        itemContainer.setAttribute('data-id', item.id);

        // Construct the inner HTML for the item
        itemContainer.innerHTML = `
            <div class="outer_img">
                <img src="${item.image}" alt="Bilde av ${item.name}"></img>
            </div>
            <div class="outer-text">
                <div class="navn">${item.name}</div>
                <div class="selskap">${item.company}</div>
            </div>
            <div class="outer-edit">
                <img class="edit" src="https://cdn-icons-png.flaticon.com/256/84/84380.png"></img>
            </div>
            <div class="outer-delete">
                <img class="delete-btn" src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png"></img>
            </div>
        `;

        // Add the item to the list
        kjoleskapItem.appendChild(itemContainer);

        // Find the delete button within the item container and attach the event listener
        const deleteButton = itemContainer.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            deleteItem(item.id, itemContainer);
        });
    });
}

async function deleteItem(itemId, itemElement) {
    const user = auth.currentUser;
    if (user) {
        try {
            const docRef = doc(db, 'users', user.uid, 'fridgeList', itemId);
            await deleteDoc(docRef);
            console.log(`Document with ID ${itemId} deleted`);
            // Optionally remove the item element from the DOM
            itemElement.remove();
            // Or re-fetch and update the list
            // getFridgeItems(user.uid).then(displayFridgeItems).catch(console.error);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    } else {
        console.error("No user logged in");
    }
}