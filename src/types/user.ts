declare global {
    interface User {
      uid: string;
      name: string | null;
      email: string | null;
      photoURL: string | null;
      address: string | null;
      wallet: number | null;
      eventDates: [];
      cart: [];
      following: [];
      orders: [];
      role: "User";
    }
    interface Organization {
      uid: string;
      name: string | null;
      email: string | null;
      photoURL: string | null;
      address: string | null;
      followers: [];
      events: [];
      role: "Organization"
    }
    interface DeliveryPerson {
      uid: string;
      name: string | null;
      email: string | null;
      photoURL: string | null;
      organizationId: string | null;
      rating: number | null;
      assigned_work: [];
      address: string,
      role: "DeliveryPerson"
    }
}
  