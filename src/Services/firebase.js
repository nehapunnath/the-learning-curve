// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9OtD1kB_87d-MbepGcKtldbT6Qw9lNDI",
  authDomain: "learning-curve-4dd64.firebaseapp.com",
  projectId: "learning-curve-4dd64",
  storageBucket: "learning-curve-4dd64.firebasestorage.app",
  messagingSenderId: "26135007002",
  appId: "1:26135007002:web:fe3d3691dc02916a9066a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

export default app;