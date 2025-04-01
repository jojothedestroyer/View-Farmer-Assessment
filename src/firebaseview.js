import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC0FCwhTcE4bjYBPS8nonWuNuNMSIWQEXE",
    authDomain: "farmer-assessment-form.firebaseapp.com",
    databaseURL: "https://farmer-assessment-form-default-rtdb.firebaseio.com",
    projectId: "farmer-assessment-form",
    storageBucket: "farmer-assessment-form.appspot.com",
    messagingSenderId: "892642142332",
    appId: "1:892642142332:android:b7315f56228daccaca81f9",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
