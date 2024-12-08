import { Event } from "@/types/event";
import { useState } from "react";
interface EventCardProps {
  event: Event;
  onClick: () => void;
}
export function EventCard({ event, onClick }: EventCardProps) {
  const [registered, setRegistered] = useState(false);
  return (
    <div className="bg-green-100 p-3 rounded-lg mb-3">
      <div className="lg:flex bg-white/50 p-4 rounded-lg shadow-md items-center w-full">
        <div className="w-[50%] ml-3 space-y-4 lg:block md:flex sm:flex md:justify-between">
          <div className="w-full flex items-center justify-center top-0 ">
            <img
              src={event.image}
              alt={event.title}
              className="h-48 object-cover lg:mr-3 mb-21 rounded-md w-full"
            />
          </div>
          <div className="bottom-0 shadow-sm border border-green-100 rounded-md mr-3 p-2">
            <p className="text-[15px] space-y-2 font-semibold">
              🏢: {event.companyName}
            </p>
            <p className="text-[15px] space-y-2 font-semibold flex items-center">
              🗓️: {event.date.toString()}
            </p>
            <p className="text-[15px] space-y-2 font-semibold">
              📍: {event.location}
            </p>
            <p className="text-[15px] space-y-2 font-semibold">
              💚:{" "}
              {event.registered ? event.registered + "x" : 0} participants{" "}
            </p>
          </div>
        </div>
        <div className="w-[50%] h-full p-2">
          <div className="bg-white/30 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:shadow-lg w-full">
            <div className="p-4 top-0 -translate-y-4">
              <h3 className="text-xl font-semibold mb-2"> {event.title} 🚀 </h3>
              <p
                className="text-gray-600 mb-2 text-[16px] font-semibold"
                onClick={onClick}
              >
                Potential reward coins: {event.potentialEarnings ?? "NA"}
              </p>
              <p className="text-gray-600 mb-2 text-[16px]" onClick={onClick}>
                {(event.fullDescription + event.fullDescription).slice(0, 400)}
                ...Read More
              </p>
            </div>
            <div className="w-full flex p-2">
              <button
                className="flex justify-center bg-green-300 px-3 py-2 rounded-lg w-full text-center"
                onClick={() => setRegistered(!registered)}
              >
                {registered ? "Unregister" : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

