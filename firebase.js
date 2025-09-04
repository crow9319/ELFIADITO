// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdh3PMDoil-PGAcblNVqeJbgehXV1aM8w",
  authDomain: "elfiadito-f00b9.firebaseapp.com",
  projectId: "elfiadito-f00b9",
  storageBucket: "elfiadito-f00b9.firebasestorage.app",
  messagingSenderId: "595543495661",
  appId: "1:595543495661:web:808e79ca3ae9eaa6968de4",
  measurementId: "G-RD8QV631S5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
