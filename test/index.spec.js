// eslint-disable-next-line
/* global firebase */
// importamos la funcion que vamos a testear
// import { createUserWithEmailAndPassword } from '../src/lib/utils/firebaseIndex.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
/* const mockfirestore = new firebasemock.MockFirestore();
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use AUTHENTICATION
  () => mockauth,
  // use null if your code does not use FIRESTORE
  () => mockfirestore,
);

/* const users = {
  create: (email, password) => mocksdk.auth().signUpWithEmailPassword(email, password),
};

users.create({
  email: 'ben@example.com',
  password: 'examplePass',
});
mocksdk.auth().flush();

 mocksdk.auth().createUserWithEmailAndPassword('ben@example.com', 'examplePass').then((user) => {
 console.assert(user, 'ben was created');
});

// const register = ['tefyrabih@gmail.com', '123456'];
describe('Sign up with email password', () => {
  it('show return a function ', () => {
    expect(typeof signUpWithEmailPassword).toBe('function');
  });
  it('show return a object', () => {
    mocksdk.auth().createUserWithEmailAndPassword('ben@example.com', 'examplePass').then(() => {
      expect('ben@example.com').toBe('ben@example.com');
    });
  });
}); */
const promiseTobe = {
  _id: 0,
  _label: undefined,
  _result: {
    displayName: undefined, email: 'new12@new1.com', emailVerified: false, phoneNumber: undefined, photoURL: undefined, providerData: [], uid: 'simplelogin:1',
  },
  _state: 1,
  _subscribers: [],
};
describe('#createUserWithEmailAndPassword', () => {
  it('creates a new user', () => {
    const promise = mockauth.createUserWithEmailAndPassword('new12@new1.com', 'new1');
    mockauth.flush();
    return Promise.all([
      expect(promiseTobe).toBe(promise),
      // expect(promise.email).toBe('email', 'new1@new1.com'),
    ]);
  });
});
