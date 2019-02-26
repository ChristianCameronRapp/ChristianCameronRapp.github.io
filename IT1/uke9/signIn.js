var uiConfig = {
  signInSuccessUrl: 'index.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: function(){
    window.location.assign('<your-privacy-policy-url>');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', uiConfig);
