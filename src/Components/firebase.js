// firebase.js
import firebase from 'firebase';

const Config = {
    apiKey: "AIzaSyAw9emxpitC0ImZ5pTtd31VJzNY24hUgQY",
    authDomain: "whatdoyouno-d23b3.firebaseapp.com",
    databaseURL: "https://whatdoyouno-d23b3.firebaseio.com",
    projectId: "whatdoyouno-d23b3",
    storageBucket: "whatdoyouno-d23b3.appspot.com",
    messagingSenderId: "557343711617",
    appId: "1:557343711617:web:338d8fa6efad00aa400880"
};
// Initialize Firebase

firebase.initializeApp(Config);

export default firebase;