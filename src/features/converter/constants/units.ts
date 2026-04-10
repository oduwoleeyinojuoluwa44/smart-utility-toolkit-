import { ConversionCategory, UnitDefinition } from '../types';

export const categoryLabels: Record<ConversionCategory, string> = {
  length: 'Length',
  temperature: 'Temperature',
  weight: 'Weight',
};

export const unitsByCategory: Record<ConversionCategory, UnitDefinition[]> = {
  length: [
    { label: 'Meters', shortLabel: 'm', value: 'meter' },
    { label: 'Kilometers', shortLabel: 'km', value: 'kilometer' },
    { label: 'Miles', shortLabel: 'mi', value: 'mile' },
    { label: 'Feet', shortLabel: 'ft', value: 'foot' },
  ],
  temperature: [
    { label: 'Celsius', shortLabel: '°C', value: 'celsius' },
    { label: 'Fahrenheit', shortLabel: '°F', value: 'fahrenheit' },
    { label: 'Kelvin', shortLabel: 'K', value: 'kelvin' },
  ],
  weight: [
    { label: 'Kilograms', shortLabel: 'kg', value: 'kilogram' },
    { label: 'Grams', shortLabel: 'g', value: 'gram' },
    { label: 'Pounds', shortLabel: 'lb', value: 'pound' },
    { label: 'Ounces', shortLabel: 'oz', value: 'ounce' },
  ],
};
