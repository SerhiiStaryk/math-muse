export type UnitCategory = 'length' | 'weight' | 'volume' | 'currency';

export interface Unit {
  key: string;      // ключ перекладу, напр. 'g', 'kg'
  label: string;    // відображення (в конфігу, потім переклад)
  factor: number;   // відносна вага, 1 (base)
}

// Правила конвертації:
// fromUnit -> toUnit -> factor (toUnit * factor = fromUnit)
// Наприклад: 1 km = 1000 * 1 m OR 1 km = 1000 m.
// Простіше: 1 km (from) = 1000 m (to).

export interface Conversion {
  category: UnitCategory;
  from: string; // key
  to: string;   // key
  factor: number; // 1 from = factor to
  isBase?: boolean; // якщо це "стандартна" конверсія (напр. км -> м)
}

export const CONVERSIONS: Conversion[] = [
  // Довжина (Length)
  { category: 'length', from: 'km', to: 'm', factor: 1000 },
  { category: 'length', from: 'm', to: 'cm', factor: 100 },
  { category: 'length', from: 'm', to: 'mm', factor: 1000 },
  { category: 'length', from: 'cm', to: 'mm', factor: 10 },
  { category: 'length', from: 'dm', to: 'cm', factor: 10 },

  // Вага (Weight)
  { category: 'weight', from: 't', to: 'kg', factor: 1000 },
  { category: 'weight', from: 'q', to: 'kg', factor: 100 }, // центнер (quintal)
  { category: 'weight', from: 'kg', to: 'g', factor: 1000 },

  // Об'єм (Volume)
  { category: 'volume', from: 'l', to: 'ml', factor: 1000 },
];
