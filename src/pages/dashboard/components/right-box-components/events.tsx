import { CarouselItem, CustomSlider } from "@/components/ui/customSlider";
import { Divide } from "lucide-react";

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

export function Events() {
  return (
  <>
  <div className="relative mx-auto bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg overflow-hidden">
    <CustomSlider carouselItems={carouselItems}/>
  </div>
  </>
  );
}
