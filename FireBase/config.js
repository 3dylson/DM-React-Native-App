import firebase from 'firebase/app'
import '@firebase/auth';
import '@firebase/firestore'


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDL2Cqu5mVT2srMSL-MBGGROgJYOHYaAaY",
    authDomain: "trabdm-b8659.firebaseapp.com",
    projectId: "trabdm-b8659",
    storageBucket: "trabdm-b8659.appspot.com",
    messagingSenderId: "241670815634",
    appId: "1:241670815634:web:661ab98581fbb1f04f8b4b",
    measurementId: "G-QBK26YP269"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

  