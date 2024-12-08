import { collection, addDoc } from "firebase/firestore";
import { Order } from "@/types/order";
import { db } from "../../utils/firebase";

export const addOrder = async (sellerDetails: Order['order']['seller'], itemDetails: Order['order']['item']): Promise<void> => {
  try {
    const newOrder: Order = {
      order: {
        seller: {
          id: sellerDetails?.id ?? "",
          name: sellerDetails?.name ?? "",
          image: sellerDetails?.image ?? "",
          phone: sellerDetails?.phone ?? "",
          address: sellerDetails?.address ?? "",
        },
        item: {
          id: itemDetails?.id ?? "",
          name: itemDetails?.name ?? "",
          price: itemDetails?.price ?? 0,
          weight: itemDetails?.weight ?? 0,
          image: itemDetails?.image ?? "",
          category: itemDetails?.category ?? "Uncategorized",
        },
        company: {
          id: "",
          name: "",
          image: "",
          phone: "",
          address: "",
        },
        deliveryPerson: {
          id: "",
          name: "",
          photo: "",
          contact: "",
          rating: 0,
        },
        pickupTime: {
          start: "",
          end: "",
        },
      },
    };

    const ordersCollection = collection(db, "orders");
    await addDoc(ordersCollection, newOrder);
    console.log("Order added successfully:", newOrder);
  } 
  catch(error){
    console.error("Error adding order:", error);
    throw new Error("Failed to add order");
  }
};
