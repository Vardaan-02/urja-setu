import { useEffect, useState } from "react";
import { EventCard } from "@/components/ui/event-card";
import { Event } from "@/types/event";
import { EventModal } from "@/components/ui/event-modal";
import { fetchEvents } from "@/api/events/fetchEvents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { fetchRegisteredEvents } from "@/api/events/fetchRegisteredEvents";
import { motion } from "framer-motion";
import NavBar from "@/components/nav-bar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const auth = useIsAuthorized();
  const events = useSelector((state: RootState) => state.event.events);
  useEffect(() => {
    fetchEvents(dispatch);
    if (auth.auth.details.eventsId) {
      console.log(auth.auth.details.eventsId);

      const loadRegisteredEvents = async () => {
        const fetchedEvents = await fetchRegisteredEvents(auth.auth.uid);
        const uniqueEvents = Array.from(
          new Map(fetchedEvents.map((event) => [event.id, event])).values()
        );
        console.log(uniqueEvents);
        
        setRegisteredEvents(uniqueEvents);
      };

      loadRegisteredEvents();
    }
  }, [auth.auth.details.events, dispatch, auth.auth.details.eventsId]);

  const filteredEvents = (eventsList: Event[]) =>
    eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.date.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

  const deleteEvent = () => {};
  const updateEvent = () => {};

  console.log(registeredEvents);

  const tabs = [
    { id: "registered", title: "Registered Events", requiredRole: null },
    { id: "upcoming", title: "Upcoming Events", requiredRole: null },
    { id: "admin", title: "Admin Panel", requiredRole: "Organization" },
  ];

  const visibleTabs = tabs.filter(
    (tab) => tab.requiredRole === null || tab.requiredRole === auth.auth.role
  );

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen pb-12 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto relative z-10">
          <div className="p-4 rounded-lg shadow-md bg-green-50">
            <div className="flex justify-center mb-8 space-x-20">
              {visibleTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2 text-lg font-semibold rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-white bg-green-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.title}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-green-500 rounded-lg z-[-1]"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-center mb-8">
              <div className="relative w-96">
                <div className="flex items-center rounded-lg">
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    className="flex-1 border border-gray-800 px-3 py-2 w-full rounded-lg"
                  />
                  <Search className="ml-3 text-gray-500 absolute right-2" />
                </div>
              </div>
            </div>
            {activeTab === "registered" ? (
              registeredEvents.length > 0 ? (
                <div className="flex flex-col gap-12">
                  {filteredEvents(registeredEvents).map((event) => (
                    <EventCard
                      id={event.id}
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                      deleteEvent={deleteEvent}
                      updateEvent={updateEvent}
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
                    id={event.id}
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                    deleteEvent={deleteEvent}
                    updateEvent={updateEvent}
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
