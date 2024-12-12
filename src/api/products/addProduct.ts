import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import {  Review } from "@/types/product";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface formProd{
    title: string;
    price: number;
    condition: string;
    liked?: string[];
    rating: number;
    images: File[];
    category: string;
    description?: string;
    features?: string[];
    reviews?: Review[];
    discount?: number;
}

export const addProduct = async (product: formProd, sellerId: string) => {
    try {  
        const uploadPromises = product.images.map(async (image, index) => {
            const storageRef = ref(storage, `products/${product.title}-${Date.now()}-${index}`);
            const snapshot = await uploadBytes(storageRef, image);
            return await getDownloadURL(snapshot.ref);
        });

        const imageUrls = await Promise.all(uploadPromises);
        const productsCollection = collection(db, "products");
        const newProductRef = doc(productsCollection);
        await setDoc(newProductRef, {
            ...product,
            images: imageUrls,
            seller: sellerId,
            liked: product.liked ?? [], 
            reviews: product.reviews ?? [], 
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    catch(error){
        console.log("Error at adding product:", error);
    }
};
