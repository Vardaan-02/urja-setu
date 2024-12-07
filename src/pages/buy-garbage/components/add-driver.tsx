import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

export default function AddDriver() {
  return (
    <motion.div
      className="bg-green-50 p-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-4 bg-white/30 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PlusCircle className="mr-2" /> Add Driver
        </h2>
        <form className="space-y-4">
          <div>
            <Label
              htmlFor="driver-code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Driver Code
            </Label>
            <Input
              type="text"
              id="driver-code"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter driver code"
            />
          </div>
          <motion.button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Driver
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
