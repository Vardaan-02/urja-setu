import NavBar from '@/components/nav-bar'
import ProductPage from './components/product-page'
import { Product } from '@/types/product'

export const sampleProduct: Product = {
  id: 1,
  title: "Premium Wireless Noise-Cancelling Headphones",
  price: 299.99,
  condition: "New",
  seller: "AudioTech Inc.",
  liked: false,
  rating: 4.5,
  images: [
    "https://www.weareteachers.com/wp-content/uploads/plastic-bottle-fairy-house-night-lights-680.jpg", "https://www.wastewiseproductsinc.com/wp-content/uploads/2014/02/coffee-can-planters.jpg","https://www.bhg.com/thmb/XAZVTUe7N7rZaOKuFyv28Zp6eMs=/550x0/filters:no_upscale():strip_icc()/101169186-81a603c6109643edb4170339d73d0ed1.jpg?height=200&width=200","https://transjardins.org/wp-content/uploads/2017/11/recup-562x424.jpg" 
  ],
  category: "Electronics",
  description: "Experience crystal-clear audio with our premium wireless noise-cancelling headphones. Perfect for music enthusiasts and professionals alike.",
  features: [
    "Active Noise Cancellation",
    "40-hour battery life",
    "Bluetooth 5.0 connectivity",
    "Comfortable over-ear design",
    "Built-in voice assistant support"
  ],
  reviews: [
    {
      id: 1,
      user: "AudioPhile",
      rating: 5,
      comment: "These headphones are amazing! The sound quality is superb and the noise cancellation works like a charm.",
      date: "2023-05-15"
    },
    {
      id: 2,
      user: "TechGuru",
      rating: 4,
      comment: "Great headphones overall. The battery life is impressive, but they're a bit heavy for extended use.",
      date: "2023-05-10"
    },
    {
      id: 3,
      user: "MusicLover",
      rating: 5,
      comment: "I'm in love with these headphones! They've completely transformed my listening experience.",
      date: "2023-05-05"
    }
  ],
  discount: 0.1
}


export default function ParentProductPage() {
  return (
    <>
    <NavBar />
    <main className="bg-background w-[80%] mx-[10%]">
      <ProductPage product={sampleProduct} />
    </main>
    </>
  )
}

