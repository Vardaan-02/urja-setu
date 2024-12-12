import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Event } from "@/types/event";

export const fetchRegisteredEvents = async (userId: string) => {
  try {
    // Step 1: Fetch the user's document
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      console.error(`User with ID ${userId} does not exist.`);
      return [];
    }

    const userData = userSnapshot.data();
    const registeredEventIds: string[] = userData.events || []; 

    if (registeredEventIds.length === 0) {
      console.log(`No registered events found for userId ${userId}.`);
      return [];
    }

    const events = await Promise.all(
      registeredEventIds.map(async (eventId) => {
        const eventDocRef = doc(collection(db, "events"), eventId);
        const eventSnapshot = await getDoc(eventDocRef);

        if (!eventSnapshot.exists()) {
          console.log(`Event with ID ${eventId} does not exist.`);
          return null;
        }

        const eventData = eventSnapshot.data();
        return {
          id: eventId,
          title: eventData.title,
          shortDescription: eventData.shortDescription,
          fullDescription: eventData.fullDescription,
          date: eventData.date,
          companyName: eventData.companyName || "Urja Setu",
          time: eventData.time,
          location: eventData.location,
          image: eventData.image,
          potentialEarnings: eventData.potentialEarnings,
          registered: eventData.registered,
        } as Event;
      })
    );

    const validEvents = events.filter((event) => event !== null) as Event[];

    console.log("Fetched Registered Events: ", validEvents);
    return validEvents;
  } catch (error) {
    console.error("Error At fetchUserRegisteredEvents: ", error);
    return [];
  }
};

