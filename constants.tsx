
import React from 'react';
import { PasaranData, ShioData } from './types';

export const PASARAN_SCHEDULE: PasaranData[] = [
  { id: '1', name: 'Singapore (SGP)', open: '17:30', close: '17:45', result: 'Wed, Sat, Sun', status: 'Open' },
  { id: '2', name: 'Hong Kong (HK)', open: '22:45', close: '23:00', result: 'Daily', status: 'Open' },
  { id: '3', name: 'Sydney (SDY)', open: '13:30', close: '14:00', result: 'Daily', status: 'Open' },
  { id: '4', name: 'Cambodia (CMD)', open: '11:30', close: '11:50', result: 'Daily', status: 'Open' },
  { id: '5', name: 'Toto Macau (TMC)', open: '13:00', close: '13:15', result: '5 Times Daily', status: 'Open' },
  { id: '6', name: 'Magnum 4D', open: '18:00', close: '19:00', result: 'Wed, Sat, Sun', status: 'Open' },
  { id: '7', name: 'Damacai', open: '18:00', close: '19:00', result: 'Wed, Sat, Sun', status: 'Open' },
  { id: '8', name: 'Sports Toto', open: '18:00', close: '19:00', result: 'Wed, Sat, Sun', status: 'Open' },
];

export const SHIO_DATA: ShioData[] = [
  { name: 'Naga (Dragon)', years: '2024, 2012, 2000', luckyNumbers: '1, 6, 7', element: 'Wood', trait: 'Powerful, Energetic' },
  { name: 'Ular (Snake)', years: '2025, 2013, 2001', luckyNumbers: '2, 8, 9', element: 'Fire', trait: 'Wise, Graceful' },
  { name: 'Kuda (Horse)', years: '2026, 2014, 2002', luckyNumbers: '3, 4, 9', element: 'Fire', trait: 'Animated, Active' },
  { name: 'Kambing (Goat)', years: '2027, 2015, 2003', luckyNumbers: '2, 7', element: 'Earth', trait: 'Gentle, Shy' },
  { name: 'Monyet (Monkey)', years: '2028, 2016, 2004', luckyNumbers: '4, 9', element: 'Metal', trait: 'Clever, Curious' },
  { name: 'Ayam (Rooster)', years: '2029, 2017, 2005', luckyNumbers: '5, 7, 8', element: 'Metal', trait: 'Observant, Hardworking' },
  { name: 'Anjing (Dog)', years: '2030, 2018, 2006', luckyNumbers: '3, 4, 9', element: 'Earth', trait: 'Loyal, Honest' },
  { name: 'Babi (Pig)', years: '2031, 2019, 2007', luckyNumbers: '2, 5, 8', element: 'Water', trait: 'Compassionate, Generous' },
  { name: 'Tikus (Rat)', years: '2032, 2020, 2008', luckyNumbers: '2, 3', element: 'Water', trait: 'Quick-witted, Resourceful' },
  { name: 'Kerbau (Ox)', years: '2033, 2021, 2009', luckyNumbers: '1, 4', element: 'Earth', trait: 'Diligent, Dependable' },
  { name: 'Macan (Tiger)', years: '2034, 2022, 2010', luckyNumbers: '1, 3, 4', element: 'Wood', trait: 'Brave, Confident' },
  { name: 'Kelinci (Rabbit)', years: '2035, 2023, 2011', luckyNumbers: '3, 4, 6', element: 'Wood', trait: 'Quiet, Elegant' },
];

export const SYAIR_SENTENCES = [
  "Bintang kejora bersinar terang di ufuk timur.",
  "Naga bersembunyi di balik awan mendung.",
  "Angka sakti muncul di tengah malam buta.",
  "Kunci keberuntungan ada pada kesabaran.",
  "Mimpi semalam adalah petunjuk hari ini.",
  "Gunung tinggi menyimpan harta yang tak terduga.",
  "Langkah kaki macan tak bersuara di hutan jati.",
  "Air mengalir tenang membawa berkah melimpah.",
  "Hati-hati dengan bisikan angin sore.",
  "Cahaya bulan purnama menerangi jalan yang gelap.",
  "Rejeki nomplok datang tanpa diduga-duga.",
  "Siapkan wadah besar untuk menampung emas.",
];

export const BANK_PREFIXES: Record<string, string> = {
  '123': 'Bank Mandiri',
  '456': 'Bank Central Asia (BCA)',
  '789': 'Bank Rakyat Indonesia (BRI)',
  '002': 'Bank BNI',
  '014': 'Bank Danamon',
  '016': 'Bank Permata',
  '022': 'Bank CIMB Niaga',
};
