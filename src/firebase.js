import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCc0YaUHWKKfYMqUjq7fmu5clF3VMJ1584",
  authDomain: "monitoring-db-a0727.firebaseapp.com",
  databaseURL: "https://monitoring-db-a0727-default-rtdb.firebaseio.com",
  projectId: "monitoring-db-a0727",
  storageBucket: "monitoring-db-a0727.appspot.com",
  messagingSenderId: "30735928273",
  appId: "1:30735928273:web:680b92e2aa9222e390eef0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
