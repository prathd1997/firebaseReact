import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getDatabase} from 'firebase/database'

function startFirebase(){

  const firebaseConfig = {
      apiKey: "AIzaSyCGsTynh2RyLSjDvjyMqh38-bewIeLWZbo",
      authDomain: "zerostics.firebaseapp.com",
      databaseURL: "https://zerostics-default-rtdb.firebaseio.com",
      projectId: "zerostics",
      storageBucket: "zerostics.appspot.com",
      messagingSenderId: "367226304593",
      appId: "1:367226304593:web:45cca7e902e315e89ba070",
      measurementId: "G-3YHNW39G7V"
    };
    
  
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    return getDatabase(firebaseApp);
}
  export default startFirebase