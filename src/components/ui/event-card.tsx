import { Event } from "@/utils/events";
import { Calendar, Coins, LocateIcon } from "lucide-react";
import { LinkIcon } from "@heroicons/react/24/outline";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const shortDescription = event.fullDescription.slice(0, 100);
  return (
    <div className="lg:flex bg-[#DAFFED] rounded-md items-center">
      <img
        src={event.image}
        alt={event.title}
        className="h-48 object-cover lg:mr-3 mb-21 rounded-md"
      />
      <div
        className="bg-[#aff2b982] rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:shadow-lg w-full"
        onClick={onClick}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-2 text-[16px]">
            {shortDescription}...Read More
          </p>
          <b>
            <p className="text-[18px] text-black flex gap-2 p-1">
              
              Organized by: {event.companyName}
            </p>
          </b>
          <p className="text-[16px] text-black flex gap-2 p-1">
            <Calendar />
            {event.date}
          </p>
          <p className="text-[16px] text-black flex gap-2 p-1">
            <LocateIcon /> {event.location}
          </p>
        
            <p className="text-[16px] text-black font-bold flex gap-2 p-1">
              <Coins /> Reward Points: {event.potentialEarnings ? event.potentialEarnings : "No reward points"}
            </p>
       
        </div>
      </div>
    </div>
  );
}
