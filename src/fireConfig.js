
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVeVqjMj2l8YC3SHXRAQagkYDVye-xVG0",
  authDomain: "firecommerce-8f181.firebaseapp.com",
  projectId: "firecommerce-8f181",
  storageBucket: "firecommerce-8f181.appspot.com",
  messagingSenderId: "611076878128",
  appId: "1:611076878128:web:9f881c8bce0857b437a2f5",
  measurementId: "G-6X4ZM4PTN3"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBs91qza6kswofij9AaH3VCQMUAJibks80",
//   authDomain: "firestoredatabase-44d9f.firebaseapp.com",
//   projectId: "firestoredatabase-44d9f",
//   storageBucket: "firestoredatabase-44d9f.appspot.com",
//   messagingSenderId: "125550511633",
//   appId: "1:125550511633:web:bbe2547a5a9d666d9553b0",
//   measurementId: "G-ETVVSER7Y1"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;