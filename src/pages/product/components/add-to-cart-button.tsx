import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/api/cart/addToCart'
import { useDispatch } from 'react-redux'
import { useIsAuthorized } from '@/hooks/useIsAuthorized'

export default function AddToCartButton({product} : {product: string}) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const {auth} = useIsAuthorized();
  function handleAddToCart(){
    if(isAdded == false){
      if(auth.uid){
        console.log("before added to cart");
        addToCart(product, auth.uid, 1, dispatch, "1");
        console.log("added to cart");
      }
    }
    else{
      console.log("remove from cart");
    }
  }

  useEffect(()=>{
    console.log(auth);
  }, [auth]);

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

