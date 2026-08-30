export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Restaurants: undefined;
  Menu: { restaurantId: string };
  Cart: undefined;
  Checkout: undefined;
  RazorpayPayment: {
    amount: number;
    orderId: string;
    restaurantName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  OrderConfirmation: { orderId: string; paymentId?: string };
};
