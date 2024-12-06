import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AddToCartButton() {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </Button>
  )
}

