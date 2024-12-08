export interface PastDetailsProps {
  orders: {
    seller?: {
      id: string,
      name: string;
      image: string;
      phone: string;
      address: string;
    };
    company?: {
      id: string,
      name: string;
      image: string;
      phone: string;
      address: string;
    };
    item?: {
      id: string,
      name: string;
      price: number;
      weight: number;
      image: string;
      category: string;
    };
    deliveryPerson?: {
      id: string,
      name: string;
      photo: string;
      contact: string;
      rating: number;
    };
    pickupTime?: {
      start: string;
      end: string;
    };
  }[];
}

export interface Order {
  order: {
    seller?: {
      id?: string,
      name?: string;
      image?: string;
      phone?: string;
      address?: string;
    };
    company?: {
      id?: string,
      name?: string;
      image?: string;
      phone?: string;
      address?: string;
    };
    item?: {
      id: string,
      name?: string;
      price?: number;
      weight?: number;
      image?: string;
      category?: string;
    };
    deliveryPerson?: {
      id?: string,
      name?: string;
      photo?: string;
      contact?: string;
      rating?: number;
    };
    pickupTime?: {
      start?: string;
      end?: string;
    };
    chatId?: string;
  };
}
