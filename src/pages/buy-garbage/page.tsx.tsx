import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import NavBar from "@/components/nav-bar";
import AddProduct from "./components/add-product";
import AddDriver from "./components/add-driver";
import { BuyGarbageCard } from "./components/buy-garbage-card";
import { fetchPendingOrders, sellWithId } from "@/api/orders/fetchPendingOrders";
import { useEffect, useState } from "react";



export default function BuyGarbage() {
  
  const [orderData, setOrderData] = useState<sellWithId[]>([{
    chatId: "",
    order: {
      seller: {
        id: "",
        name: "",
        image: "",
        phone: "",
        address: "",
      },
      company: {
        id: "",
        name: "",
        image: "",
        phone: "",
        address: "",
      },
      itemName: "",
      status: "",
      image: "",
      weight: "",
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
  }]);
  const pendingOrders = async () => {
    const orders = await fetchPendingOrders();
    return orders;
  }
  useEffect(() => {
    const fetchData = async () => {
      const orders = await pendingOrders();
      setOrderData(orders);
      console.log(orders);
    };
    fetchData();
  }, [])
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
      <NavBar />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <motion.div
            className="lg:col-span-3 bg-green-50 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Trash2 className="mr-2"/> Buy garbage
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {orderData.map((value) => (
                <BuyGarbageCard key={value.id} order={value} />
              ))}
            </div>
          </motion.div>

          <div className="space-y-6 grid-col-1">
            <AddProduct />
            <AddDriver />
          </div>
        </div>
      </div>
    </div>
  );
}
