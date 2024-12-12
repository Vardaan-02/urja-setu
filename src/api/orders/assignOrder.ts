import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { Order } from "@/types/order";
import { db } from "../../utils/firebase";
import { log } from "node:console";

const calculatePrice = (category: string, weight: number) => {
  let coins = 0;
  let rupees = 0;

  switch (category) {
    case "Plastic":
      coins = Math.floor(10 * weight);
      rupees = 10 * weight;
      break;
    case "E-Waste":
      coins = Math.floor(30 * weight);
      rupees = 20 * weight;
      break;
    case "Paper":
      coins = Math.floor(20 * weight);
      rupees = 7 * weight;
      break;
    case "Metal":
      coins = Math.floor(40 * weight);
      rupees = 50 * weight;
      break;
    default:
      coins = 0;
      rupees = 0;
      break;
  }

  return coins;
};

export const assignOrder = async (
  orderId: string,
  companyDetails: Order['order']['company'],
  deliveryPersonDetails: Order['order']['deliveryPerson'],
  pickupTime: Order['order']['pickupTime'],
  sellerId: string
): Promise<void> => {
  try {
    if(deliveryPersonDetails?.id == undefined){
      return;
    }
    const orderDocRef = doc(db, "orders", orderId);
    const deliveryPersonDocRef = doc(db, "users", deliveryPersonDetails.id);
    const sellerDocRef = doc(db, "users", sellerId);

    const orderSnapshot = await getDoc(orderDocRef);
    
    if (!orderSnapshot.exists()) {
      console.error(`Order with ID ${orderId} does not exist.`);
      return;
    }
    
    const orderData = orderSnapshot.data();
    const categories = orderData?.order?.category || [];
    const weight = orderData?.order?.weight; 
    await updateDoc(orderDocRef, {
      "order.company": companyDetails,
      "order.deliveryPerson": deliveryPersonDetails,
      "order.pickupTime": pickupTime,
      "order.status": "assigned"
    });
    // console.log(categories);
    
    const totalCoins = categories.reduce((sum, category, index) => {
      return sum + calculatePrice(category, weight);
    }, 0);
    // console.log(totalCoins);
    

    await updateDoc(deliveryPersonDocRef, {
      assignedWork: arrayUnion(orderId),
    });

    const sellerSnapshot = await getDoc(sellerDocRef);

    if (sellerSnapshot.exists()) {
      const sellerData = sellerSnapshot.data();
      const currentWallet = sellerData.wallet || 0;
      await updateDoc(sellerDocRef, {
        wallet: currentWallet + totalCoins,
      });
    }
    console.log("Order assigned successfully:", orderId);
  }
  catch(error){
    console.error("Error assigning order:", error);
    throw new Error("Failed to assign order");
  }
};
