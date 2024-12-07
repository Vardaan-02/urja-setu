import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { fetchCart } from "./fetchCart";

export const addToCart = async (cartId: string, prodId: string, quantity: number, dispatch: any) => {
    try {
        const cartDocRef = doc(collection(db, "cart"), cartId);

        const cartSnapshot = await getDoc(cartDocRef);

        if(!cartSnapshot.exists()){
            await setDoc(cartDocRef, {
                items: [{ id: prodId, quantity }],
            });
            console.log(`New cart created with product ${prodId} and quantity ${quantity}`);
            return;
        }

        const cartData = cartSnapshot.data();

        if(!cartData || !Array.isArray(cartData.items)){
            console.log("Invalid cart data.");
            return;
        }

        const existingItemIndex = cartData.items.findIndex((item: { id: string }) => item.id === prodId);

        if(existingItemIndex >= 0){
            const updatedItems = [...cartData.items];
            updatedItems[existingItemIndex].quantity += quantity;

            await updateDoc(cartDocRef, { items: updatedItems });
            console.log(`Updated product ${prodId} with new quantity ${updatedItems[existingItemIndex].quantity}`);
        }
        else{
            await updateDoc(cartDocRef, {
                items: arrayUnion({ id: prodId, quantity }),
            });
            console.log(`Added product ${prodId} with quantity ${quantity} to the cart`);
        }
        fetchCart(cartId, dispatch);
    }
    catch(error){
        console.log("Error At Add To Cart");
        return;
    }
}