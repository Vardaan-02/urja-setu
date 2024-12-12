'use client'

import React from 'react'
import Slider from 'react-slick'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

// Import the CSS files directly in the component
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface RecyclingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const recyclingSteps: RecyclingStep[] = [
  {
    id: 1,
    title: "Collection",
    description: "E-waste is collected from various sources like homes, offices, and drop-off centers.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
  },
  {
    id: 2,
    title: "Sorting",
    description: "Collected e-waste is sorted into different categories based on type and recyclability.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  },
  {
    id: 3,
    title: "Disassembly",
    description: "Devices are manually or mechanically disassembled to separate different components.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
  },
  {
    id: 4,
    title: "Material Recovery",
    description: "Valuable materials like metals, plastics, and glass are extracted for recycling.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  },
  {
    id: 5,
    title: "Hazardous Waste Treatment",
    description: "Hazardous materials are safely removed and treated to prevent environmental contamination.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  },
  {
    id: 6,
    title: "Recycling and Reuse",
    description: "Recovered materials are processed and reused in manufacturing new products.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  }
]

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
    onClick={onClick}
  >
    <ChevronRightIcon className="h-6 w-6 text-gray-600" />
  </button>
)

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
    onClick={onClick}
  >
    <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
  </button>
)

export default function ElectricWasteRecycling() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Electric Waste Recycling Process</h1>
      <Slider {...settings}>
        {recyclingSteps.map((step) => (
          <div key={step.id} className="px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 h-80 flex flex-col items-center justify-center">
              <div className="text-blue-500 mb-4">{step.icon}</div>
              <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

