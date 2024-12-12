import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const checkout = async (userId: string, price: number) => {
    try {
        const userDocRef = doc(db, "users", userId);

        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error("User not found");
        }

        const userData = userDoc.data();
        const currentBalance = userData.wallet ?? 0;

        if (currentBalance < price) {
            throw new Error("Insufficient balance");
        }

        const updatedBalance = currentBalance - price;

        await updateDoc(userDocRef, { wallet: updatedBalance });

        // console.log(`Successfully deducted ₹${price}. New balance: ₹${updatedBalance}`);
        const cartsCollection = collection(db, "cart");
        const cartQuery = query(cartsCollection, where("userId", "==", userId));
        const cartDocs = await getDocs(cartQuery);
        if (!cartDocs.empty) {
            const deletePromises = cartDocs.docs.map((cartDoc) => deleteDoc(cartDoc.ref));
            await Promise.all(deletePromises);
            console.log(`Cart for user ${userId} has been removed.`);
        }
        else{
            console.log(`No cart found for user ${userId}.`);
        }
    }
    catch(error){
        console.error("Error deducting price:", error);
    }
};
