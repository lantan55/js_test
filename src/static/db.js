import firebase from 'firebase/app'
import db from  'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyClijw7B8kNEac9HIPMemtS8HXh-pv1c4c",
    authDomain: "test-js-c93b9.firebaseapp.com",
    databaseURL: "https://test-js-c93b9.firebaseio.com",
    projectId: "test-js-c93b9",
    storageBucket: "test-js-c93b9.appspot.com",
    messagingSenderId: "336722791340",
    appId: "1:336722791340:web:973d82c8c13ca91d9bc809"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default db