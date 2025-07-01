import { HabitData } from '../types';

const STORAGE_KEY = 'habit-tracker-data';

export const saveHabitData = (data: HabitData): void => {
  try {
    const existingData = getHabitData();
    const updatedData = existingData.filter(item => item.date !== data.date);
    updatedData.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving habit data:', error);
  }
};

export const getHabitData = (): HabitData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading habit data:', error);
    return [];
  }
};

export const getTodayData = (): HabitData | null => {
  const today = new Date().toISOString().split('T')[0];
  const allData = getHabitData();
  return allData.find(item => item.date === today) || null;
};

export const getHabitStats = (): any => {
  const data = getHabitData();
  if (data.length === 0) return null;

  const stats = {
    avgSleep: data.reduce((sum, item) => sum + item.sleep.hours, 0) / data.length,
    avgCigarettes: data.reduce((sum, item) => sum + item.cigarettes, 0) / data.length,
    avgCoffees: data.reduce((sum, item) => sum + item.coffees, 0) / data.length,
    avgWater: data.reduce((sum, item) => sum + item.water, 0) / data.length,
    exerciseDays: data.filter(item => item.exercise).length,
    totalDays: data.length,
  };

  return stats;
};