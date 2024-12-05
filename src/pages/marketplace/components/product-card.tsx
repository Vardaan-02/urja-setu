"use client"

import { Heart, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  price: number
  condition: string
  seller: string
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div
            className="relative aspect-square"
            style={{
                backgroundImage: `url('${product.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100 transition-all"
            >
                <Heart className="h-5 w-5" />
            </Button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
          <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{product.condition}</Badge>
            <span className="text-sm text-muted-foreground">{product.seller}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

