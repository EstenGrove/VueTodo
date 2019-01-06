 import firebase from 'firebase';
 import firestore from 'firebase/firestore';
 // Initialize Firebase
 const config = {
   apiKey: "AIzaSyD9QprFr0QO7V1kJ2v6EyN3Mv_RkCXOlcE",
   authDomain: "vuetodo-b7a86.firebaseapp.com",
   databaseURL: "https://vuetodo-b7a86.firebaseio.com",
   projectId: "vuetodo-b7a86",
   storageBucket: "vuetodo-b7a86.appspot.com",
   messagingSenderId: "279636456"
 };
 const firebaseApp = firebase.initializeApp(config);

 export default firebaseApp.firestore();
 firebase.firestore().settings({
   timestampsInSnapshots: true
 });
