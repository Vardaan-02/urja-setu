import { motion } from "framer-motion";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSent: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const bubbleVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={`flex ${
        message.isSent ? "justify-end" : "justify-start"
      } mb-4`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col ${
          message.isSent ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm font-semibold">{message.sender}</span>
        </div>
        <motion.div
          className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
            message.isSent
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "bg-gradient-to-r from-gray-100 to-gray-200"
          }`}
          variants={bubbleVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <p className="text-sm">{message.text}</p>
        </motion.div>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(message.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}
