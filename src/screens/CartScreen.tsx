import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { computeOrderTotals, useCart } from '../context/CartContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const { center, lines, subtotal, addItem, decrementItem } = useCart();
  const { homeVisitFee, tax, total } = computeOrderTotals(subtotal);

  if (lines.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🧖</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Centers')}>
          <Text style={styles.primaryButtonText}>Browse Massage Centers</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.centerName}>{center?.name}</Text>

      <FlatList
        data={lines}
        keyExtractor={(l) => l.item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: line }) => (
          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowName}>{line.item.name}</Text>
              <Text style={styles.rowPrice}>₹{line.item.price} each · {line.item.durationMinutes} min</Text>
            </View>
            <View style={styles.stepper}>
              <Pressable
                onPress={() => decrementItem(line.item.id)}
                style={styles.stepperButton}
                testID={`cart-decrement-${line.item.id}`}
              >
                <Text style={styles.stepperButtonText}>−</Text>
              </Pressable>
              <Text style={styles.stepperCount}>{line.quantity}</Text>
              <Pressable
                onPress={() => center && addItem(center, line.item)}
                style={styles.stepperButton}
                testID={`cart-increment-${line.item.id}`}
              >
                <Text style={styles.stepperButtonText}>+</Text>
              </Pressable>
            </View>
            <Text style={styles.lineTotal}>₹{line.item.price * line.quantity}</Text>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total</Text>
          <Text style={styles.summaryValue}>₹{subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Home Visit Fee</Text>
          <Text style={styles.summaryValue}>₹{homeVisitFee}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.summaryValue}>₹{tax}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>To Pay</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Checkout')} testID="proceed-to-checkout">
          <Text style={styles.primaryButtonText}>Proceed to Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  centerName: { fontSize: 20, fontWeight: '800', color: colors.text, padding: 20, paddingBottom: 8 },
  listContent: { paddingHorizontal: 20, gap: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 10,
  },
  rowInfo: { flex: 1, gap: 2 },
  rowName: { fontWeight: '700', color: colors.text },
  rowPrice: { color: colors.subtext, fontSize: 13 },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 8, overflow: 'hidden' },
  stepperButton: { paddingHorizontal: 10, paddingVertical: 6 },
  stepperButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  stepperCount: { color: '#fff', fontWeight: '800', minWidth: 16, textAlign: 'center' },
  lineTotal: { fontWeight: '700', color: colors.text, width: 60, textAlign: 'right' },
  summary: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 20,
    gap: 8,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { color: colors.subtext },
  summaryValue: { color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, marginTop: 4 },
  totalLabel: { fontWeight: '800', color: colors.text, fontSize: 16 },
  totalValue: { fontWeight: '800', color: colors.text, fontSize: 16 },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
