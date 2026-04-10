import { useMemo, useState } from 'react';

import { categoryLabels, unitsByCategory } from '../constants/units';
import { ConversionCategory } from '../types';
import { convertValue } from '../utils/convert';

export function useConversionForm() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(unitsByCategory.length[0].value);
  const [toUnit, setToUnit] = useState(unitsByCategory.length[1].value);

  const units = unitsByCategory[category];
  const parsedValue = Number(inputValue);
  const hasValidValue = inputValue.trim().length > 0 && !Number.isNaN(parsedValue);

  const result = useMemo(() => {
    if (!hasValidValue) {
      return null;
    }

    return convertValue(parsedValue, fromUnit, toUnit, category);
  }, [category, fromUnit, hasValidValue, parsedValue, toUnit]);

  const changeCategory = (nextCategory: ConversionCategory) => {
    setCategory(nextCategory);
    const nextUnits = unitsByCategory[nextCategory];
    setFromUnit(nextUnits[0].value);
    setToUnit(nextUnits[1].value);
  };

  return {
    category,
    categoryLabels,
    units,
    inputValue,
    fromUnit,
    toUnit,
    result,
    hasValidValue,
    setInputValue,
    setFromUnit,
    setToUnit,
    changeCategory,
  };
}
