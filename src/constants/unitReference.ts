export interface UnitRule {
  left: string; // e.g., '1 km'
  right: string; // e.g., '1000 m'
}

export interface UnitCategory {
  title: string; // Translation key
  icon: string; // Emoji or Icon component
  rules: UnitRule[];
}

export const UNIT_REFERENCE_DATA: UnitCategory[] = [
  {
    title: 'units.length',
    icon: '📏',
    rules: [
      { left: '1 km', right: '1000 m' },
      { left: '1 m', right: '100 cm' },
      { left: '1 dm', right: '10 cm' },
      { left: '1 cm', right: '10 mm' },
    ],
  },
  {
    title: 'units.mass',
    icon: '⚖️',
    rules: [
      { left: '1 t', right: '1000 kg' },
      { left: '1 q', right: '100 kg' },
      { left: '1 kg', right: '1000 g' },
    ],
  },
  {
    title: 'units.volume',
    icon: '💧',
    rules: [
      { left: '1 L', right: '1000 mL' },
    ],
  },
  {
    title: 'units.time',
    icon: '⏰',
    rules: [
      { left: '1 h', right: '60 min' },
      { left: '1 min', right: '60 s' },
      { left: '1 d', right: '24 h' },
    ],
  },
];
