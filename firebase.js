import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEY2cRDtdsGPFWfCzYGZdc0j-_Qa6fbuo",
  authDomain: "chatapp-1aa08.firebaseapp.com",
  projectId: "chatapp-1aa08",
  storageBucket: "chatapp-1aa08.appspot.com",
  messagingSenderId: "735940156777",
  appId: "1:735940156777:web:6a40173ec7217c034071f8",
  measurementId: "G-T799ZRZ8PQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth}

// let app;
// if(getApps().length===0){
//   app = initializeApp(firebaseConfig);

// }else{
//   app=getApp()
// }
// const db = getFirestore(app);
// const auth = getAuth(app);

// export {db,auth}