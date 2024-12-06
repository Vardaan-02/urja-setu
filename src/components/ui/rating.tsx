import { Star } from 'lucide-react'
import React from 'react'
import { motion } from "framer-motion";

function Rating({rating}: {rating: number}) {
  return (
    <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: star * 0.1 }}
            >
              <Star
                className={`w-3 h-3 ${
                  star <= rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </div>
  )
}

export default Rating