import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Review } from "@/types/product";
import { setReviews } from "@/redux/productSlice";


export const fetchReviews = async (productId: string, dispatch: any): Promise<void> => {
    try {
        const productDocRef = doc(db, "products", productId);

        const productSnapshot = await getDoc(productDocRef);

        if (!productSnapshot.exists()) {
            console.log(`Product with ID ${productId} does not exist.`);
            return;
        }

        const productData = productSnapshot.data();

        if (!productData || !Array.isArray(productData.reviews)) {
            console.log(`No reviews found for product with ID ${productId}.`);
            return;
        }

        const reviews : Review[] = productData.reviews;

        dispatch(setReviews({productId, reviews}));
        return;
    }
    catch(error){
        console.error("Error fetching reviews:", error);
        return;
    }
};
