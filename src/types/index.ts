export interface CafeEvent {
  id: string
  title: string
  /** ISO date, e.g. "2026-11-28" */
  date: string
  /** Display time, e.g. "20:00" */
  time: string
  artist: string
  description: string
  genre: string
  /** Free text shown on the card, e.g. "Вход свободен" or "3.50 €." */
  priceLabel: string
  /** Numeric price per person (used later by the payment step). 0 = free / on request */
  pricePerPerson: number
  /** URL of the poster / photo. Empty string = a placeholder is shown */
  image: string
  /** Total seats for the event */
  capacity: number
  /** Seats already taken (changed from the admin panel) */
  reserved: number
  /** Time slots offered in the reservation dropdown */
  timeSlots: string[]
}

export interface MenuItem {
  id: string
  name: string
  /** Optional: quantity or short note, e.g. "0.50 л" */
  description?: string
  /** Optional price label, e.g. "3.20 €" (not shown when missing) */
  price?: string
}

export interface MenuCategory {
  id: string
  title: string
  /** Optional photo for the category tile */
  image?: string
  items: MenuItem[]
}

export interface OpeningHours {
  /** One weekday, e.g. "Понеделник" */
  day: string
  hours: string
}

export interface SiteInfo {
  name: string
  tagline: string
  address: string
  city: string
  phone: string
  reservationPhone: string
  email: string
  mapsUrl: string
  mapEmbedUrl: string
  facebookUrl: string
  instagramUrl: string
  openingHours: OpeningHours[]
}

export interface ReservationFormValues {
  name: string
  phone: string
  date: string
  time: string
  guests: number
  notes: string
}
