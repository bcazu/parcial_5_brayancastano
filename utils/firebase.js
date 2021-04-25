import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyA_hVavJWgu10ID9WaaACTl62QP_AsyPtw",
    authDomain: "parcial5brayancastano.firebaseapp.com",
    projectId: "parcial5brayancastano",
    storageBucket: "parcial5brayancastano.appspot.com",
    messagingSenderId: "700628854274",
    appId: "1:700628854274:web:11c27db1e9d90984b7e91b"
  }

  
export const firebaseApp =  firebase.initializeApp(firebaseConfig)

