import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DateSeparator from "./date-seprator";
import MessageBubble from "./message-bubble";
import InputField from "./input-field";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { createChat } from "@/api/chat/createChat";
import { useDispatch } from "react-redux";
import { sendMessage } from "@/api/chat/sendMessage";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { listenForMessages } from "@/api/chat/listenForMessage";

export default function ChatInterface() {
  const [messages, setMessages] = useState(mockMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const {id} = useParams();
  const auth = useIsAuthorized();
  if(!auth.auth.uid){
    console.log("Unauthorized");
    return;
  }
  // console.log(id);
  const order = useAppSelector(state => state.order.order);
  const chatOrder = order.find((o) => o.id === id);
  // console.log(chatOrder);
  const chatID = chatOrder?.chatId;
  console.log(chatID);
  
  useEffect(() => {
    if (chatID == null) {
      createChat(
        chatOrder?.order?.deliveryPerson?.id,
        chatOrder?.order?.seller?.id,
        chatOrder?.id,
        dispatch
      );
    } 
    else{
      const unsubscribe = listenForMessages(chatID, setMessages);
      return () => unsubscribe();
    }
  }, [chatID, chatOrder, dispatch]);
  

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string) => {
    // const newMessage = {
    //   id: messages.length + 1,
    //   sender: "You",
    //   text,
    //   time: new Date().toISOString(),
    //   read: false,
    // };
    sendMessage(chatID, auth.auth.uid, text, "text");
    // setMessages([...messages, newMessage]);
  };

  return (
    <div className=" w-full max-w-4xl h-[90vh] bg-white/30 rounded-lg shadow-xl overflow-hidden flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-scroll no-scrollbar p-4 space-y-4 "
      >
        <AnimatePresence>
          {messages.reduce((acc: JSX.Element[], message, index) => {
            const currentDate = new Date(message.time).toDateString();
            const prevDate =
              index > 0
                ? new Date(messages[index - 1].time).toDateString()
                : null;

            if (currentDate !== prevDate) {
              acc.push(
                <DateSeparator key={`date-${message.id}`} date={currentDate} />
              );
            }

            acc.push(
              <MessageBubble
                key={message.id}
                message={message}
              />
            );

            return acc;
          }, [])}
        </AnimatePresence>
      </div>
      <InputField onSendMessage={addMessage} />
    </div>
  );
}

// API dedo please
const mockMessages = [
  {
    id: 1,
    sender: "Alice",
    text: "Hey there! How are you doing?",
    time: "2024-12-06T09:00:00",
    isSent: false,
  },
  {
    id: 2,
    sender: "You",
    text: "Hi Alice! I'm doing great, thanks for asking. How about you?",
    time: "2024-12-06T09:05:00",
    isSent: true,
  },
  {
    id: 3,
    sender: "Alice",
    text: "I'm good too! Just working on some new projects. Anything exciting on your end?",
    time: "2024-12-06T09:10:00",
    isSent: false,
  },
  {
    id: 4,
    sender: "You",
    text: "Actually, yes! I'm learning some new web development techniques. It's challenging but fun!",
    time: "2024-12-06T09:15:00",
    isSent: true,
  },
  {
    id: 5,
    sender: "Alice",
    text: "That sounds awesome! Web development is such a vast field. What specific areas are you focusing on?",
    time: "2024-12-07T10:00:00",
    isSent: false,
  },
  {
    id: 6,
    sender: "You",
    text: "I'm diving deep into React and Next.js. The component-based architecture is really clicking for me!",
    time: "2024-12-07T10:05:00",
    isSent: true,
  },
  {
    id: 7,
    sender: "Alice",
    text: "Nice choice! React is super popular and versatile. Have you tried building any projects yet?",
    time: "2024-12-07T10:10:00",
    isSent: false,
  },
  {
    id: 8,
    sender: "You",
    text: "Yes, I'm actually working on a chat interface right now! It's been a great learning experience.",
    time: "2024-12-07T10:15:00",
    isSent: true,
  },
  {
    id: 9,
    sender: "Alice",
    text: "That's fantastic! Chat interfaces can be complex but they're excellent for learning. Keep it up!",
    time: "2024-12-07T10:20:00",
    isSent: false,
  },
];
