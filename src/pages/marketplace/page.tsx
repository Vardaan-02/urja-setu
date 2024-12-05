"use client"

import { Route, Routes } from 'react-router-dom'
import AdSlider from "./components/ad-slider"
import ProductShowcase from "./components/product-showcase"
import CallToAction from "./components/call-to-action"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <AdSlider />
      <ProductShowcase />
      <CallToAction />
    </div>
  )
}

