import {
  signUpWithEmailPassword,
  loginGoogle,
  signOut,
  setDataUser,
  loginWithPasswordEmail,
  getCurrentUser,
  sendLink,
  setPersistence,
} from '../src/lib/utils/firebaseIndex.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  (path) => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth,
);

global.window = {
  location: { hash: '' },
};

describe('setDataUser', () => {
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
});

describe('send link ', () => {
  it('send link is a function', () => {
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
    getCurrentUser('example@gmail.com', 'pass1234');
    firebase.auth().onAuthStateChanged((user) => {
      expect((user.emailVerified)).toBe('#/home');
    });
  });
});

describe('set persistence', () => {
  it('set persistence is a function', () => {
    expect(typeof setPersistence).toBe('function');
  });
});

describe('Log Out', () => {
  it('signOut is a function', () => {
    expect(typeof signOut).toBe('function');
  });
  it('Log out for the user', () => {
    signOut().then((res) => {
      expect(res).toBe('');
    });
  });
});
