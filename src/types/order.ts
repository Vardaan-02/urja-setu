export interface PastDetailsProps {
  orders: {
    seller?: {
      name: string;
      image: string;
      phone: string;
      address: string;
    };
    company?: {
      name: string;
      image: string;
      phone: string;
      address: string;
    };
    item?: {
      name: string;
      price: number;
      weight: number;
      image: string;
      category: string;
    };
    deliveryPerson?: {
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
      name?: string;
      image?: string;
      phone?: string;
      address?: string;
    };
    company?: {
      name?: string;
      image?: string;
      phone?: string;
      address?: string;
    };
    item?: {
      name?: string;
      price?: number;
      weight?: number;
      image?: string;
      category?: string;
    };
    deliveryPerson?: {
      name?: string;
      photo?: string;
      contact?: string;
      rating?: number;
    };
    pickupTime?: {
      start?: string;
      end?: string;
    };
  };
}
