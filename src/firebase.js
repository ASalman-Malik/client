import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXzDUMjJSYTlAqbLE_7aKbZBguVtNezdc",
  authDomain: "e-commerce-31341.firebaseapp.com",
  databaseURL: "https://ecommerce-31341.firebaseio.com",
  projectId: "e-commerce-31341",
  storageBucket: "e-commerce-31341.appspot.com",
  messagingSenderId: "256746504299",
  appId: "1:256746504299:web:2f122264dcc4dcd349712e",
  measurementId: "G-SQQRJ1M374",
};
// const firebaseConfig = {
//     apiKey: "AIzaSyBb3cLw2JHKsM4AFjebkZwQjAfAuLo11EI",
//     authDomain: "ecommerce-938e7.firebaseapp.com",
//     projectId: "ecommerce-938e7",
//     storageBucket: "ecommerce-938e7.appspot.com",
//     messagingSenderId: "709386216628",
//     appId: "1:709386216628:web:8b12b459c8554b5e8823e1"
//   };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
