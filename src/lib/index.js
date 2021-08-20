// declarar email como variable gobal
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
  console.log('errorcredencial', credential, '\n errorMessaage', errorMessage);
  // ...
});
}

//enviar link de confirmación al correo
export const sendLink = () => { 
  // [START auth_send_email_verification] 
  firebase.auth().currentUser.sendEmailVerification() 
  .then(() => { // Email verification sent! // ... 
  });  
  // [END auth_send_email_verification] 
  console.log ('...') ;
}; 

//ingreso con correo y contraseña
export const signUpWithEmailPassword = () => {
  email = document.querySelector('#inputEmail').value;
  let password = document.querySelector('#inputPass').value;
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      let user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use'){
        console.log("entra el if", errorMessage);
      }
      else {
        console.log("eRROR CODE", errorCode);
      }
      // ..
    });
  // [END auth_signup_password]
};

//auth/invalid-email
//auth/weak-password CONTRASEÑA DEBIL