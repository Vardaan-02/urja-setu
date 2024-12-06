import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const saveUser = async (id: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    console.log(userRef, userDoc);
    console.log("hello");
    

    let defaultData: any = {
      address: "NA",
      wallet: 100,
      eventDates: [],
      cart: [],
      following: [],
      orders: [],
      role: "User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(userRef, defaultData);
    console.log("Successfully Updated Default Data");
    return;
    
  }
  catch(error : any){
    console.error("Error saving user:", error.message);
  }
};
