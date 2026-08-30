export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Restaurants: undefined;
  Menu: { restaurantId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
};
