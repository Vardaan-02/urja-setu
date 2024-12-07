import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const fetchProducts = async () => {
    try {
        const productsCollectionRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollectionRef);
        const products: DocumentData[] = productsSnapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(), 
        }));
        console.log(products);
        return products;
    }
    catch(error){
        console.log("Error At fetchProducts");
        return;    
    }
}