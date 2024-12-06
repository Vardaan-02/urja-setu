import { Event } from "@/utils/events";
import { useState } from "react";
interface EventCardProps {
  event: Event;
  onClick: () => void;
}
export function EventCard({ event, onClick }: EventCardProps) {
  const [registered, setRegistered] = useState(false);
  return (
    <div className="bg-green-100 p-3 rounded-lg">
      <div className="lg:flex bg-white/50 p-4 rounded-lg shadow-md items-center w-full">
        <div className="w-[50%] ml-3 space-y-4 lg:block md:flex sm:flex md:justify-between">
          <div className="w-[90%] flex items-center justify-center top-0">
            <img
              src={event.image}
              alt={event.title}
              className="h-48 object-cover lg:mr-3 mb-21 rounded-md w-full"
            />
          </div>
          <div className="bottom-0">
            <p className="font-bold">{event.title}</p>
            <p className="text-sm space-y-2 font-semibold">
              Organized by: {event.companyName}
            </p>
            <p className="text-sm space-y-2 font-semibold">
              Date: {event.date}
            </p>
            <p className="text-sm space-y-2 font-semibold">
              Location: {event.location}
            </p>
            <p className="text-sm space-y-2 font-semibold">
              {event.registered ? event.registered + "x" : 0} participants
            </p>
          </div>
        </div>
        <div className="w-[50%] h-full">
          <div
            className="bg-white/30 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:shadow-lg w-full"
            onClick={onClick}
          >
            <div className="p-4 top-0 -translate-y-4">
              <h3 className="text-xl font-semibold mb-2">About the event</h3>
              <p className="text-gray-600 mb-2 text-[16px] font-semibold">
                Potential reward coins: {event.potentialEarnings ?? "NA"}
              </p>
              <p className="text-gray-600 mb-2 text-[16px]">
                {(event.fullDescription + event.fullDescription).slice(0, 400)}
                ...Read More
              </p>
            </div>
          </div>
          <div className="w-full flex justify-end p-2 translate-y-3">
            <button
              className="flex justify-end bg-green-300 px-3 py-2 rounded-lg"
              onClick={() => setRegistered(!registered)}
            >
              {registered ? "Unregister" : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
