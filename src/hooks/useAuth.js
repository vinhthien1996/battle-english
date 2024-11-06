// hooks/useAuth.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../constants";
import { getDatabase, ref } from "firebase/database";

const app = initializeApp(firebaseConfig); // Initialize once and export




const useAuth = () => {
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const db = getDatabase(app);
    
    const refDB = ref(db, 'users/user_0001');

    return { auth, firestore, refDB };
};

export { app }; // Export the initialized app
export default useAuth;
