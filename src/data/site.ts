import type { SiteInfo } from '@/types'

/**
 * Основна информация за заведението.
 * Компонентите четат само от този файл.
 * Бутонът „Обади се“ ползва `phone`.
 */
const mapQuery = 'Sofia, Bulgaria'

export const site: SiteInfo = {
  name: 'Groove Café',
  tagline: 'Кафе, плочи и музика на живо',
  address: 'ул. „Примерна“ 12',
  city: '1000 София',
  phone: '088 800 0000',
  reservationPhone: '088 800 0001',
  email: 'hello@example.com',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=bg&z=12&output=embed`,
  facebookUrl: 'https://www.facebook.com/',
  instagramUrl: 'https://www.instagram.com/',
  // Един ред на ден (за страница „Контакти“). Във футъра последователните
  // дни с еднакви часове се групират автоматично.
  openingHours: [
    { day: 'Понеделник', hours: '08:00 – 23:00' },
    { day: 'Вторник', hours: '08:00 – 23:00' },
    { day: 'Сряда', hours: '08:00 – 23:00' },
    { day: 'Четвъртък', hours: '08:00 – 23:00' },
    { day: 'Петък', hours: '08:00 – 01:00' },
    { day: 'Събота', hours: '10:00 – 01:00' },
    { day: 'Неделя', hours: '10:00 – 20:00' },
  ],
}

export const navLinks = [
  { to: '/', label: 'Начало' },
  { to: '/menu', label: 'Меню' },
  { to: '/events', label: 'Събития' },
  { to: '/about', label: 'За нас' },
  { to: '/contact', label: 'Контакти' },
] as const
