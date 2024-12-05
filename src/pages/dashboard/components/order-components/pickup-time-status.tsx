import { useState, useEffect } from 'react'

interface PickupTimeStatusProps {
  pickupTime: {
    start: string
    end: string
  }
}

export default function PickupTimeStatus({ pickupTime }: PickupTimeStatusProps) {
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const end = new Date(pickupTime.end)
      const diff = end.getTime() - now.getTime()

      if (diff > 0) {
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setTimeRemaining(`${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining('Time up!')
      }
    }

    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [pickupTime.end])

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold mb-2">Pickup Time & Status</h3>
        <p className="text-sm text-gray-600 mb-2">
          {pickupTime.start} - {pickupTime.end}
        </p>
        <p className="text-sm font-medium">{timeRemaining}</p>
      </div>
    </div>
  )
}

