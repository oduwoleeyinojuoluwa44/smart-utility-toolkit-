import { useMemo, useState } from 'react';

import { calculateBMI } from '../utils/bmi';

export function useBMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);
  const isValid =
    height.trim().length > 0 &&
    weight.trim().length > 0 &&
    !Number.isNaN(parsedHeight) &&
    !Number.isNaN(parsedWeight) &&
    parsedHeight > 0 &&
    parsedWeight > 0;

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

    return calculateBMI(parsedHeight, parsedWeight);
  }, [isValid, parsedHeight, parsedWeight]);

  return {
    height,
    weight,
    result,
    setHeight,
    setWeight,
  };
}
