'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Step {
  id: number
  title: string
  description: string
}

const steps: Step[] = [
  { id: 1, title: "Collection", description: "Plastic waste is collected from various sources." },
  { id: 2, title: "Sorting", description: "Plastics are sorted by type and color." },
  { id: 3, title: "Washing", description: "Sorted plastics are washed to remove impurities." },
  { id: 4, title: "Shredding", description: "Clean plastics are shredded into small pieces." },
  { id: 5, title: "Melting", description: "Shredded plastics are melted down." },
  { id: 6, title: "Pelletizing", description: "Melted plastic is formed into small pellets." },
]

export default function PlasticRecyclingProcess() {
  const [activeStep, setActiveStep] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep < steps.length ? prevStep + 1 : prevStep))
    }, 2000) 
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">Plastic Recycling Process</h1>
    <div className="flex items-start">
   
      <div className="w-3/4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <StepDot
              step={step}
              isActive={activeStep >= step.id}
              isCompleted={activeStep > step.id}
            />
            {index < steps.length - 1 && (
              <StepConnector
                isCompleted={activeStep > step.id}
              />
            )}
          </React.Fragment>
        ))}
      </div>
  
    
      <div className='w-1/4'>
        <img src="plant.png" height={500} alt="Recycling Plant" className="w-full mt-24 " />
      </div>
    </div>
  </div>
  
  )
}

interface StepDotProps {
  step: Step
  isActive: boolean
  isCompleted: boolean
}

function StepDot({ step, isActive, isCompleted }: StepDotProps) {
  return (
    <div className="mb-16 w-full">
      <motion.div
        className={`w-8 h-8 ml-2 rounded-full transition-colors duration-300 flex items-center justify-center
          ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white font-bold">{step.id}</span>
      </motion.div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-2 p-4 bg-white rounded shadow-md w-4/5"
          >
            <h3 className="font-bold mb-2">{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface StepConnectorProps {
  isCompleted: boolean
}

function StepConnector({ isCompleted }: StepConnectorProps) {
  return (
    <motion.div
      className={`absolute left-36 w-0.5 h-12 -mt-16 ${
        isCompleted ? 'bg-green-500' : 'bg-gray-300'
      }`}
      initial={{ height: 0 }}
      animate={{ height: '4rem' }}
      transition={{ duration: 0.5 }}
    />
  )
}

