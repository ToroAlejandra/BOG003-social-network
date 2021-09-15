// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAmLYWlzMt0bWxLhX6WT7XPmgOB1hqgLtk',
  authDomain: 'social-network-visibles.firebaseapp.com',
  projectId: 'social-network-visibles',
  storageBucket: 'social-network-visibles.appspot.com',
  messagingSenderId: '523691410362',
  appId: '1:523691410362:web:dbc4a8fbc40bd5f30e5383',
  measurementId: 'G-CHDRGNNX09',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line
const db = firebase.firestore( app );
