import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface DeliveryPersonDetailsProps {
  person: {
    name: string;
    photo: string;
    contact: string;
    rating: number;
  };
}

export default function DeliveryPersonDetails({
  person,
}: DeliveryPersonDetailsProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <Avatar>
          <AvatarImage src={person.photo} className="rounded-full h-12 w-12"/>
          <AvatarFallback>{person.name}</AvatarFallback>
        </Avatar>
      </motion.div>
      <div>
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <motion.p className="text-sm text-gray-600">{person.contact}</motion.p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: star * 0.1 }}
            >
              <Star
                className={`w-3 h-3 ${
                  star <= person.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
