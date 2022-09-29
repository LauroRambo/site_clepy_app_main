import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrzJ62M51ni0FWhG631jfLh4e1Ou-c2ag",
    authDomain: "clepyapp.firebaseapp.com",
    projectId: "clepyapp",
    storageBucket: "clepyapp.appspot.com",
    messagingSenderId: "913048897728",
    appId: "1:913048897728:web:60a2d93276ad81e6230525",
    measurementId: "G-F8T0LVCJKN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();