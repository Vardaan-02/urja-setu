import Rating from "@/components/ui/rating";
import { motion } from "framer-motion";
interface DeliveryPersonDetailsProps {
  person: {
    name: string;
    image: string;
    phone: string;
    rating: number;
  };
}
export default function DeliveryPersonDetails({
  person,
}: DeliveryPersonDetailsProps) {
  console.log(person.image);

  return (
    <div className="flex items-center gap-4">
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <img src={person.image} className="rounded-full h-12 w-12" alt="" />
      </motion.div>
      <div>
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <motion.p className="text-sm text-gray-600">{person.phone}</motion.p>
        <Rating rating={person.rating} />
      </div>
    </div>
  );
}
