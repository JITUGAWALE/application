import React, { createContext, useContext, useMemo, useState } from 'react';
import { CartLine, MenuItem, Restaurant } from '../types';

type CartContextValue = {
  restaurant: Restaurant | null;
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (restaurant: Restaurant, item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  quantityOf: (itemId: string) => number;
  clearCart: () => void;
};

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = (nextRestaurant: Restaurant, item: MenuItem) => {
    setLines((prev) => {
      const isDifferentRestaurant = restaurant && restaurant.id !== nextRestaurant.id;
      const base = isDifferentRestaurant ? [] : prev;
      const existing = base.find((l) => l.item.id === item.id);
      if (existing) {
        return base.map((l) => (l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...base, { restaurantId: nextRestaurant.id, item, quantity: 1 }];
    });
    setRestaurant(nextRestaurant);
  };

  const removeItem = (itemId: string) => {
    setLines((prev) => {
      const next = prev.filter((l) => l.item.id !== itemId);
      if (next.length === 0) setRestaurant(null);
      return next;
    });
  };

  const decrementItem = (itemId: string) => {
    setLines((prev) => {
      const next = prev
        .map((l) => (l.item.id === itemId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0);
      if (next.length === 0) setRestaurant(null);
      return next;
    });
  };

  const quantityOf = (itemId: string) => lines.find((l) => l.item.id === itemId)?.quantity ?? 0;

  const clearCart = () => {
    setLines([]);
    setRestaurant(null);
  };

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0), [lines]);

  const value = useMemo(
    () => ({ restaurant, lines, itemCount, subtotal, addItem, removeItem, decrementItem, quantityOf, clearCart }),
    [restaurant, lines, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function computeOrderTotals(subtotal: number) {
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryFee + tax;
  return { deliveryFee, tax, total };
}
