'use client'

import { useState, useEffect } from "react"
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cartProduct } from "@/types/product"
import { ShippingOption } from "@/types/product"
import Rating from "@/components/ui/rating"
import { fetchCart } from "@/api/cart/fetchCart"
import { useDispatch } from "react-redux"

const initialProducts: cartProduct[] = [
  {
    id: "1",
    title: "Recycled Wood Coffee Table",
    price: 129.99,
    condition: "Like New",
    seller: "EcoFurniture",
    liked: true,
    quantity: 1,
    rating: 4,
    images: ["https://www.weareteachers.com/wp-content/uploads/plastic-bottle-fairy-house-night-lights-680.jpg"],
    category: "Furniture",
  },
  {
    id: "2",
    title: "Refurbished Smartphone",
    price: 299.99,
    condition: "Gently Used",
    seller: "TechRecycle",
    liked: false,
    quantity: 1,
    rating: 3.5,
    images: ["https://www.wastewiseproductsinc.com/wp-content/uploads/2014/02/coffee-can-planters.jpg"],
    category: "Electronics",
  },
  {
    id: "3",
    title: "Upcycled Denim Jacket",
    price: 59.99,
    condition: "Like New",
    liked: true,
    rating: 3.5,
    quantity: 1,
    seller: "GreenThreads",
    images:
      ["https://www.bhg.com/thmb/XAZVTUe7N7rZaOKuFyv28Zp6eMs=/550x0/filters:no_upscale():strip_icc()/101169186-81a603c6109643edb4170339d73d0ed1.jpg?height=200&width=200"],
    category: "Clothing",
  }
]

const shippingOptions: ShippingOption[] = [
  { id: "standard", name: "Standard Shipping", price: 5.99 },
  { id: "express", name: "Express Shipping", price: 14.99 },
  { id: "overnight", name: "Overnight Shipping", price: 29.99 },
]

export default function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<cartProduct[]>(initialProducts)
  const [subtotal, setSubtotal] = useState<number>(0)
  const [tax, setTax] = useState<number>(0)
  const [shipping, setShipping] = useState<number>(shippingOptions[0].price)
  const [total, setTotal] = useState<number>(0)
  const [couponCode, setCouponCode] = useState<string>("")
  const [discount, setDiscount] = useState<number>(0)

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const newTax = newSubtotal * 0.08 // Assuming 8% tax rate
    const newTotal = newSubtotal + newTax + shipping - discount

    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }, [cartItems, shipping, discount])

  useEffect(() => {
    fetchCart("EHgoixNBX0VEREcoWOyl", dispatch);
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1)
    }
  }

  return (
    <div className="min-h-scree py-4">
      <div className="w-[90%] mx-[5%]">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl">
              <CardContent className="p-6 bg-green-50 rounded-lg">
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/30 rounded-xl shadow-lg px-4 py-2">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full md:w-40 h-40 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-semibold">
                              {item.title}
                            </h2>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <Badge variant="secondary" className="mt-1">
                              {item.condition}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-2xl font-bold text-black">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-gray-600">
                            Sold by: {item.seller}
                          </span>
                        </div>
                        <div className="pt-3">
                            <Rating rating={item.rating}/>
                        </div>
                        
                        <div className="flex items-center mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="w-16 mx-4">
                          <Input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-full text-center"
                            aria-label={`Quantity of ${item.title}`}
                          />
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {cartItems.indexOf(item) < cartItems.length - 1 && (
                      <Separator className="my-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-green-50 px-6 py-4 rounded-xl">
            <Card className="border-none bg-white shadow-xl">
              <CardContent className="p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-black">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="shipping" className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Method
                    </label>
                    <Select onValueChange={(value) => setShipping(Number(value))}>
                      <SelectTrigger id="shipping">
                        <SelectValue placeholder="Select shipping method" />
                      </SelectTrigger>
                      <SelectContent>
                        {shippingOptions.map((option) => (
                          <SelectItem key={option.id} value={option.price.toString()}>
                            {option.name} - ${option.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code
                    </label>
                    <div className="flex justify-between items-center gap-3 w-full">
                      <Input
                        className="w-full"
                        id="coupon"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={applyCoupon}>Apply</Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

