/** Esta función permite crear los datos y enviar los datos a la colección de firestore */
export const setDataUser = (user, nameUser, userData, genderUser, dateUser) => {
  const uid = user.uid;
  // eslint-disable-next-line
  db.collection('users')
    .doc(uid)
    .set({
      name: nameUser,
      user: userData,
      gender: genderUser,
      date: dateUser,
    })
    .then(() => {})
    .catch((error) => error);
};

/** Registro con cuenta de Google */
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const user = result.user;
      /** Actualizar perfil del usuario en firestore */
      setDataUser(user, user.displayName, '', '', '');
      window.location.hash = '#/home';
      return window.location.hash;
    })
    .catch((error) => error);
};

/** Función para el envio de correo para verificacion de usuario */
export const sendLink = (userName) => {
  const user = firebase.auth().currentUser;
  /** Actualiza el nombre de ususario con el que se proporciona en el momento del registro */
  user
    .updateProfile({
      displayName: userName,
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
    .then(() => {
      // Update successful
      // ...
      // [Metodo para enviar en mail de verificacion con el nombre de usuario]
      user
        .sendEmailVerification()
        .then(() => {
          // firebase.auth().currentUser.displayName = user;
          // Email verification sent!
        })
        .catch((error) => error);
      // [END auth_send_email_verification]
    })
    .catch((error) => error);
  // {
  // An error occurred
  // ...
  // });
};
/** registro de usuario con correo y contraseña */
export const signUpWithEmailPassword = (email, password) => {
  const register = firebase
    .auth().createUserWithEmailAndPassword(email, password);
  return register;
};
/** Ingreso de usuario con correo y contraseña */
export const loginWithPasswordEmail = (email, password) => {
  const login = firebase
    .auth().signInWithEmailAndPassword(email, password);
  return login;
};

export const getCurrentUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user.emailVerified) {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/';
    }
    console.log(window.location.hash);
    return window.location.hash;
  });
};

export const setPersistence = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    // eslint-disable-next-line
    .then(() => firebase.auth().signInWithEmailAndPassword(email, password))
    .catch((error) => error);
};
export const signOut = () => {
  const out = firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    });
  return out;
};
