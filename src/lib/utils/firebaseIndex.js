/** Esta función permite crear los datos y enviar los datos a la colección de firestore */
export const setDataUser = (user, nameUser, userData, genderUser, dateUser) => {
  const uid = user.uid;
  // eslint-disable-next-line
  db.collection('users')
    .doc(uid)
    .set({
      name: nameUser,
      userName: userData,
      gender: genderUser,
      date: dateUser,
    })
    .then(() => { });
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
      // [Metodo para enviar en mail de verificacion con el nombre de usuario]
      user
        .sendEmailVerification()
        .then(() => {
          // Email verification sent!
        })
        .catch((error) => error);
    })
    .catch((error) => error);
};
/** Registro de usuario con correo y contraseña */
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

export const getCurrentUser = () => firebase
  .auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/';
    }
    return window.location.hash;
  });
/** este metodo mantiene la sesion activa hasta que el usuario cierre sesión */
export const setPersistence = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // eslint-disable-next-line
    .then(() => firebase.auth().signInWithEmailAndPassword(email, password))
    .catch((error) => error);
};
/** este metodo permite al usuario cerrar sesión */
export const signOut = () => {
  const out = firebase
    .auth()
    .signOut()
    .then(() => {
    });
  return out;
};
/** este metodo crea una nueva colección (Post) */
export const addPost = (currentPost) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  // eslint-disable-next-line
  const docRef = db.collection('users').doc(uid);
  return docRef.get().then((doc) => {
    if (doc.exists) {
      // eslint-disable-next-line
      db.collection('post')
        .add({
          userId: docRef,
          post: currentPost,
          likes: [],
        })
        .then(() => {
        })
        .catch((error) => error);
    } else {
      // doc.data() estaria indefinido en este caso
      // doc.data() will be undefined in this case
    }
  }).catch((error) => error);
};
/** Esta funcion llama a la colección de firestore */
// eslint-disable-next-line
export const dataPost = () => db.collection('post');
/** Esta funcion actualiza los datos de la colección en firestore */
export const setPost = (idPost, postUpdate) => {
  const userId = firebase.auth().currentUser.uid;
  // eslint-disable-next-line
  const docRef = db.collection('users').doc(userId);
  // eslint-disable-next-line
  db.collection('post')
    .doc(idPost)
    .set({
      likes: [],
      post: postUpdate,
      userId: docRef,
    })
    .then(() => { });
};
/** Esta funcion elimina los post en firestore */
export const deletePost = (idPost) => {
  // eslint-disable-next-line
  db.collection('post').doc(idPost).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};
/** Esta funcion añade un elemento al array de likes en los post en firestore */
export const addLike = (idPost, idUser) => {
  // eslint-disable-next-line
  const collectionLikes = db.collection('post').doc(idPost);
  collectionLikes.update({
    likes: firebase.firestore.FieldValue.arrayUnion(idUser),
  });
};
/** Esta funcion elimina un elemento al array de likes en los post en firestore */
export const removeLike = (idPost, idUser) => {
  // eslint-disable-next-line
  let collectionLikes = db.collection('post').doc(idPost);
  collectionLikes.update({
    likes: firebase.firestore.FieldValue.arrayRemove(idUser),
  });
};
