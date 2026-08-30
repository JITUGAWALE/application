import { Restaurant } from '../types';

const food = (seed: string) => `https://picsum.photos/seed/${seed}/400/300`;

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Spice Route',
    cuisines: ['North Indian', 'Mughlai'],
    rating: 4.3,
    deliveryTimeMinutes: 28,
    priceForTwo: 400,
    image: food('spice-route'),
    menu: [
      { id: 'm1', name: 'Butter Chicken', description: 'Creamy tomato gravy with tandoori chicken', price: 280, category: 'Main Course', isVeg: false, image: food('butter-chicken') },
      { id: 'm2', name: 'Paneer Tikka Masala', description: 'Cottage cheese in spiced curry', price: 240, category: 'Main Course', isVeg: true, image: food('paneer-tikka') },
      { id: 'm3', name: 'Dal Makhani', description: 'Slow-cooked black lentils', price: 190, category: 'Main Course', isVeg: true, image: food('dal-makhani') },
      { id: 'm4', name: 'Garlic Naan', description: 'Tandoor baked flatbread', price: 60, category: 'Breads', isVeg: true, image: food('garlic-naan') },
      { id: 'm5', name: 'Gulab Jamun', description: 'Milk dumplings in sugar syrup', price: 90, category: 'Desserts', isVeg: true, image: food('gulab-jamun') },
    ],
  },
  {
    id: 'r2',
    name: 'Pizza Piazza',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.1,
    deliveryTimeMinutes: 22,
    priceForTwo: 500,
    image: food('pizza-piazza'),
    menu: [
      { id: 'm6', name: 'Margherita Pizza', description: 'Classic tomato and mozzarella', price: 249, category: 'Pizza', isVeg: true, image: food('margherita') },
      { id: 'm7', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and cheese', price: 349, category: 'Pizza', isVeg: false, image: food('pepperoni') },
      { id: 'm8', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 120, category: 'Sides', isVeg: true, image: food('garlic-bread') },
      { id: 'm9', name: 'Tiramisu', description: 'Coffee flavored Italian dessert', price: 160, category: 'Desserts', isVeg: true, image: food('tiramisu') },
    ],
  },
  {
    id: 'r3',
    name: 'Dragon Wok',
    cuisines: ['Chinese', 'Asian'],
    rating: 4.0,
    deliveryTimeMinutes: 30,
    priceForTwo: 350,
    image: food('dragon-wok'),
    menu: [
      { id: 'm10', name: 'Veg Hakka Noodles', description: 'Stir fried noodles with vegetables', price: 180, category: 'Noodles', isVeg: true, image: food('hakka-noodles') },
      { id: 'm11', name: 'Chicken Manchurian', description: 'Indo-Chinese fried chicken in sauce', price: 220, category: 'Starters', isVeg: false, image: food('manchurian') },
      { id: 'm12', name: 'Spring Rolls', description: 'Crispy vegetable spring rolls', price: 150, category: 'Starters', isVeg: true, image: food('spring-rolls') },
      { id: 'm13', name: 'Fried Rice', description: 'Wok tossed rice with veggies', price: 170, category: 'Rice', isVeg: true, image: food('fried-rice') },
    ],
  },
  {
    id: 'r4',
    name: 'Burger Barn',
    cuisines: ['American', 'Fast Food'],
    rating: 4.2,
    deliveryTimeMinutes: 18,
    priceForTwo: 300,
    image: food('burger-barn'),
    menu: [
      { id: 'm14', name: 'Classic Cheeseburger', description: 'Beef patty with cheddar cheese', price: 199, category: 'Burgers', isVeg: false, image: food('cheeseburger') },
      { id: 'm15', name: 'Veggie Burger', description: 'Grilled veggie patty burger', price: 169, category: 'Burgers', isVeg: true, image: food('veggie-burger') },
      { id: 'm16', name: 'French Fries', description: 'Crispy salted fries', price: 99, category: 'Sides', isVeg: true, image: food('fries') },
      { id: 'm17', name: 'Chocolate Shake', description: 'Thick chocolate milkshake', price: 129, category: 'Beverages', isVeg: true, image: food('shake') },
    ],
  },
  {
    id: 'r5',
    name: 'Sushi Central',
    cuisines: ['Japanese', 'Sushi'],
    rating: 4.5,
    deliveryTimeMinutes: 35,
    priceForTwo: 700,
    image: food('sushi-central'),
    menu: [
      { id: 'm18', name: 'California Roll', description: 'Crab, avocado and cucumber roll', price: 320, category: 'Sushi', isVeg: false, image: food('california-roll') },
      { id: 'm19', name: 'Veg Tempura Roll', description: 'Crispy vegetable tempura roll', price: 280, category: 'Sushi', isVeg: true, image: food('tempura-roll') },
      { id: 'm20', name: 'Miso Soup', description: 'Traditional Japanese soybean soup', price: 140, category: 'Soups', isVeg: true, image: food('miso-soup') },
    ],
  },
];
