import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import NavBar from "@/components/nav-bar";
import AddProduct from "./components/add-product";
import AddDriver from "./components/add-driver";
import { BuyGarbageCard } from "./components/buy-garbage-card";

const orderData = {
  seller: {
    name: "John Doe",
    image: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, AN 12345, Country",
  },
  item: {
    name: "Vintage Camera",
    category: "Electronics",
    weight: 1.2,
    image: "/placeholder.svg?height=96&width=96",
  },
}

export default function BuyGarbage() {
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
              {[1, 2, 3, 4].map((value) => (
                <BuyGarbageCard key={value} order={orderData} />
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
