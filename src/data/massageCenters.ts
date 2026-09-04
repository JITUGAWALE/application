import { MassageCenter } from '../types';

const img = (seed: string) => `https://picsum.photos/seed/${seed}/400/300`;

export const MASSAGE_CENTERS: MassageCenter[] = [
  {
    id: 'c1',
    name: 'Serene Touch Spa',
    specialties: ['Swedish', 'Deep Tissue'],
    rating: 4.6,
    arrivalMinutes: 35,
    startingPrice: 999,
    image: img('serene-touch'),
    services: [
      { id: 's1', name: 'Swedish Massage', description: 'Gentle full-body relaxation massage', price: 999, durationMinutes: 60, category: 'Relaxation', image: img('swedish') },
      { id: 's2', name: 'Deep Tissue Massage', description: 'Targets chronic muscle tension', price: 1299, durationMinutes: 60, category: 'Therapeutic', image: img('deep-tissue') },
      { id: 's3', name: 'Hot Stone Therapy', description: 'Heated stones ease deep muscle stiffness', price: 1499, durationMinutes: 75, category: 'Therapeutic', image: img('hot-stone') },
      { id: 's4', name: 'Head & Shoulder Massage', description: 'Quick relief for tension headaches', price: 499, durationMinutes: 30, category: 'Quick Relief', image: img('head-shoulder') },
    ],
  },
  {
    id: 'c2',
    name: 'Bliss Body Works',
    specialties: ['Thai', 'Aromatherapy'],
    rating: 4.4,
    arrivalMinutes: 40,
    startingPrice: 899,
    image: img('bliss-body'),
    services: [
      { id: 's5', name: 'Thai Massage', description: 'Stretch-based massage for flexibility', price: 1199, durationMinutes: 60, category: 'Therapeutic', image: img('thai') },
      { id: 's6', name: 'Aromatherapy Massage', description: 'Essential oils for deep relaxation', price: 1099, durationMinutes: 60, category: 'Relaxation', image: img('aromatherapy') },
      { id: 's7', name: 'Foot Reflexology', description: 'Pressure-point foot massage', price: 699, durationMinutes: 45, category: 'Quick Relief', image: img('reflexology') },
      { id: 's8', name: 'Back & Neck Massage', description: 'Focused relief for desk-work strain', price: 599, durationMinutes: 30, category: 'Quick Relief', image: img('back-neck') },
    ],
  },
  {
    id: 'c3',
    name: 'Urban Wellness Studio',
    specialties: ['Sports', 'Prenatal'],
    rating: 4.5,
    arrivalMinutes: 30,
    startingPrice: 1099,
    image: img('urban-wellness'),
    services: [
      { id: 's9', name: 'Sports Massage', description: 'Recovery massage for active bodies', price: 1399, durationMinutes: 60, category: 'Therapeutic', image: img('sports') },
      { id: 's10', name: 'Prenatal Massage', description: 'Safe, soothing massage for expecting mothers', price: 1299, durationMinutes: 60, category: 'Relaxation', image: img('prenatal') },
      { id: 's11', name: 'Couples Massage', description: 'Side-by-side relaxation for two', price: 2399, durationMinutes: 60, category: 'Couples', image: img('couples') },
      { id: 's12', name: 'Body Scrub Add-on', description: 'Exfoliating scrub to refresh your skin', price: 399, durationMinutes: 20, category: 'Add-ons', image: img('scrub') },
    ],
  },
  {
    id: 'c4',
    name: 'Tranquil Home Spa',
    specialties: ['Ayurvedic', 'Balinese'],
    rating: 4.7,
    arrivalMinutes: 45,
    startingPrice: 1199,
    image: img('tranquil-home'),
    services: [
      { id: 's13', name: 'Ayurvedic Abhyanga', description: 'Warm herbal oil massage, Ayurvedic style', price: 1599, durationMinutes: 75, category: 'Therapeutic', image: img('ayurvedic') },
      { id: 's14', name: 'Balinese Massage', description: 'Deep pressure with stretching and acupressure', price: 1399, durationMinutes: 60, category: 'Relaxation', image: img('balinese') },
      { id: 's15', name: 'Scalp & Champi Massage', description: 'Traditional Indian head massage', price: 449, durationMinutes: 30, category: 'Quick Relief', image: img('champi') },
      { id: 's16', name: 'Hot Oil Foot Massage', description: 'Warm oil massage for tired feet', price: 549, durationMinutes: 30, category: 'Quick Relief', image: img('hot-oil-foot') },
    ],
  },
];
