import { home } from "./view/templateHome.js";

// Registro con Google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
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
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      console.log(
        "errorcredencial",
        credential,
        "\n errorMessaage",
        errorMessage
      );
      // ...
    });
};
export const sendLink = () => {
  // [START auth_send_email_verification]
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      console.log(firebase.auth().currentUser);
      // Email verification sent! // ...
    });
  // [END auth_send_email_verification]
  console.log("...");
};
//ingreso con correo y contraseña
export const signUpWithEmailPassword = (email, password) => {
  // [START auth_signup_password]
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(user.emailVerified);
      // ...
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        console.log("entra el if", errorMessage);
      } else {
        console.log("eRROR CODE", errorCode);
      }
      // ..
    })
    .then(() => {
      sendLink();
    });

  // [END auth_signup_password]
};

//auth/invalid-email
//auth/weak-password CONTRASEÑA DEBIL
export const getCurrentUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(user)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};
export const loginWithPasswordEmail = (email, password) => {
  console.log('Ingreso al M',email);
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('Usuario logueado',user);
    if (user.emailVerified === true){
      alert ('Correo OK');
    }
    else {
      alert ('Debes Verificar tu correo');
    }
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}; 