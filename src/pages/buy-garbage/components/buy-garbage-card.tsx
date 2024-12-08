import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Order } from "@/types/order";
import AssignDriver from "./assign-driver";

export function BuyGarbageCard({ order }: Order) {
  const [isHovered, setIsHovered] = useState(false);

  if (!order.seller) return null;
  if (!order.item) return null;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="overflow-hidden border-none bg-white/80 p-2 shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div transition={{ duration: 0.3 }}>
          <CardContent className="flex gap-4 px-0 py-0 justify-between h-full">
            <div className="flex sm:items-start gap-4 justify-center items-center h-full">
              <div className="p-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="justify-center items-center h-full"
                >
                  <Avatar className="w-20 h-20 flex justify-center items-center">
                    <AvatarImage src={"profile.jpg"} alt={order.seller.name} />
                    <AvatarFallback>{order.seller.name}</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>

              <div className="text-center sm:text-left flex flex-col justify-center mt-3">
                <h2 className="text-2xl font-bold">{order.seller.name}</h2>
                <motion.p
                  className="text-sm text-gray-800 mt-1"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  {order.seller.phone}
                </motion.p>
                <ScrollArea className="h-16 w-full max-w-[200px] mt-2">
                  <p className="text-sm text-gray-800">
                    {order.seller.address}
                  </p>
                </ScrollArea>
              </div>
            </div>
            <div className="flex flex-col sm:items-end mt-3">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative min-w-24 h-24 rounded-md overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    className="w-full h-full"
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1aZ47or6YGVPmIIp_MhagLngi7WWAB4rl_IyonRM6Hhb3WFMs0-ukeJGWSJsFSBCA6o8&usqp=CAU"
                    }
                    alt={order.item.name}
                  />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold">{order.item.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {order.item.category}
                  </Badge>
                  <p className="text-sm text-gray-800 mt-2">
                    Weight: {order.item.weight}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[140px] flex items-center mr-8">
              <AssignDriver />
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
