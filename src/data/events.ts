import { addDaysISO } from '@/lib/format'
import type { CafeEvent } from '@/types'

/**
 * Начални (ПРИМЕРНИ) събития. Админът може да ги променя от /admin; промените
 * се пазят в браузъра (localStorage). Тук се редактира началното състояние.
 *
 * Датите са относителни (днес + N дни), за да са винаги предстоящи – минали
 * събития не се показват на сайта (само в админ панела). За реални дати
 * замени `addDaysISO(3)` с низ като '2026-12-05'.
 */
export const events: CafeEvent[] = [
  {
    id: 'painting-wine',
    title: 'Рисуване и вино',
    date: addDaysISO(3),
    time: '18:30',
    artist: 'Art Night Studio',
    description: 'Творческа вечер с рисуване под ръководство на художник и чаша вино. Материалите са осигурени.',
    genre: 'Творческа вечер',
    priceLabel: '18 € с чаша вино',
    pricePerPerson: 18,
    image: '',
    capacity: 24,
    reserved: 9,
    timeSlots: ['18:00', '18:30'],
  },
  {
    id: 'acoustic-night',
    title: 'Акустична вечер на живо',
    date: addDaysISO(6),
    time: '20:00',
    artist: 'The Velvet Needles',
    description: 'Акустични версии на рок класики в уютната атмосфера на кафенето.',
    genre: 'Акустичен рок',
    priceLabel: 'Вход свободен',
    pricePerPerson: 0,
    image: '',
    capacity: 30,
    reserved: 14,
    timeSlots: ['19:00', '19:30', '20:00'],
  },
  {
    id: 'retro-vinyl-party',
    title: 'Retro Vinyl Party',
    date: addDaysISO(13),
    time: '21:00',
    artist: 'DJ Spinwell',
    description: 'Ретро вечер с диджей сет изцяло от винил: диско, фънк и поп хитове от 70-те и 80-те.',
    genre: 'Retro / DJ',
    priceLabel: '10 € вход',
    pricePerPerson: 10,
    image: '',
    capacity: 40,
    reserved: 38,
    timeSlots: ['20:00', '20:30', '21:00'],
  },
  {
    id: 'jazz-trio',
    title: 'Джаз вечер',
    date: addDaysISO(20),
    time: '20:00',
    artist: 'Sunday Strings Trio',
    description: 'Джаз трио на живо: стандарти, балади и малко импровизация.',
    genre: 'Джаз',
    priceLabel: '12 € вход',
    pricePerPerson: 12,
    image: '',
    capacity: 30,
    reserved: 30,
    timeSlots: ['19:00', '19:30', '20:00'],
  },
]
