import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

export default function OrderConfirmationScreen({ route, navigation }: Props) {
  const { orderId, paymentId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.orderId}>Order #{orderId}</Text>
      {paymentId && <Text style={styles.orderId}>Payment ID: {paymentId}</Text>}
      <Text style={styles.message}>
        {paymentId
          ? 'Payment received. Your order has been placed successfully.'
          : 'Your order has been placed successfully. Pay with cash when it arrives at your doorstep.'}
      </Text>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Restaurants' }] })}
        testID="back-to-restaurants"
      >
        <Text style={styles.primaryButtonText}>Back to Restaurants</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  emoji: { fontSize: 56, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  orderId: { fontSize: 15, color: colors.subtext, marginBottom: 8 },
  message: { textAlign: 'center', color: colors.subtext, marginBottom: 24, lineHeight: 20 },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, paddingHorizontal: 28 },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
