'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Recycle, Truck, Factory, Droplets, FlaskRoundIcon as Flask, Box, TruckIcon } from 'lucide-react'

const steps = [
  { icon: Recycle, title: 'Collection', description: 'Paper is collected from recycling bins' },
  { icon: Truck, title: 'Transportation', description: 'Collected paper is transported to recycling facilities' },
  { icon: Factory, title: 'Sorting', description: 'Paper is sorted by type and quality' },
  { icon: Droplets, title: 'Pulping', description: 'Paper is mixed with water to create a pulp' },
  { icon: Flask, title: 'De-inking', description: 'Ink and impurities are removed from the pulp' },
  { icon: Box, title: 'New Paper', description: 'Cleaned pulp is pressed and dried into new paper products' },
]

const PaperRecyclingProcess = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const animateSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i) 
        await controls.start({ x: `${(i / (steps.length - 1)) * 1920}%` }) 
        await new Promise(resolve => setTimeout(resolve, 2000)) 
      }
    }
    animateSteps()
  }, [controls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-12">Paper Recycling Process</h1>
        
        <div className="relative">
        
          <div className="absolute top-96 left-0 w-full h-20 bg-gray-400 transform -translate-y-1/2"></div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full ${
                    currentStep >= index ? 'bg-green-500' : 'bg-gray-300'
                  } flex items-center justify-center mb-2`}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-32 text-center">
                  <h2 className="text-lg font-semibold text-green-700">{step.title}</h2>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            className="absolute top-96 left-0 transform -translate-y-1/2 z-20"
            animate={controls}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          >
            <TruckIcon className="w-12 h-12 text-blue-600" />
          </motion.div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-green-700 mb-4">{steps[currentStep].title}</h3>
          <p className="text-lg text-gray-700">{steps[currentStep].description}</p>
        </div>
      </div>
    </div>
  )
}

export default PaperRecyclingProcess
