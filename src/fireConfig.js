
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;