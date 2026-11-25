import type { MenuCategory } from '@/types'

/**
 * Начално (ПРИМЕРНО) меню с примерни цени в евро.
 * `image` на категорията е по желание (празно = плочката е само цветна).
 * Админът може да променя всичко от /admin; тук е началното състояние.
 */
export const menu: MenuCategory[] = [
  {
    id: 'hot-drinks',
    title: 'Топли напитки',
    items: [
      { id: 'espresso', name: 'Еспресо', price: '2.00 €' },
      { id: 'cappuccino', name: 'Капучино', price: '3.00 €' },
      { id: 'flat-white', name: 'Flat white', price: '3.40 €' },
      { id: 'tea', name: 'Чай', price: '2.50 €' },
      { id: 'hot-chocolate', name: 'Горещ шоколад', price: '3.50 €' },
    ],
  },
  {
    id: 'soft-drinks',
    title: 'Безалкохолни напитки',
    items: [
      { id: 'lemonade', name: 'Домашна лимонада', description: '0.400 л', price: '3.50 €' },
      { id: 'fresh', name: 'Фреш', description: '0.250 л', price: '4.00 €' },
      { id: 'iced-coffee', name: 'Фрапе', price: '3.00 €' },
      { id: 'soda', name: 'Газирана напитка', description: '0.250 л', price: '2.50 €' },
      { id: 'water', name: 'Минерална вода', description: '0.330 л', price: '1.80 €' },
    ],
  },
  {
    id: 'wine-beer',
    title: 'Вино и бира',
    items: [
      { id: 'white-wine', name: 'Бяло вино', description: 'чаша 0.150 л', price: '4.50 €' },
      { id: 'red-wine', name: 'Червено вино', description: 'чаша 0.150 л', price: '4.50 €' },
      { id: 'sparkling', name: 'Пенливо', description: 'чаша 0.125 л', price: '5.00 €' },
      { id: 'draft-beer', name: 'Наливна бира', description: '0.400 л', price: '3.00 €' },
      { id: 'craft-beer', name: 'Крафт бира', description: '0.330 л', price: '4.50 €' },
    ],
  },
  {
    id: 'cocktails',
    title: 'Коктейли',
    items: [
      { id: 'aperol-spritz', name: 'Aperol Spritz', price: '7.00 €' },
      { id: 'mojito', name: 'Mojito', price: '7.00 €' },
      { id: 'margarita', name: 'Margarita', price: '7.50 €' },
      { id: 'old-fashioned', name: 'Old Fashioned', price: '8.00 €' },
    ],
  },
  {
    id: 'food',
    title: 'Хапване',
    items: [
      { id: 'bruschetta', name: 'Брускети', description: '150 гр', price: '5.50 €' },
      { id: 'club-sandwich', name: 'Клуб сандвич', description: '250 гр', price: '7.50 €' },
      { id: 'caesar-salad', name: 'Салата Цезар', description: '300 гр', price: '8.00 €' },
      { id: 'croissant', name: 'Кроасан с масло', description: '80 гр', price: '2.50 €' },
    ],
  },
  {
    id: 'desserts',
    title: 'Десерти',
    items: [
      { id: 'cheesecake', name: 'Чийзкейк', description: '140 гр', price: '5.00 €' },
      { id: 'brownie', name: 'Брауни със сладолед', description: '160 гр', price: '5.50 €' },
      { id: 'creme-brulee', name: 'Крем брюле', description: '120 гр', price: '4.50 €' },
    ],
  },
]
