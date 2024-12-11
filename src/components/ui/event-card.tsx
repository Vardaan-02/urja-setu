import { registerEvent } from "@/api/events/registerEvent";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { Event } from "@/types/event";
import { Building2, Calendar, Heart, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface EventCardProps {
  id: string;
  event: Event;
  onClick: () => void;
  deleteEvent: () => void;
  updateEvent: (event: Event) => void;
}

export function EventCard({
  id,
  event,
  onClick,
  deleteEvent,
  updateEvent,
}: EventCardProps) {
  const dispatch = useDispatch();
  const { auth } = useIsAuthorized();
  const userId = auth.uid!;
  let orgName;
  if (auth.role === "Organization") {
    orgName = auth.name;
  }
  const registeredEventsArray = auth.details.eventsId;
  const isRegistered = registeredEventsArray?.includes(event);
  const [registered, setRegistered] = useState(isRegistered);
  useEffect(() => {
    setRegistered(isRegistered);
  }, [isRegistered]);

  const eventDate =
    typeof event.date === "string"
      ? new Date(event.date).toLocaleDateString()
      : event.date.toDate().toLocaleDateString();

  const handleRegisterToggle = () => {
    if (!isRegistered) registerEvent(userId, id, dispatch);
    setRegistered(true);
  };

  return (
    <div className="bg-white/30 p-3 rounded-lg mb-3">
      <div className="lg:flex bg-white/50 p-5 rounded-lg shadow-md items-center w-full relative">
        {event.companyName === orgName && (
          <>
            <button
              className="absolute top-2 right-2 text-black hover:text-red-800"
              onClick={deleteEvent}
              aria-label="Delete Event"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              className="absolute top-2 right-10 text-black hover:text-blue-800"
              onClick={() => updateEvent(event)}
              aria-label="Update Event"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487c-.895-.894-2.07-1.386-3.294-1.386-1.225 0-2.4.492-3.294 1.386L4.993 9.768c-.39.39-.674.879-.824 1.41l-1.137 4.097a1.094 1.094 0 001.342 1.342l4.096-1.137c.531-.15 1.02-.434 1.41-.824l5.281-5.281c.895-.894 1.387-2.07 1.387-3.294 0-1.225-.492-2.4-1.387-3.294z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 19.5h-6"
                />
              </svg>
            </button>
          </>
        )}

        {/* Event Details */}
        <div className="w-[50%] ml-3 space-y-4 lg:block md:flex sm:flex md:justify-between">
          <div className="w-full flex items-center justify-center top-0">
            <img
              src={event.image}
              alt={event.title}
              className="h-48 object-cover lg:mr-3 mb-21 rounded-md w-full"
            />
          </div>
          <div className="bottom-0 shadow-sm rounded-md mr-3 p-2 flex flex-col gap-4">
            <p className="text-sm space-y-2 flex items-center">
              <Building2 className="h-4 w-4" /> : {event.companyName}
            </p>
            <p className="text-sm space-y-2 flex items-center">
              <Calendar className="h-4 w-4" /> : {eventDate}
            </p>
            <p className="text-sm space-y-2 flex items-centerlex items-center">
              <MapPin className="h-4 w-4" /> : {event.location}
            </p>
            <p className="text-sm space-y-2 flex items-center">
              <Heart className="h-4 w-4" /> :
              {event.registered ? event.registered + "x" : 0} participants
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
                {(event.fullDescription + event.fullDescription).slice(0, 400)}{" "}
                ...Read More
              </p>
            </div>
            <div className="w-full flex p-2">
              <button
                className={`flex justify-center px-3 py-2 rounded-lg w-full text-center ${
                  registered ? "bg-red-300" : "bg-green-300"
                }`}
                onClick={handleRegisterToggle}
              >
                {registered ? "Registered" : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
