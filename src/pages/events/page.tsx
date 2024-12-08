import { useEffect, useState } from "react";
import { EventCard } from "@/components/ui/event-card";
import { Event } from "@/types/event";
import { EventModal } from "@/components/ui/event-modal";
import { events } from "@/utils/events";
import EventHeader from "./EventHeader";
import { fetchEvents } from "@/api/events/fetchEvents";
import { useDispatch } from "react-redux";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchEvents(dispatch);
  }, [])
  return (
    <>
      <EventHeader />
      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
        
        <div className="max-w-7xl mx-auto relative z-10 ">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Upcoming Events
          </h1>
          <div className="m-4 space-y-6 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>
    </>
  );
}
