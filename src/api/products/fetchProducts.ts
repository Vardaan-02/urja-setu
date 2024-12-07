import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Product } from "@/types/product";
import { setProducts } from "@/redux/productSlice";

export const fetchProducts = async (userId: string, dispatch: any) => {
    try {
        const productsCollectionRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollectionRef);
        const products: DocumentData[] = productsSnapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
        }));

        let prods: Product[] = [];
        
        products.forEach((i) => {
            const item = {
                category: i.category,
                condition: i.condition,
                description: i.description,
                discount: i.discount,
                features: i.features,
                id: i.id,
                images: i.images,
                price: i.price,
                rating: i.rating,
                reviews: i.reviews,
                seller: i.seller,
                title: i.title,
                liked: false
            }
            item.liked = i.liked.includes(userId) ? true : false;
            prods.push(item);
        });
        dispatch(setProducts(prods))
        
    }
    catch(error){
        console.log("Error At fetchProducts ", error);
        return;    
    }
}