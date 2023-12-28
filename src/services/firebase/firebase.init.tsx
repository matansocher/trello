// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDXUwuiUwJE_Ydmba4uwedybseGYcyv_MQ',
  authDomain: 'trello-339cc.firebaseapp.com',
  projectId: 'trello-339cc',
  storageBucket: 'trello-339cc.appspot.com',
  messagingSenderId: '542235747922',
  appId: '1:542235747922:web:7db20ec852f82c919f218b',
  measurementId: 'G-5RB56VT695'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
