export type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export type BMIResult = {
  score: number;
  category: BMICategory;
  message: string;
};
