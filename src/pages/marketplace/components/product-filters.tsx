"use client"

import * as React from "react"
import { Filter } from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface productFilters {
    priceRange: Array<number>,
    setPriceRange: React.Dispatch<React.SetStateAction<Array<number>>>
}

export default function ProductFilters({priceRange, setPriceRange}: productFilters) {

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white text-black border hover:bg-gray-100"><Filter />Filters</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Price Range</DropdownMenuLabel>
        <div className="px-2 py-4">
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

