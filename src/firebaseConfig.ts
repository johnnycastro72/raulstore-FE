import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDjCmDtz2Ww-30yn7jY8D_oIoy07X3Ht14",
    authDomain: "raul-s-hardware-store.firebaseapp.com",
    projectId: "raul-s-hardware-store",
    storageBucket: "raul-s-hardware-store.appspot.com",
    messagingSenderId: "342002221072",
    appId: "1:342002221072:web:e98aa5e72cdda7230b0a95"
  };


export const app = initializeApp(firebaseConfig);

export const auth = getAuth()