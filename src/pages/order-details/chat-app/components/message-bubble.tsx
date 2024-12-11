import { Timestamp } from "@firebase/firestore";
import { motion } from "framer-motion";

interface Message {
  id: number;
  senderId: string;
  content: string;
  timestamp: Timestamp | string;
  read: boolean;
  messageType: string
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
        message.read ? "justify-end" : "justify-start"
      } mb-4`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col ${
          message.read ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm font-semibold">{message.senderId}</span>
        </div>
        <motion.div
          className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
            message.read
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "bg-gradient-to-r from-gray-100 to-gray-200"
          }`}
          variants={bubbleVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <p className="text-sm">{message.content}</p>
        </motion.div>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(message.read).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}
