// aqui exportaras las funciones que necesites
let email;

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
.signInWithPopup(provider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  let credential = result.credential;

  // This gives you a Google Access Token. You can use it to access the Google API.
  let token = credential.accessToken;
  // The signed-in user info.
  let user = result.user;
  console.log(user);
  // ...
}).catch((error) => {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  console.log('error', errorMessage);
  // ...
});
}

export const sendLinkOne = () => {
  email = document.querySelector('#inputEmail').value;
  let actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost/?email=' + firebase.auth().currentUser.email,
    // This must be true.
    handleCodeInApp: true,
    /*iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },*/
    dynamicLinkDomain: 'localhost:5000'
  };

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("errorCode:  ",errorCode,"  errorMessage  ",errorMessage);  
    // ...
  });
};

export const sendLink = () => { 
  // [START auth_send_email_verification] 
  firebase.auth().currentUser.sendEmailVerification() 
  .then(() => { // Email verification sent! // ... 
  });  
  // [END auth_send_email_verification] 
  console.log ('...') ;
}; 

export const signUpWithEmailPassword = () => {
  email = document.querySelector('#inputEmail').value;
  let password = document.querySelector('#inputPass').value;
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      let user = userCredential.user;
      // ...
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
};

