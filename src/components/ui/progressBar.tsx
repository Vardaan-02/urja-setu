import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-700"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  )
}

export default ProgressBar

