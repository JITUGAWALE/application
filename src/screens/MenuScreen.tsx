import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Alert, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { RESTAURANTS } from '../data/restaurants';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { MenuItem, Restaurant } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export default function MenuScreen({ route, navigation }: Props) {
  const { restaurantId } = route.params;
  const restaurant = useMemo(() => RESTAURANTS.find((r) => r.id === restaurantId), [restaurantId]) as Restaurant;
  const { restaurant: cartRestaurant, quantityOf, addItem, decrementItem, itemCount, subtotal } = useCart();

  const sections = useMemo(() => {
    const byCategory = new Map<string, MenuItem[]>();
    restaurant.menu.forEach((item) => {
      const list = byCategory.get(item.category) ?? [];
      list.push(item);
      byCategory.set(item.category, list);
    });
    return Array.from(byCategory.entries()).map(([title, data]) => ({ title, data }));
  }, [restaurant]);

  const onAdd = (item: MenuItem) => {
    if (cartRestaurant && cartRestaurant.id !== restaurant.id) {
      Alert.alert(
        'Start a new cart?',
        `Your cart has items from ${cartRestaurant.name}. Adding from ${restaurant.name} will clear it.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start New Cart', onPress: () => addItem(restaurant, item) },
        ]
      );
      return;
    }
    addItem(restaurant, item);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.image }} style={styles.hero} />
      <View style={styles.heroOverlay}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>{restaurant.cuisines.join(', ')}</Text>
        <Text style={styles.subtitle}>
          ★ {restaurant.rating} · {restaurant.deliveryTimeMinutes} min · ₹{restaurant.priceForTwo} for two
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
                <View style={styles.itemTitleRow}>
                  <View style={[styles.vegDot, { borderColor: item.isVeg ? colors.veg : colors.nonVeg }]}>
                    <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? colors.veg : colors.nonVeg }]} />
                  </View>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
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
        <Pressable style={styles.cartBar} onPress={() => navigation.navigate('Cart')} testID="menu-view-cart-bar">
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
  itemTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  vegDot: { width: 14, height: 14, borderWidth: 1.5, borderRadius: 2, alignItems: 'center', justifyContent: 'center' },
  vegDotInner: { width: 6, height: 6, borderRadius: 3 },
  itemName: { fontWeight: '700', color: colors.text, fontSize: 15, flexShrink: 1 },
  itemPrice: { color: colors.text, fontWeight: '600' },
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
