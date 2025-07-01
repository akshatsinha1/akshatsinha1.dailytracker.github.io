import { useState, useEffect } from 'react';
import { HabitData, HabitStats } from '../types';
import { saveHabitData, getTodayData, getHabitStats } from '../utils/storage';

export const useHabits = () => {
  const [todayData, setTodayData] = useState<HabitData | null>(null);
  const [stats, setStats] = useState<HabitStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeData = (): HabitData => {
    const today = new Date().toISOString().split('T')[0];
    return {
      id: `habit-${today}`,
      date: today,
      sleep: {
        hours: 0,
        quality: 'fair',
        bedtime: '',
        wakeup: '',
      },
      cigarettes: 0,
      coffees: 0,
      meals: {
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: '',
      },
      notes: '',
      water: 0,
      exercise: false,
      mood: 'neutral',
    };
  };

  useEffect(() => {
    const loadData = () => {
      const existing = getTodayData();
      setTodayData(existing || initializeData());
      setStats(getHabitStats());
      setIsLoading(false);
    };

    loadData();
  }, []);

  const updateHabit = (updates: Partial<HabitData>) => {
    if (!todayData) return;

    const updatedData = { ...todayData, ...updates };
    setTodayData(updatedData);
    saveHabitData(updatedData);
    setStats(getHabitStats());
  };

  return {
    todayData,
    stats,
    isLoading,
    updateHabit,
  };
};