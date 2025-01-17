import { home } from "../view/templateHome.js";

/** Registro con cuenta de Google*/
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
      console.log(user, "token", token);
      // ...
      /** Actualizar perfil del usuario en firestore*/
      setDataUser(user, user.displayName, "", "", "");
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
/** Esta función permite crear los datos y enviar los datos a la colección de firestore*/
export const setDataUser = (user, nameUser, userData, genderUser, dateUser) => {
  const uid = user.uid;
  db.collection("users")
    .doc(uid)
    .set({
      name: nameUser,
      user: userData,
      gender: genderUser,
      date: dateUser,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
/** Función para el envio de correo para verificacion de usuario*/
export const sendLink = (userName) => {
  console.log(userName);
  const user = firebase.auth().currentUser;
/** Actualiza el nombre de ususario con el que se proporciona en el momento del registro*/
  user.updateProfile({
      displayName: userName,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(() => {
      // Update successful
      // ...
      // [Metodo para enviar en mail de verificacion con el nombre de usuario] 
      user.sendEmailVerification().then(() => {
        //firebase.auth().currentUser.displayName = user;
        console.log(user);
        // Email verification sent! // ...
      })
    .catch ((error) =>{
      console.log('Algo fallo en el registro ', error);
    });  
      // [END auth_send_email_verification]
    }) 
    .catch((error) => {
      // An error occurred
      // ...
    });
};
/**registro de usuario con correo y contraseña*/
export const signUpWithEmailPassword = (email, password) => {
  // [START auth_signup_password]
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
/**Ingreso de usuario con correo y contraseña*/
export const loginWithPasswordEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
