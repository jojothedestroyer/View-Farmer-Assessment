import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBGJfq266hixikyRL2OoWNdse8_6puqA48",
    authDomain: "farmer-assessment-view.firebaseapp.com",
    databaseURL: "https://farmer-assessment-view-default-rtdb.firebaseio.com",
    projectId: "farmer-assessment-view",
    storageBucket: "farmer-assessment-view.firebasestorage.app",
    messagingSenderId: "187215425453",
    appId: "1:187215425453:web:cef88122020c170473bb24"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
