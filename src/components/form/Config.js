// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBy8TpVJqWEcotpAZRMVAcGkqkW8wt5ESY',
  authDomain: 'mydoc-e1874.firebaseapp.com',
  projectId: 'mydoc-e1874',
  storageBucket: 'mydoc-e1874.appspot.com',
  messagingSenderId: '189847698621',
  appId: '1:189847698621:web:b21dab661e16327fa84bd4',
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
