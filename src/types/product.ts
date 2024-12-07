export interface Product {
    id: number;
    title: string;
    price: number;
    condition: string;
    seller: string;
    liked: boolean;
    rating: number;
    images: string[];
    category: string;
    description?: string;
    features?: string[];
    reviews?: Review[];
    discount?: number;
  }

  export interface cartProduct extends Product{ quantity: number }
  
  export interface ShippingOption {
    id: string;
    name: string;
    price: number;
}

  export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }