import ProductShowcase from "./components/product-showcase";
import Footer from "@/components/ui/Footer";
export default function Home() {
  return (
    <div className="flex flex-col pt-12">
      <ProductShowcase />
      <Footer />
    </div>
  );
}
