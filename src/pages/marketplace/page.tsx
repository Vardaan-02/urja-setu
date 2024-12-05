import AdSlider from "./components/ad-slider"
import ProductShowcase from "./components/product-showcase"
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <AdSlider />
      <ProductShowcase />
      <Footer />
    </div>
  )
}

