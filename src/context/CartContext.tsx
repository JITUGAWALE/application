import React, { createContext, useContext, useMemo, useState } from 'react';
import { CartLine, MassageCenter, Service } from '../types';

type CartContextValue = {
  center: MassageCenter | null;
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (center: MassageCenter, item: Service) => void;
  removeItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  quantityOf: (itemId: string) => number;
  clearCart: () => void;
};

const HOME_VISIT_FEE = 49;
const TAX_RATE = 0.05;

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [center, setCenter] = useState<MassageCenter | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = (nextCenter: MassageCenter, item: Service) => {
    setLines((prev) => {
      const isDifferentCenter = center && center.id !== nextCenter.id;
      const base = isDifferentCenter ? [] : prev;
      const existing = base.find((l) => l.item.id === item.id);
      if (existing) {
        return base.map((l) => (l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...base, { centerId: nextCenter.id, item, quantity: 1 }];
    });
    setCenter(nextCenter);
  };

  const removeItem = (itemId: string) => {
    setLines((prev) => {
      const next = prev.filter((l) => l.item.id !== itemId);
      if (next.length === 0) setCenter(null);
      return next;
    });
  };

  const decrementItem = (itemId: string) => {
    setLines((prev) => {
      const next = prev
        .map((l) => (l.item.id === itemId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0);
      if (next.length === 0) setCenter(null);
      return next;
    });
  };

  const quantityOf = (itemId: string) => lines.find((l) => l.item.id === itemId)?.quantity ?? 0;

  const clearCart = () => {
    setLines([]);
    setCenter(null);
  };

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0), [lines]);

  const value = useMemo(
    () => ({ center, lines, itemCount, subtotal, addItem, removeItem, decrementItem, quantityOf, clearCart }),
    [center, lines, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function computeOrderTotals(subtotal: number) {
  const homeVisitFee = subtotal > 0 ? HOME_VISIT_FEE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + homeVisitFee + tax;
  return { homeVisitFee, tax, total };
}
