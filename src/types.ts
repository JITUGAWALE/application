export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
  image: string;
};

export type MassageCenter = {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  arrivalMinutes: number;
  startingPrice: number;
  image: string;
  services: Service[];
};

export type CartLine = {
  centerId: string;
  item: Service;
  quantity: number;
};

export type User = {
  name: string;
  email: string;
};

export type Order = {
  id: string;
  centerName: string;
  lines: CartLine[];
  address: string;
  paymentMethod: 'CASH_ON_DELIVERY' | 'RAZORPAY';
  paymentId?: string;
  total: number;
  placedAt: string;
};
