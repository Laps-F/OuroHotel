/* eslint-disable no-unused-vars */

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBOSSUxqm3Hqh-aXSmUTOLwDS_2Rimx1Zc",
    authDomain: "ourohotel-df08d.firebaseapp.com",
    projectId: "ourohotel-df08d",
    storageBucket: "ourohotel-df08d.appspot.com",
    messagingSenderId: "882292019392",
    appId: "1:882292019392:web:099e13532f50bb77479d25"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);
