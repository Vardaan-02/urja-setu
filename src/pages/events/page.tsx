import { useEffect, useState } from "react";
import { EventCard } from "@/components/ui/event-card";
import { Event } from "@/types/event";
import { EventModal } from "@/components/ui/event-modal";
import { events } from "@/utils/events";
import { fetchEvents } from "@/api/events/fetchEvents";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<"registered" | "upcoming">(
    "upcoming"
  );
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEvents(dispatch);
    setRegisteredEvents([]);
  }, []);

  const filteredEvents = (eventsList: Event[]) =>
    eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.date).toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <div className="mb-[100px] bg-green-50">
        <Header />
      </div>
      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-center mb-8 space-x-20">
            <button
              onClick={() => setActiveTab("registered")}
              className={`px-6 py-2 text-lg font-semibold rounded-lg ${
                activeTab === "registered"
                  ? "text-white bg-green-500"
                  : "text-gray-600 bg-gray-200"
              }`}
            >
              Registered Events
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 text-lg font-semibold rounded-lg ${
                activeTab === "upcoming"
                  ? "text-white bg-green-500"
                  : "text-gray-600 bg-gray-200"
              }`}
            >
              Upcoming Events
            </button>
          </div>
          <div className="flex justify-center mb-8">
            <div className="relative w-[480px]">
              {" "}
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-lg font-semibold rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <span className="absolute right-4 cursor-pointer top-3 text-gray-500 text-center">🔍</span>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow-md">
            {activeTab === "registered" ? (
              registeredEvents.length > 0 ? (
                <div className="">
                  {filteredEvents(registeredEvents).map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 text-lg">
                  No registered events
                </p>
              )
            ) : (
              <div className="">
                {filteredEvents(events).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            )}
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
