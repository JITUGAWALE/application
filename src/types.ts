export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  image: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTimeMinutes: number;
  priceForTwo: number;
  image: string;
  menu: MenuItem[];
};

export type CartLine = {
  restaurantId: string;
  item: MenuItem;
  quantity: number;
};

export type User = {
  name: string;
  email: string;
};

export type Order = {
  id: string;
  restaurantName: string;
  lines: CartLine[];
  address: string;
  paymentMethod: 'CASH_ON_DELIVERY';
  total: number;
  placedAt: string;
};
