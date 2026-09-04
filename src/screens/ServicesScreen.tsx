import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Alert, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { MASSAGE_CENTERS } from '../data/massageCenters';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { MassageCenter, Service } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Services'>;

export default function ServicesScreen({ route, navigation }: Props) {
  const { centerId } = route.params;
  const center = useMemo(() => MASSAGE_CENTERS.find((c) => c.id === centerId), [centerId]) as MassageCenter;
  const { center: cartCenter, quantityOf, addItem, decrementItem, itemCount, subtotal } = useCart();

  const sections = useMemo(() => {
    const byCategory = new Map<string, Service[]>();
    center.services.forEach((item) => {
      const list = byCategory.get(item.category) ?? [];
      list.push(item);
      byCategory.set(item.category, list);
    });
    return Array.from(byCategory.entries()).map(([title, data]) => ({ title, data }));
  }, [center]);

  const onAdd = (item: Service) => {
    if (cartCenter && cartCenter.id !== center.id) {
      Alert.alert(
        'Start a new cart?',
        `Your cart has services from ${cartCenter.name}. Adding from ${center.name} will clear it.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start New Cart', onPress: () => addItem(center, item) },
        ]
      );
      return;
    }
    addItem(center, item);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: center.image }} style={styles.hero} />
      <View style={styles.heroOverlay}>
        <Text style={styles.title}>{center.name}</Text>
        <Text style={styles.subtitle}>{center.specialties.join(', ')}</Text>
        <Text style={styles.subtitle}>
          ★ {center.rating} · Therapist in {center.arrivalMinutes} min · From ₹{center.startingPrice}
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        renderItem={({ item }) => {
          const qty = quantityOf(item.id);
          return (
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                  ₹{item.price} · {item.durationMinutes} min
                </Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.addControlWrap}>
                {qty === 0 ? (
                  <Pressable style={styles.addButton} onPress={() => onAdd(item)} testID={`add-${item.id}`}>
                    <Text style={styles.addButtonText}>ADD</Text>
                  </Pressable>
                ) : (
                  <View style={styles.stepper}>
                    <Pressable onPress={() => decrementItem(item.id)} style={styles.stepperButton} testID={`decrement-${item.id}`}>
                      <Text style={styles.stepperButtonText}>−</Text>
                    </Pressable>
                    <Text style={styles.stepperCount}>{qty}</Text>
                    <Pressable onPress={() => onAdd(item)} style={styles.stepperButton} testID={`increment-${item.id}`}>
                      <Text style={styles.stepperButtonText}>+</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />

      {itemCount > 0 && (
        <Pressable style={styles.cartBar} onPress={() => navigation.navigate('Cart')} testID="services-view-cart-bar">
          <Text style={styles.cartBarText}>
            {itemCount} item{itemCount > 1 ? 's' : ''} · ₹{subtotal}
          </Text>
          <Text style={styles.cartBarAction}>View Cart →</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { width: '100%', height: 160 },
  heroOverlay: { padding: 16, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.subtext, marginTop: 2 },
  listContent: { padding: 16, paddingBottom: 100 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 16, marginBottom: 8 },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  itemInfo: { flex: 1, gap: 4 },
  itemName: { fontWeight: '700', color: colors.text, fontSize: 15 },
  itemMeta: { color: colors.text, fontWeight: '600', fontSize: 13 },
  itemDescription: { color: colors.subtext, fontSize: 13 },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  addControlWrap: { justifyContent: 'flex-end', alignItems: 'center', width: 80 },
  addButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginTop: -28,
  },
  addButtonText: { color: colors.primary, fontWeight: '800' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: -28,
    overflow: 'hidden',
  },
  stepperButton: { paddingHorizontal: 10, paddingVertical: 8 },
  stepperButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  stepperCount: { color: '#fff', fontWeight: '800', minWidth: 16, textAlign: 'center' },
  cartBar: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartBarText: { color: '#fff', fontWeight: '700' },
  cartBarAction: { color: '#fff', fontWeight: '700' },
});
