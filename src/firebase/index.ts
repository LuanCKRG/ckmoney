import { initializeApp } from 'firebase/app'
import * as firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINSENDERIG,
  appId: process.env.REACT_APP_APPID
};

export const app = initializeApp(firebaseConfig);
export const database = firestore