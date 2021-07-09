import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDoQSLX8sFX2eCtyps3SaJvEJ-Q7gNClZo",
  authDomain: "engrtoroapp.firebaseapp.com",
  projectId: "engrtoroapp",
  storageBucket: "engrtoroapp.appspot.com",
  messagingSenderId: "815843784807",
  appId: "1:815843784807:web:a4cc153e248da332947cc2",
  measurementId: "G-KVNSJWH930"
};
// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

// avoid deprecated warnings
db.settings({
  timestampsInSnapshots: true
})

export default Firebase