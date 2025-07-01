export interface SleepData {
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  bedtime: string;
  wakeup: string;
}

export interface HabitData {
  id: string;
  date: string;
  sleep: SleepData;
  cigarettes: number;
  coffees: number;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
  notes: string;
  water: number;
  exercise: boolean;
  mood: 'terrible' | 'poor' | 'neutral' | 'good' | 'excellent';
}

export interface HabitStats {
  avgSleep: number;
  avgCigarettes: number;
  avgCoffees: number;
  avgWater: number;
  exerciseDays: number;
  totalDays: number;
}