// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCuGo09HZN_eWrJmJDLVE6k8lsDFgRUV2A',
  authDomain: 'project-example-77958.firebaseapp.com',
  databaseURL: 'https://project-example-77958.firebaseio.com',
  projectId: 'project-example-77958',
  storageBucket: 'project-example-77958.appspot.com',
  messagingSenderId: '121924781120',
  appId: '1:121924781120:web:da9c4872b61bbb708f0ba5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
