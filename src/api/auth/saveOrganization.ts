import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const saveOrganization = async (id: string): Promise<void> => {
  try {
    const orgRef = doc(db, "organizations", id);
    const orgDoc = await getDoc(orgRef);

    let defaultData: any = {
      address: "NA",
      events: [],
      followers: [],
      role: "Organzation",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    updateDoc(orgRef, defaultData);
    console.log("Successfully Updated Default Data");
    return;
  }
  catch(error : any){
    console.error("Error saving organization:", error.message);
  }
};
