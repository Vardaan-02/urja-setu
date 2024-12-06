import { saveUser } from "./saveUser";
import { saveOrganization } from "./saveOrganization";
import { saveDeliveryPerson } from "./saveDelivery";
import { updateRole } from "@/redux/authSlice";
import { getRoleDetails } from "../user/getRoleDetails";


export const getDetails = async (role: string, id: string, dispatch: any) => {
    try {
        if(role == "DeliveryPerson"){
            dispatch(updateRole("DeliveryPerson"));
            await saveDeliveryPerson(id);
        }
        else if(role == "Organization"){
            dispatch(updateRole("Organization"));
            await saveOrganization(id);
        }
        else{
            dispatch(updateRole("User"));
            await saveUser(id);
        }
        await getRoleDetails(id, dispatch);
        console.log("Date Saved Successfully");
        return;
    }
    catch(error: any){
        console.log("Error at getDetails: ", error);
    }
};
