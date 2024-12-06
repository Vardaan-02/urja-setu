import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { db } from "../../utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const saveDummyUser = async (user: { uid: string; name: string | null; email: string | null; photoURL: string | null }) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if(!userDoc.exists()){
      const newUser = {
        name: user.name || "New User",
        email: user.email || "example@example.com",
        photoURL: user.photoURL || null,
      };

      await setDoc(userRef, newUser);
      console.log("User saved successfully:", user.uid);
    }
    else{
      console.log("User already exists:", user.uid);
    }
  }
  catch(error: any){
    console.error("Error saving user:", error.message);
  }
};

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("User Info:", {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });

    await saveDummyUser({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });

  } catch (error: any) {
    console.error("Error during Google sign-in:", error.message);
  }
};

export default handleGoogleSignIn;
