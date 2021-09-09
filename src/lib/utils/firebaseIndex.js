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
  // .catch((error) => error);
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
    if (user) {
      if (user.emailVerified) {
        window.location.hash = '#/home';
      } else {
        window.location.hash = '#/';
      }
    }
  });

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
export const addPost = ( currentPost ) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const docRef = db.collection('users').doc(uid); 
docRef.get().then((doc) => {
  if (doc.exists) {
    /* if (doc.data().userName){
      nickName = doc.data().userName; 
    }else {
      nickName = doc.data().name;  
    } */
    // eslint-disable-next-line
    db.collection('post')
      // .doc()
      .add({
        userId: docRef,
        // name: nickName,
        post: currentPost,
        likes: [],
      })
      .then(() => { 
        console.log('los datos subieron correctamente')
      })
      .catch((error) => {
        console.log('error' + error)
      });

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
};

export const dataPost = () => db.collection("post")

export const setPost = (idPost, postUpdate) => {
  const userId = firebase.auth().currentUser.uid;
  const docRef = db.collection('users').doc(userId);
  db.collection('post')
    .doc(idPost)
    .set({
      likes: [],
      post: postUpdate,
      userId: docRef
    })
    .then(() => { });
};

export const deletePost = (idPost) => {
db.collection('post').doc(idPost).delete().then(() => {
  console.log("Document successfully deleted!");
}).catch((error) => {
  console.error("Error removing document: ", error);
});
};

export const addLike = (idPost, idUser) => {
let collectionLikes = db.collection('post').doc(idPost);
// Atomically add a new region to the "regions" array field.
collectionLikes.update({
    likes: firebase.firestore.FieldValue.arrayUnion(idUser),
});
};

export const removeLike = (idPost, idUser) => {
  let collectionLikes = db.collection('post').doc(idPost);
  // Atomically add a new region to the "regions" array field.
  collectionLikes.update({
      likes: firebase.firestore.FieldValue.arrayRemove(idUser),
  });
  };