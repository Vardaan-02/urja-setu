import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Product } from "@/types/product";
import { setProducts } from "@/redux/productSlice";

export const fetchProducts = async (userId: string, dispatch: any) => {
    try {
        const productsCollectionRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollectionRef);
        const products = await Promise.all(
            productsSnapshot.docs.map(async (item) => {
                const productDocRef = doc(collection(db, "products"), item.id);
                const productSnapshot = await getDoc(productDocRef);

                if (!productSnapshot.exists()) {
                    console.log(`Product with ID ${item.id} does not exist.`);
                    return null;
                }

                const productData = productSnapshot.data();
                const organizationDocRef = doc(
                    collection(db, "users"),
                    productData.seller
                );
                const organizationSnapshot = await getDoc(organizationDocRef);

                const organizationName = organizationSnapshot.exists()
                    ? organizationSnapshot.data().name
                    : "Urja Setu";

                return {
                    id: item.id,
                    ...productData,
                    seller: organizationName, 
                } as Product;
            })
        );
        const validProducts = products.filter((item): item is Product => item !== null);
        let prods: Product[] = [];
        
        validProducts.forEach((i) => {
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
            item.liked = Array.isArray(i.liked) && i.liked.includes(userId) ? true : false;
            prods.push(item);
        });        
        dispatch(setProducts(prods))
        
    }
    catch(error){
        console.log("Error At fetchProducts ", error);
        return;    
    }
}