import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // apiKey: 'AIzaSyCo1k2xmCMAEnLqA5jLwZBO_4fm8Wd2lio',
  // authDomain: 'react-app-cursos-f732b.firebaseapp.com',
  // projectId: 'react-app-cursos-f732b',
  // storageBucket: 'react-app-cursos-f732b.appspot.com',
  // messagingSenderId: '1026601921712',
  // appId: '1:1026601921712:web:443ece3ad0d7e1cb98df75',
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
