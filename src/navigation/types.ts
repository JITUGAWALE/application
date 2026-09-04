export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Centers: undefined;
  Services: { centerId: string };
  Cart: undefined;
  Checkout: undefined;
  RazorpayPayment: {
    amount: number;
    orderId: string;
    centerName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  OrderConfirmation: { orderId: string; paymentId?: string };
};
