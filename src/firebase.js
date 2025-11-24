import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAhUHD0OAbz0GIA5Z4cLAiOmBJCywR2yVk",
  authDomain: "netflix-clone-yashas.firebaseapp.com",
  projectId: "netflix-clone-yashas",
  storageBucket: "netflix-clone-yashas.firebasestorage.app",
  messagingSenderId: "289516455472",
  appId: "1:289516455472:web:a0c5f3cc10cae91a1ccff5",
  measurementId: "G-N9SMDF6308"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }   catch (error){
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));    
    }
}

const logout = ()=>{
    signOut(auth);
}

export { auth, db, signup, login, logout };