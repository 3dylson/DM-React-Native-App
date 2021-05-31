import firebase from 'firebase/app'
import '@firebase/auth';
import '@firebase/firestore'


// Initialize Firebase
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };