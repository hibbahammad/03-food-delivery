export const demoOrders = [
  {
    id: 'ORD-1025',
    restaurant: 'Bistro Bloom',
    restaurantId: 'bistro-bloom',
    items: [
      { id: 'margherita-pizza', name: 'Margherita Pizza', quantity: 1, price: 18.5 },
      { id: 'citrus-salad', name: 'Citrus Salad', quantity: 1, price: 12.9 },
    ],
    subtotal: 31.4,
    deliveryFee: 3.99,
    total: 35.39,
    status: 'Delivered',
    date: '2026-09-28T18:45:00.000Z',
    deliveryAddress: '21 Maple Street, Downtown',
    contactName: 'Alya Khan',
    contactPhone: '+1 (415) 555-0134',
    payment: 'Visa •••• 4752',
    deliveryMethod: 'Standard',
  },
]

export default demoOrders
