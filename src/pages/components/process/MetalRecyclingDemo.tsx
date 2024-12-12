"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '@/components/ui/progressBar'

const steps = [
  {
    title: "Collection",
    description: "Metal waste is collected from various sources such as households, industries, and construction sites.",
    image: "collection.png"
  },
//   {
//     title: "Sorting",
//     description: "The collected metal waste is sorted into different categories based on their type and composition.",
//     image: "/placeholder.svg?height=200&width=300"
//   },
  {
    title: "Shredding",
    description: "Large metal pieces are shredded into smaller fragments to facilitate further processing.",
    image: "shredding.png"
  },
  {
    title: "Magnetic Separation",
    description: "Ferrous metals are separated from non-ferrous metals using powerful magnets.",
    image: "magnetic.png"
  },
  {
    title: "Melting",
    description: "The sorted metals are melted in furnaces at high temperatures.",
    image: "melting.jpeg"
  },
  {
    title: "Purification",
    description: "Impurities are removed from the molten metal to improve its quality.",
    image: "puri.png"
  },
  {
    title: "Casting",
    description: "The purified molten metal is cast into ingots or specific shapes for reuse.",
    image: "casting.jpg"
  }
]

export default function MetalRecyclingDemo() {
  const [currentStep, setCurrentStep] = useState(0)
//   const [isAutoAdvancing, setIsAutoAdvancing] = useState(true)

  const progress = (currentStep / (steps.length - 1)) * 100

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Metal Waste Recycling Process</h1>
        <ProgressBar progress={progress} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {steps.map((step, index) => (
              index <= currentStep && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
                  <h2 className="text-2xl font-semibold mb-4">{step.title}</h2>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-600 mb-4">{step.description}</p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

