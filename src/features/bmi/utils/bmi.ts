import { BMIResult } from '../types';

export function calculateBMI(heightCm: number, weightKg: number): BMIResult {
  const heightInMeters = heightCm / 100;
  const score = weightKg / (heightInMeters * heightInMeters);
  const roundedScore = Number(score.toFixed(1));

  if (roundedScore < 18.5) {
    return {
      score: roundedScore,
      category: 'Underweight',
      message: 'A gentle weight gain plan and nourishing meals may help you move into a healthier range.',
    };
  }

  if (roundedScore < 25) {
    return {
      score: roundedScore,
      category: 'Normal',
      message: 'Your BMI is within the standard healthy range. Keep up consistent habits and daily movement.',
    };
  }

  if (roundedScore < 30) {
    return {
      score: roundedScore,
      category: 'Overweight',
      message: 'A few steady lifestyle adjustments can help lower long-term risk and improve overall balance.',
    };
  }

  return {
    score: roundedScore,
    category: 'Obese',
    message: 'This result suggests a higher health risk. A structured plan with medical guidance may be helpful.',
  };
}
