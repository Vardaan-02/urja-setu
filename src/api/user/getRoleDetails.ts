import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { updateDetails } from "@/redux/authSlice";


export const getRoleDetails = async (id: string, dispatch: any) => {
    try {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        const userData : DocumentData | undefined = userDoc.data();
        // console.log("Hello, I'm under the water!!")
        if(userDoc.exists() && userData){
            // console.log("Hello, I'm above the water!")
            const role = userData.role;
            let updates = {};
            if(role == "DelieveryPerson"){
                updates = {
                    organizationId: userData.organisationId,
                    rating: userData.rating,
                    assigned_work: userData.assigned_work,
                    address: userData.address,
                }
            }
            else if(role == "Organization"){
                updates = {
                    events: userData.events,
                    followers: userData.followers,
                    address: userData.address,
                }
            }
            else{
                updates = {
                    eventDates: userData.eventDates,
                    following: userData.following,
                    orders: userData.orders,
                    address: userData.address,
                    wallet: userData.wallet,
                }
            }
            // console.log(userData);
            // console.log("Updates being dispatched:", updates);
            dispatch(updateDetails({updates}));
            // console.log("Updates  dispatched:", updates);
            return;
        }
    }
    catch(error : any){
        console.log("Error At getRoleDetails ", error);
        return;
    }
}