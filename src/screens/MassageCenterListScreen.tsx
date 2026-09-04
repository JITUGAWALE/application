import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MASSAGE_CENTERS } from '../data/massageCenters';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { MassageCenter } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Centers'>;

export default function MassageCenterListScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MASSAGE_CENTERS;
    return MASSAGE_CENTERS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.specialties.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const renderItem = ({ item }: { item: MassageCenter }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('Services', { centerId: item.id })}
      testID={`center-${item.id}`}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.specialties.join(', ')}</Text>
        <View style={styles.cardMetaRow}>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
          <Text style={styles.metaText}>Therapist in {item.arrivalMinutes} min</Text>
          <Text style={styles.metaText}>From ₹{item.startingPrice}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, {user?.name.split(' ')[0] || 'there'} 👋</Text>
          <Text style={styles.headerTitle}>Book a massage at home</Text>
        </View>
        <Pressable onPress={logout} testID="logout-button">
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search centers or specialties"
        placeholderTextColor={colors.subtext}
        value={query}
        onChangeText={setQuery}
        testID="center-search"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {itemCount > 0 && (
        <Pressable style={styles.cartBar} onPress={() => navigation.navigate('Cart')} testID="view-cart-bar">
          <Text style={styles.cartBarText}>
            {itemCount} item{itemCount > 1 ? 's' : ''} in cart
          </Text>
          <Text style={styles.cartBarAction}>View Cart →</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  greeting: { fontSize: 14, color: colors.subtext },
  headerTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 2 },
  logoutText: { color: colors.primary, fontWeight: '600' },
  search: {
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  listContent: { padding: 20, paddingBottom: 100, gap: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardImage: { width: '100%', height: 150 },
  cardBody: { padding: 14, gap: 4 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  cardSubtitle: { color: colors.subtext },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  ratingPill: { backgroundColor: colors.success, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  ratingText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  metaText: { color: colors.subtext, fontSize: 13 },
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
