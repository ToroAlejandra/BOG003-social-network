import {
  /*   signUpWithEmailPassword,
    loginGoogle,
    signOut,
    setDataUser,
    getCurrentUser,
    sendLink,
    setPersistence,
  loginWithPasswordEmail, */
  addPost,
  // dataPost,
} from '../src/lib/utils/firebaseIndex.js';

const { mockFirebase } = require('firestore-jest-mock');

mockFirebase({
  database: {
    users: [
      {
        date: '01-12-1990', gender: 'masculino', name: 'Homer Simpson', userName: 'Homer',
      },
      {
        date: '01-10-1996', gender: 'femenino', name: 'lisa Simpson', userName: 'lisa',
      },
    ],
    post: [
      { likes: '', post: 'Really cool title', userId: '123456' },
      { likes: '', post: ' cool title', userId: '789456' },
    ],
  },
});

const { mockCollection } = require('firestore-jest-mock/mocks/firestore');

describe('addPost', () => {
  // eslint-disable-next-line
  const firebase = require('firebase');
  const db = firebase.firestore();
  it('get post', () => db
    .collection('users')
    .get()
    .then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(userDocs.docs[0].data().name).toEqual('Homer Simpson');
    }));

  it('add post', () => {
    const text = 'Hola';
    // return loginWithPasswordEmail('example@gmail.com', '1234567').then((res) => {
    return addPost(text).then(() => {
      // eslint-disable-next-line
      db.collection('post').where('post', '==', text).get().then((querySnapshot) => {
        expect(querySnapshot.size).toBe(1);
      });
    });
    // });
  });
});

// const MockFirebase = require('firebase-mock');
// const { mockFirebase } = require('firestore-jest-mock');
// const { mockCollection } = require('firestore-jest-mock/mocks/firestore');

/* const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  (path) => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth,
);
const db = new firebasemock.MockFirebase({
  users: [
    {
      date: '01-12-1990', gender: 'masculino', name: 'Homer Simpson', userName: 'Homer',
    },
    {
      date: '01-10-1996', gender: 'femenino', name: 'lisa Simpson', userName: 'lisa',
    },
  ],
  post: [{
    likes: '', post: 'Really cool title', userId: '123456',
  }],
},
{}); */

/* describe('setDataUser', () => {
  it('setDataUser is a function', () => {
    expect(typeof setDataUser).toBe('function');
  });
  it('set Data User is a function', () => {
    setDataUser('juan', 'juanito', 'masculino', '12/12/1990');
    expect(setDataUser).toBe(['juan', 'juanito', 'masculino', '12/12/1990']);
  });
});

describe('Login with Google ', () => {
  it('LoginGoogle is a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('Login Google ', () => {
    loginGoogle().then((result) => {
      expect(typeof result).toBe('object');
    });
  });
  it('should redirect to home', () => {
    loginGoogle();
    firebase.auth().signInWithPopup().then((result) => {
      expect(result).toBe('#/home');
    });
  });
});

describe('send link ', () => {
  it('send link is a function', () => {
    console.log(sendLink());
    expect(typeof sendLink).toBe('function');
  });
});

describe('sign Up With Email Password', () => {
  it('signUpWithEmailPassword should be a function', () => {
    expect(typeof signUpWithEmailPassword).toBe('function');
  });
  it('should register', () => signUpWithEmailPassword('example@gmail.com', '1234567')
    .then((user) => {
      expect(user.email).toBe('example@gmail.com');
    }));
});

describe('Login', () => {
  it('should be a functon', () => {
    expect(typeof loginWithPasswordEmail).toBe('function');
  });
  it('should be login', () => loginWithPasswordEmail('example@gmail.com', '1234567')
    .then((user) => {
      expect(user.email).toBe('example@gmail.com');
    }));
});

describe('getCurrentUser', () => {
  it('get current user', () => {
    expect(typeof getCurrentUser).toBe('function');
  });
  it('should get current User', () => {
    getCurrentUser();
    firebase.auth().onAuthStateChanged((user) => {
      expect((user)).toBe('#/home');
    });
  });
});

describe('set persistence', () => {
  it('set persistence is a function', () => {
    expect(typeof setPersistence).toBe('function');
  });
  const signInWithEmailAndPassword = jest.fn();
  it('childFunction should be called', () => {
    setPersistence();
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe('Log Out', () => {
  it('signOut is a function', () => {
    expect(typeof signOut).toBe('function');
  });
  it('Log out for the user', () => signOut().then((res) => {
    expect(res).toBe(undefined);
  }));
});
 */
/* describe('addPost', () => {
  it('add-post is a function', () => {
    expect(typeof addPost).toBe('function');
  });
  it('add post', () => {
    const text = 'Hola';
    console.log(db);
    db.autoFlush();
    return loginWithPasswordEmail('example@gmail.com', '1234567').then((res) => {
      console.log(res);
      addPost(text).then(() => {
        // eslint-disable-next-line
        db.collection('post').where('post', '==', text).get().then((querySnapshot) => {
          expect(querySnapshot.size).toBe(1);
        });
      });
    });
  });
}); */

/* describe('dataPost', () => {
  it('data-post is a function', () => {
    expect(typeof dataPost).toBe('function');
  });
  it('data post', () => {
    expect(dataPost()).toBe('true');
  });
});
 */
