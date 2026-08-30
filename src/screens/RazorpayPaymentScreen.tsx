import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../navigation/types';
import { buildRazorpayCheckoutHtml, RazorpayWebMessage } from '../payments/razorpay';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RazorpayPayment'>;

export default function RazorpayPaymentScreen({ route, navigation }: Props) {
  const { amount, orderId, restaurantName, customerName, customerEmail, customerPhone } = route.params;
  const { clearCart } = useCart();

  const html = useMemo(
    () =>
      buildRazorpayCheckoutHtml({
        amountInRupees: amount,
        orderId,
        restaurantName,
        customerName,
        customerEmail,
        customerPhone,
      }),
    [amount, orderId, restaurantName, customerName, customerEmail, customerPhone]
  );

  const onMessage = (event: WebViewMessageEvent) => {
    let data: RazorpayWebMessage;
    try {
      data = JSON.parse(event.nativeEvent.data);
    } catch {
      return;
    }

    if (data.type === 'success') {
      clearCart();
      navigation.replace('OrderConfirmation', { orderId, paymentId: data.paymentId });
    } else if (data.type === 'failure') {
      Alert.alert('Payment Failed', data.reason || 'Your payment could not be processed. Please try again.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else if (data.type === 'dismiss') {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        onMessage={onMessage}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  webview: { flex: 1, backgroundColor: colors.background },
  loading: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
});
