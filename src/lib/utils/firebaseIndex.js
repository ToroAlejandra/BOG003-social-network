/** Esta función permite crear los datos y enviar los datos a la colección de firestore */
export const setDataUser = (user, nameUser, userData, genderUser, dateUser) => {
  const uid = user.uid;
  db.collection('users')
    .doc(uid)
    .set({
      name: nameUser,
      user: userData,
      gender: genderUser,
      date: dateUser,
    })
    .then(() => {
    })
    .catch((error) => {
    });
};

/** Registro con cuenta de Google */
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      /** Actualizar perfil del usuario en firestore */
      setDataUser(user, user.displayName, '', '', '');
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
};

/** Función para el envio de correo para verificacion de usuario */
export const sendLink = (userName) => {
  const user = firebase.auth().currentUser;
  /** Actualiza el nombre de ususario con el que se proporciona en el momento del registro */
  user.updateProfile({
    displayName: userName,
    photoURL: 'https://example.com/jane-q-user/profile.jpg',
  })
    .then(() => {
      // Update successful
      // ...
      // [Metodo para enviar en mail de verificacion con el nombre de usuario]
      user.sendEmailVerification().then(() => {
        // firebase.auth().currentUser.displayName = user;
        // Email verification sent!
      })
        .catch((error) => {
        });
      // [END auth_send_email_verification]
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
/** registro de usuario con correo y contraseña */
export const signUpWithEmailPassword = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
/** Ingreso de usuario con correo y contraseña */
export const loginWithPasswordEmail = (email, password) => 
firebase.auth().signInWithEmailAndPassword(email, password);

export const getCurrentUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.hash = '#/home';
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

export const setPersistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};
