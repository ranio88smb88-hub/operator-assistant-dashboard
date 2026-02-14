
export enum ModuleType {
  FOOTBALL_PRED = 'FOOTBALL_PRED',
  TOGEL_PRED = 'TOGEL_PRED',
  SYAIR_HOKI = 'SYAIR_HOKI',
  BANK_VALIDATOR = 'BANK_VALIDATOR',
  PASARAN_SCHEDULE = 'PASARAN_SCHEDULE',
  PRIZE_CALC = 'PRIZE_CALC',
  TOGEL_CALC = 'TOGEL_CALC',
  FOOTBALL_CALC = 'FOOTBALL_CALC',
  RESULT_VIEWER = 'RESULT_VIEWER',
  NAWALA_CHECK = 'NAWALA_CHECK',
  SHIO_REF = 'SHIO_REF',
  SETTINGS = 'SETTINGS'
}

export interface SliderConfig {
  title: string;
  image: string;
}

export interface AppSettings {
  primaryColor: string;
  bgImage: string;
  fontFamily: string;
  fontSize: string;
  tableHeaderBg: string;
  tableRowBg: string;
  tableTextColor: string;
  sliders: Record<string, SliderConfig>;
}

export interface PasaranData {
  id: string;
  name: string;
  betClose: string;
  open: string; // Jam Tutup / Result
  status: 'Open' | 'Closed';
  prize: string;
  liveDraw: string;
  link: string;
  initialDone?: boolean;
}

export interface ShioData {
  name: string;
  years: string;
  luckyNumbers: string;
  element: string;
  trait: string;
}

export interface TogelResult {
  id: string;
  market: string;
  date: string;
  number: string;
}
