import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { computeOrderTotals, useCart } from '../context/CartContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
type PaymentMethod = 'CASH_ON_DELIVERY' | 'RAZORPAY';

export default function CheckoutScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { restaurant, lines, subtotal, clearCart } = useCart();
  const { deliveryFee, tax, total } = computeOrderTotals(subtotal);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH_ON_DELIVERY');

  const onPlaceOrder = () => {
    if (!address.trim() || !phone.trim()) {
      Alert.alert('Missing details', 'Please add a delivery address and phone number.');
      return;
    }
    if (!user) return;

    const orderId = `ORD${Date.now().toString().slice(-8)}`;

    if (paymentMethod === 'CASH_ON_DELIVERY') {
      clearCart();
      navigation.replace('OrderConfirmation', { orderId });
      return;
    }

    navigation.navigate('RazorpayPayment', {
      amount: total,
      orderId,
      restaurantName: restaurant?.name ?? 'Foodie',
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: phone,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="House no, street, area, city"
          placeholderTextColor={colors.subtext}
          value={address}
          onChangeText={setAddress}
          multiline
          testID="checkout-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor={colors.subtext}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          testID="checkout-phone"
        />
        {user && <Text style={styles.hint}>Ordering as {user.name} ({user.email})</Text>}

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <Pressable
          style={[styles.paymentOption, paymentMethod !== 'CASH_ON_DELIVERY' && styles.paymentOptionInactive]}
          onPress={() => setPaymentMethod('CASH_ON_DELIVERY')}
          testID="payment-method-cod"
        >
          <View style={[styles.radioOuter, paymentMethod !== 'CASH_ON_DELIVERY' && styles.radioOuterInactive]}>
            {paymentMethod === 'CASH_ON_DELIVERY' && <View style={styles.radioInner} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Cash on Delivery</Text>
            <Text style={styles.paymentSubtitle}>Pay with cash when your order arrives</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.paymentOption, paymentMethod !== 'RAZORPAY' && styles.paymentOptionInactive]}
          onPress={() => setPaymentMethod('RAZORPAY')}
          testID="payment-method-razorpay"
        >
          <View style={[styles.radioOuter, paymentMethod !== 'RAZORPAY' && styles.radioOuterInactive]}>
            {paymentMethod === 'RAZORPAY' && <View style={styles.radioInner} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Pay Online</Text>
            <Text style={styles.paymentSubtitle}>Cards, UPI, wallets & netbanking via Razorpay</Text>
          </View>
        </Pressable>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          {lines.map((line) => (
            <View style={styles.summaryRow} key={line.item.id}>
              <Text style={styles.summaryLabel}>
                {line.quantity} × {line.item.name}
              </Text>
              <Text style={styles.summaryValue}>₹{line.quantity * line.item.price}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item Total</Text>
            <Text style={styles.summaryValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹{deliveryFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes</Text>
            <Text style={styles.summaryValue}>₹{tax}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>To Pay ({paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash' : 'Online'})</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={onPlaceOrder} testID="place-order-button">
          <Text style={styles.primaryButtonText}>
            {paymentMethod === 'CASH_ON_DELIVERY' ? `Place Order · ₹${total}` : `Pay ₹${total}`}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20, paddingBottom: 24, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginTop: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multiline: { minHeight: 70, textAlignVertical: 'top' },
  hint: { color: colors.subtext, fontSize: 12, marginTop: 2 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 14,
  },
  paymentOptionInactive: { borderColor: colors.border },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterInactive: { borderColor: colors.border },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  paymentTitle: { fontWeight: '700', color: colors.text },
  paymentSubtitle: { color: colors.subtext, fontSize: 12 },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
  },
  restaurantName: { fontWeight: '800', color: colors.text, marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { color: colors.subtext, flexShrink: 1, paddingRight: 8 },
  summaryValue: { color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 6, marginTop: 2 },
  totalLabel: { fontWeight: '800', color: colors.text },
  totalValue: { fontWeight: '800', color: colors.text },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
