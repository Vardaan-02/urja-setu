import { doc, updateDoc } from "firebase/firestore";
import { Order } from "@/types/order";
import { db } from "../../utils/firebase";

export const assignOrder = async (
  orderId: string,
  companyDetails: Order['order']['company'],
  deliveryPersonDetails: Order['order']['deliveryPerson'],
  pickupTime: Order['order']['pickupTime']
): Promise<void> => {
  try {
    const orderDocRef = doc(db, "orders", orderId);

    await updateDoc(orderDocRef, {
      "order.company": companyDetails,
      "order.deliveryPerson": deliveryPersonDetails,
      "order.pickupTime": pickupTime,
    });

    console.log("Order assigned successfully:", orderId);
  }
  catch(error){
    console.error("Error assigning order:", error);
    throw new Error("Failed to assign order");
  }
};
