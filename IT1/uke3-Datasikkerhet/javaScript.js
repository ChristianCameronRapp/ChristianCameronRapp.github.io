var tblUsers = document.getElementById('tbl_users_list');
var databaseRef = firebase.database().ref('users/');
var rowIndex = 1;

databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();

   var row = tblUsers.insertRow(rowIndex);
   var cellId = row.insertCell(0);
   var cellName = row.insertCell(1);
   cellId.appendChild(document.createTextNode(childKey));
   cellName.appendChild(document.createTextNode(childData.user_name));

   rowIndex = rowIndex + 1;
    });
  });

function save_user() {
    var user_name = document.getElementById('user_name').value;

    var uid = firebase.database().ref().child('users').push().key;

    var data = {
        user_id: uid,
        user_name: user_name
    }

    var updates = {};
    updates['/users/' + uid] = data;
    firebase.database().ref().update(updates);

    alert('The user has been created succssesfully');
    reload_page();
}

function update_user() {
  var user_name = document.getElementById('user_name').value;
  var user_id = document.getElementById('user_id').value;

  var data = {
    user_id: user_id,
    user_name: user_name
  }

  var updates = {};
  updates['/users/' + user_id] = data;
  firebase.database().ref().update(updates);

  alert('The user has been updated succssesfully');

  reload_page();
}

function delete_user() {
    var user_id = document.getElementById('user_id').value;

    firebase.database().ref().child('/users/' + user_id).remove();
    alert('The user has been deleted succssesfully');
    reload_page();
}

function reload_page() {
    window.location.reload();
}
