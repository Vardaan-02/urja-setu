import { collection, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { fetchCart } from "./fetchCart";

export const removeFromCart = async (cartId: string, productId: string, quantity: number, dispatch: any) => {
    try {
        const cartDocRef = doc(collection(db, "cart"), cartId);

        const cartSnapshot = await getDoc(cartDocRef);

        if (!cartSnapshot.exists()) {
            console.log(`Cart with ID ${cartId} does not exist.`);
            return;
        }

        const cartData = cartSnapshot.data();

        if (!cartData || !Array.isArray(cartData.items)) {
            console.log("Invalid cart data.");
            return;
        }

        const existingItemIndex = cartData.items.findIndex((item: { id: string }) => item.id === productId);

        if (existingItemIndex < 0) {
            console.log(`Product with ID ${productId} not found in cart.`);
            return;
        }

        const existingQuantity = cartData.items[existingItemIndex].quantity;

        if(existingQuantity <= quantity){
            await updateDoc(cartDocRef, {
                items: arrayRemove(cartData.items[existingItemIndex]),
            });
            console.log(`Removed product ${productId} from the cart.`);
        }
        else{
            const updatedItems = [...cartData.items];
            updatedItems[existingItemIndex].quantity -= quantity;

            await updateDoc(cartDocRef, { items: updatedItems });
            console.log(`Decreased quantity of product ${productId} by ${quantity}. New quantity: ${updatedItems[existingItemIndex].quantity}`);
        }
        fetchCart(cartId, dispatch);
    }
    catch(error){
        console.log("Error At Remove From Cart:", error);
        return;
    }
};
