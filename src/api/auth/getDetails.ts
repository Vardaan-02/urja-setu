import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { saveUser } from "./saveUser";
import { saveOrganization } from "./saveOrganization";
import { saveDeliveryPerson } from "./saveDelivery";


export const getDetails = async (role: string, id: string) => {
    try {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            console.log("User already exists, skipping creation.");
            return;
        }

        if(role == "DeliveryPerson"){
            await saveDeliveryPerson(id);
        }
        else if(role == "Organization"){
            await saveOrganization(id);
        }
        else{
            await saveUser(id)
        }
        console.log("Date Saved Successfully");
        return;
    }
    catch(error: any){
        console.log("Error at getDetails: ", error);
    }
};
