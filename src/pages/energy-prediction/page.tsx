import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SolarForm from "./components/solar"
import WindForm from "./components/wind"

const AnimatedTabContent = ({ children, isActive }: { children: React.ReactNode, isActive: boolean }) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export default function EnergyCalculator() {
  const [activeTab, setActiveTab] = useState("solar")

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Energy Calculator</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solar">Solar</TabsTrigger>
          <TabsTrigger value="wind">Wind</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <AnimatedTabContent isActive={activeTab === "solar"}>
            <SolarForm />
          </AnimatedTabContent>
          <AnimatedTabContent isActive={activeTab === "wind"}>
            <WindForm />
          </AnimatedTabContent>
        </div>
      </Tabs>
    </div>
  )
}

