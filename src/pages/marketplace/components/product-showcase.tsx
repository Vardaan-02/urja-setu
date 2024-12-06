"use client";

import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "./product-grid";
import ProductFilters from "./product-filters";

export interface Product {
  id: number;
  title: string;
  price: number;
  condition: string;
  seller: string;
  liked: boolean;
  rating: number;
  image: string;
  category: string;
}

const categories = ["All", "Furniture", "Electronics", "Clothing"];

export default function ProductShowcase() {
  const { category = "All", page = "1" } = useParams();
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = React.useState([0, 1000])
  const handleCategoryChange = (newCategory: string) => {
    navigate(`/marketplace/category/${newCategory}/page/1`);
  };
  const [products, setProducts] = React.useState<Array<Product>>();

  React.useEffect(() => {
    const image = [
      "https://www.weareteachers.com/wp-content/uploads/plastic-bottle-fairy-house-night-lights-680.jpg", "https://www.wastewiseproductsinc.com/wp-content/uploads/2014/02/coffee-can-planters.jpg","https://www.bhg.com/thmb/XAZVTUe7N7rZaOKuFyv28Zp6eMs=/550x0/filters:no_upscale():strip_icc()/101169186-81a603c6109643edb4170339d73d0ed1.jpg?height=200&width=200","https://transjardins.org/wp-content/uploads/2017/11/recup-562x424.jpg" 
    ]
    const products = [
      {
        id: 1,
        title: "Recycled Wood Coffee Table",
        price: 129.99,
        condition: "Like New",
        seller: "EcoFurniture",
        liked: true,
        rating: 4,
        image: "https://www.weareteachers.com/wp-content/uploads/plastic-bottle-fairy-house-night-lights-680.jpg",
        category: "Furniture",
      },
      {
        id: 2,
        title: "Refurbished Smartphone",
        price: 299.99,
        condition: "Gently Used",
        seller: "TechRecycle",
        liked: false,
        rating: 3.5,
        image: "https://www.wastewiseproductsinc.com/wp-content/uploads/2014/02/coffee-can-planters.jpg",
        category: "Electronics",
      },
      {
        id: 3,
        title: "Upcycled Denim Jacket",
        price: 59.99,
        condition: "Like New",
        liked: true,
        rating: 3.5,
        seller: "GreenThreads",
        image:
          "https://www.bhg.com/thmb/XAZVTUe7N7rZaOKuFyv28Zp6eMs=/550x0/filters:no_upscale():strip_icc()/101169186-81a603c6109643edb4170339d73d0ed1.jpg?height=200&width=200",
        category: "Clothing",
      },
      // Add more products here to test pagination
      ...[...Array(100)].map((_, index) => ({
        id: index + 4,
        title: `Product ${index + 4}`,
        price: Math.random() * 900 + 50,
        condition: Math.random() > 0.5 ? "Like New" : "Gently Used",
        seller: `Seller ${index + 4}`,
        liked: false,
        rating: Math.floor(Math.random() * 6),
        image: image[Math.floor(Math.random() * 4)],
        category: ["Furniture", "Electronics", "Clothing"][
          Math.floor(Math.random() * 3)
        ],
      })),
    ];
    setProducts(products);
  }, []);

  return (
    <div className="container w-[90%] mx-[5%]">
      <h2 className="text-3xl font-bold mb-6">Recycled Treasures</h2>
      <Tabs
        value={category}
        className="w-full"
        onValueChange={handleCategoryChange}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <div>
              {categories.map((cat) => (
                <TabsTrigger className="bg-white text-gray-800" key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </div>
            <div>
              <ProductFilters priceRange={priceRange} setPriceRange={setPriceRange}/>
            </div>
          </TabsList>
        </div>
        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <ProductGrid products={products} category={cat} currentPage={parseInt(page)} priceRange={priceRange} setPriceRange={setPriceRange} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
