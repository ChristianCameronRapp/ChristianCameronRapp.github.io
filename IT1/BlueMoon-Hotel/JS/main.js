/*const hotellrom = document.querySelector("#hotellrom");
const hotellromRomStatus = document.querySelector("#hotellrom-rom-status");
const extraSelections = document.querySelector("#extra-selections");

const db = firebase.database();
const rooms = db.ref("room");

function genererRomHTML(snapshot){
  let key = snapshot.key;
  let room = snapshot.val();

  hotellrom.innerHTML += `
    <a href="booking-hotelrom.html?id=${key}" class="hotellrom-rom">
      <div class="hotellrom-rom-status hotellrom-rom-status-${room.status}">${room.status}</div>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">ROM</div>
        <div style="font-size: 1.3vw;">${room.roomNr}</div>
      </section>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">PRIS</div>
        <div style="font-size: 1.3vw;">${room.price} NOK / NATT</div>
      </section>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">SENGER</div>
        <div style="font-size: 1.3vw;">${room.beds}</div>
      </section>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">VURDERING</div>
        <div style="font-size: 1.3vw;">${room.viewRating} / 10</div>
      </section>
    </a>
  `;
}

function genererRomPHHTML(snapshot){
  let key = snapshot.key;
  let room = snapshot.val();

  hotellrom.innerHTML = `
    <a href="booking-hotelrom.html?id=${key}" class="hotellrom-rom">
      <div class="hotellrom-rom-status hotellrom-rom-status-${room.status}">${room.status}</div>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">ROM</div>
        <div style="font-size: 1.3vw;">${room.roomNr}</div>
      </section>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">PRIS</div>
        <div style="font-size: 1.3vw;">${room.price} NOK / NATT</div>
      </section>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">SENGER</div>
        <div style="font-size: 1.3vw;">${room.beds}</div>
      </section>
      <section style="display: grid; grid-template-rows: 1fr 1fr;">
        <div style="font-weight: bold; font-size: 1.7vw;">VURDERING</div>
        <div style="font-size: 1.3vw;">${room.viewRating} / 10</div>
      </section>
    </a>
  ` + hotellrom.innerHTML;
}

function generateSelectionHTML() {
  extraSelections.innerHTML = ``;
  extraSelections.innerHTML += `
    <button onclick="showRomBeds1()" id="onChangeBtn">1</button>
    <button onclick="showRomBeds2()" id="onChangeBtn">2</button>
    <button onclick="showRomBeds3()" id="onChangeBtn">3</button>
  `;
}

function generateSelectionPrisHTML() {
  extraSelections.innerHTML = ``;
  extraSelections.innerHTML += `
    <button onclick="showRomPrisl()" id="onChangeBtn">LAV-HØY</button>
    <button onclick="showRomPrish()" id="onChangeBtn">HØY-LAV</button>
  `;
}

function generateSelectionVurderingHTML() {
  extraSelections.innerHTML = ``;
  extraSelections.innerHTML += `
    <button onclick="showRomVurderingh()" id="onChangeBtn">HØY-LAV</button>
    <button onclick="showRomVurderingl()" id="onChangeBtn">LAV-HØY</button>
  `;
}

showRom();

function showRom(){
  hotellrom.innerHTML = ``;
  extraSelections.innerHTML = ``;
  rooms.orderByChild("price").startAt(900).endAt(999).limitToFirst(20).on("child_added", genererRomHTML);
}

function showRomPrisl(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("price").limitToFirst(20).on("child_added", genererRomHTML);
}

function showRomPrish(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("price").limitToLast(20).on("child_added", genererRomPHHTML);
}

function showRomBeds1(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("beds").equalTo(1).limitToFirst(50).on("child_added", genererRomHTML);
}

function showRomBeds2(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("beds").equalTo(2).limitToFirst(50).on("child_added", genererRomHTML);
}

function showRomBeds3(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("beds").equalTo(3).limitToFirst(50).on("child_added", genererRomHTML);
}

function showRomVurderingl(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("viewRating").limitToFirst(50).on("child_added", genererRomPHHTML);
}

function showRomVurderingh(){
  hotellrom.innerHTML = ``;
  rooms.orderByChild("viewRating").limitToLast(50).on("child_added", genererRomHTML);
}

function onChange(){
  if(document.getElementById("onChangeSelect").value == "ALLE"){
    showRom();
  }
  if(document.getElementById("onChangeSelect").value == "PRIS"){
    showRomPrisl();
    generateSelectionPrisHTML();
  }
  if(document.getElementById("onChangeSelect").value == "SENGER"){
    showRomBeds1();
    generateSelectionHTML();
  }
  if(document.getElementById("onChangeSelect").value == "VURDERING"){
    showRomVurderingh();
    generateSelectionVurderingHTML();
  }
}
*/
