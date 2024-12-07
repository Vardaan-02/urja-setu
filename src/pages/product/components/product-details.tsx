import { Heart } from 'lucide-react'
import { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import Rating from '@/components/ui/rating'
import AddToCartButton from './add-to-cart-button'

interface ProductDetailsProps {
  product: Product
  isLiked: boolean
  onLikeToggle: () => void
}

export default function ProductDetails({ product, isLiked, onLikeToggle }: ProductDetailsProps) {
  return (
    <div className="space-y-4 bg-white/30 shadow-lg rounded-xl p-4 h-full">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground">by {product.seller}</p>
        </div>
        <button onClick={onLikeToggle} className="text-primary">
          <Heart className={`h-6 w-6 ${isLiked ? 'fill-primary' : ''}`} />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <Rating rating={product.rating} size={18} className='w-auto justify-start'/>
        <span className="text-muted-foreground">({product.reviews?.length} reviews)</span>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        {product.discount && (
          <span className="text-lg text-muted-foreground line-through">${(product.price / (1 - product.discount)).toFixed(2)}</span>
        )}
        {product.discount && <Badge variant="success">{(product.discount * 100).toFixed(0)}% OFF</Badge>}
      </div>
      <p className="text-black">{product.description}</p>
      <div className='text-gray-800'>
        <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {product.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      {/* <div className="flex items-center space-x-2">
        <Badge>{product.category}</Badge>
        <Badge variant="outline">{product.condition}</Badge>
      </div> */}
      <AddToCartButton />
    </div>
  )
}

