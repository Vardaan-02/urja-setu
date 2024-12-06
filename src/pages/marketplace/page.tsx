import { Events } from "../dashboard/components/events";
import AdSlider from "./components/ad-slider";
import { motion } from "framer-motion";
import ProductShowcase from "./components/product-showcase";
import Footer from "@/components/ui/Footer";
import { CarouselItem, CustomSlider } from "@/components/ui/customSlider";

const carouselItems: CarouselItem[] = [
  {
    title: "Explore Nature",
    description: "Discover the beauty of untouched landscapes",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Urban Adventures",
    description: "Experience the excitement of city life",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Culinary Delights",
    description: "Savor the flavors of world cuisine",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Cultural Wonders",
    description: "Immerse yourself in rich traditions",
    image: "/placeholder.svg?height=600&width=800",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col pt-12">
      {/* <motion.div className={`p-4 rounded-lg shadow-md max-h-[500px] bg-red-500 flex-1`} >
        <div className="mx-auto bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg overflow-hidden">
          <CustomSlider carouselItems={carouselItems} />
        </div>
      </motion.div> */}

      <ProductShowcase />
      <Footer />
    </div>
  );
}
