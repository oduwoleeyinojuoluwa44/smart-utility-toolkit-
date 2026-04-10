import React from 'react';

import { AppHeader } from '../../../shared/components/AppHeader';
import { Screen } from '../../../shared/components/Screen';
import { BMICategoryCard } from '../components/BMICategoryCard';
import { BMIForm } from '../components/BMIForm';
import { BMIResultCard } from '../components/BMIResultCard';
import { useBMI } from '../hooks/useBMI';

export function BMIScreen() {
  const { height, weight, result, setHeight, setWeight } = useBMI();

  return (
    <Screen>
      <AppHeader
        title="BMI Calculator"
        subtitle="Estimate your body mass index instantly and understand which range your current metrics fall into."
      />

      <BMIResultCard result={result} />
      <BMIForm height={height} weight={weight} onChangeHeight={setHeight} onChangeWeight={setWeight} />
      <BMICategoryCard />
    </Screen>
  );
}
