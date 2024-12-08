import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/api/cart/addToCart'
import { useDispatch } from 'react-redux'

export default function AddToCartButton({product} : {product: string}) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    // addToCart(cartId, product, 1, dispatch);
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

