import { ConversionCategory } from '../types';

const lengthFactors: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  mile: 1609.34,
  foot: 0.3048,
};

const weightFactors: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  pound: 0.45359237,
  ounce: 0.0283495231,
};

function convertTemperature(value: number, fromUnit: string, toUnit: string) {
  let celsius = value;

  if (fromUnit === 'fahrenheit') {
    celsius = (value - 32) * (5 / 9);
  } else if (fromUnit === 'kelvin') {
    celsius = value - 273.15;
  }

  if (toUnit === 'fahrenheit') {
    return celsius * (9 / 5) + 32;
  }

  if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }

  return celsius;
}

export function convertValue(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: ConversionCategory,
) {
  if (fromUnit === toUnit) {
    return value;
  }

  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const factorMap = category === 'length' ? lengthFactors : weightFactors;
  const sourceFactor = factorMap[fromUnit];
  const targetFactor = factorMap[toUnit];

  if (!sourceFactor || !targetFactor) {
    return value;
  }

  const baseValue = value * sourceFactor;
  return baseValue / targetFactor;
}
