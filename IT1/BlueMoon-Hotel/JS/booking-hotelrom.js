const valgtRomInfo = document.querySelector("#valgt-rom-info");

//Url Variabler
let url_string = window.location.href;
let url = new URL(url_string);
let id = url.searchParams.get("id");

console.log(id);

//trenger ikke referanser til database siden jeg har gjort de i main.js
const db = firebase.database();
const valgtRom = db.ref("room/"+id);

//Funksjonsdefinisjoner
function showChosenRoom() {
  valgtRomInfo.innerHTML = ``;
  valgtRom.on("value", generateChosenRoomHTML);
}

function generateChosenRoomHTML(snapshot) {
  let key = snapshot.key;
  let room = snapshot.val();

  valgtRomInfo.innerHTML += `
    <div style="font-weight: bold; font-size: 2.5vw; margin: auto;">
      ROM ${room.roomNr}
    </div>
    <div style="width: 100%; margin: auto;">
      <div style="margin-top: 1vw; margin-bottom: 1vw; font-size: 1.4vw;">Dette rommet er for øyeblikket ${room.status}. Tidligere forbrukere har gitt dette hotellrommet en vurdering på ${room.viewRating} av 10. Dette rommet har et innhold av ${room.beds} Senger.</div>
    </div>
    <div style="grid-row: 4; display: grid">
      <a style="text-align: center; font-size: 1.7vw; padding: .5vw; background-color: green; color: #eaeaea; text-decoration: none;" href="booking-checkout.html">BOOK FRA ${room.price} NOK / NATT</a>
    </div>
  `;
}

showChosenRoom();
