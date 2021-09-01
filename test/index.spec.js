// eslint-disable-next-line
/* global firebase */
// importamos la funcion que vamos a testear
import { signUpWithEmailPassword, loginGoogle, signOut } from '../src/lib/utils/firebaseIndex.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  (path) => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth,
);

describe('Login with Google ', () => {
  it('LoginGoogle is a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('Login with google', () => {
    loginGoogle('ben@example.com');
    firebase.auth().signInWithPopup('ben@example.com').then((result) => {
      expect(result.user.email).toBe('ben@example.com');
    });
  });
});

describe('Sign Up with email and password ', () => {
  it('signUpWithEmailPassword is a function', () => {
    expect(typeof signUpWithEmailPassword).toBe('function');
  });
  it('creates a new user', () => {
    const promise = signUpWithEmailPassword('new1@new1.com', 'new1');
    return Promise.all([
      // eslint-disable-next-line
      expect(promise['_result']).toHaveProperty('uid', 'simplelogin:1'),
      // eslint-disable-next-line
      expect(promise['_result']).toHaveProperty('email', 'new1@new1.com'),
    ]);
  });
  it('Sign up with email and password', () => {
    signUpWithEmailPassword('ben@example.com', 'example123');
    firebase.auth().createUserWithEmailAndPassword('ben@example.com', 'example123').then((res) => {
      // eslint-disable-next-line
      expect(res.email).toBe('ben@example.com');
    });
  });
  it('Error in sign up with email and password', () => {
    signUpWithEmailPassword(' ', 'example123');
    firebase.auth().createUserWithEmailAndPassword(' ', 'example123').catch((res) => {
      // eslint-disable-next-line
      expect(res['_result']).toHaveProperty('email', undefined);
    });
  });
});

describe('Log Out', () => {
  it('signOut is a function', () => {
    expect(typeof signOut).toBe('function');
  });
  it('Log out for the user', () => {
    signOut();
    firebase.auth().signOut().then((res) => {
      // eslint-disable-next-line
      expect(res['_result']).toHaveProperty('email', undefined);
    }).catch((error) => {
      // eslint-disable-next-line
      expect(error['_result']).toHaveProperty('email', undefined);
    });
  });
});
