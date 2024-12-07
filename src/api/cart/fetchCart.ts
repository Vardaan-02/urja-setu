import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Product } from "@/types/product";
import { setCart } from "@/redux/cartSlice";

export const fetchCart = async (id: string, dispatch: any) => {
    try {
        const cartDocRef = doc(collection(db, "cart"), id);

        // Fetch the cart document
        const cartSnapshot = await getDoc(cartDocRef);

        if (!cartSnapshot.exists()) {
            console.log(`Cart with ID ${id} does not exist.`);
            return null;
        }

        // Get the cart data
        const cartData = cartSnapshot.data();

        if (!cartData || !Array.isArray(cartData.items)) {
            console.log("Cart does not contain valid items.");
            return null;
        }

        // Populate items with product data
        const populatedItems = await Promise.all(
            cartData.items.map(async (item: { id: string; quantity: number }) => {
                const productDocRef = doc(collection(db, "products"), item.id);
                const productSnapshot = await getDoc(productDocRef);

                if (!productSnapshot.exists()) {
                    console.log(`Product with ID ${item.id} does not exist.`);
                    return null;
                }

                const productData = productSnapshot.data();
                return {
                    ...productData,
                    id: item.id,
                    quantity: item.quantity,
                } as Product & { quantity: number };
            })
        );

        cartData.items = populatedItems.filter((item) => item !== null);

        dispatch(setCart(cartData.items));
        return;
    }
    catch(error){
        console.log("Error At fetchCart ", error);
        return;
            
    }
}