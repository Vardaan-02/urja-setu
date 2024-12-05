"use client";

import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "./product-grid";
import ProductFilters from "./product-filters";
import useDebounce from "@/hooks/useDebouce";

const categories = ["All", "Furniture", "Electronics", "Clothing"];

export default function ProductShowcase() {
  const { category = "All", page = "1" } = useParams();
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = React.useState([0, 1000])
  const handleCategoryChange = (newCategory: string) => {
    navigate(`/marketplace/category/${newCategory}/page/1`);
  };

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
                <TabsTrigger key={cat} value={cat}>
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
            <ProductGrid category={cat} currentPage={parseInt(page)} priceRange={priceRange} setPriceRange={setPriceRange} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
