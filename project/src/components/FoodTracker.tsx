import React from 'react';
import { Utensils } from 'lucide-react';
import { HabitCard } from './HabitCard';

interface FoodTrackerProps {
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
  onUpdate: (meals: { breakfast: string; lunch: string; dinner: string; snacks: string }) => void;
}

export const FoodTracker: React.FC<FoodTrackerProps> = ({ meals, onUpdate }) => {
  const updateMeal = (mealType: keyof typeof meals, value: string) => {
    onUpdate({ ...meals, [mealType]: value });
  };

  const mealTypes = [
    { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { key: 'lunch', label: 'Lunch', icon: '🌞' },
    { key: 'dinner', label: 'Dinner', icon: '🌙' },
    { key: 'snacks', label: 'Snacks', icon: '🍿' },
  ] as const;

  return (
    <HabitCard title="Food Tracker" icon={Utensils}>
      <div className="space-y-4">
        {mealTypes.map((meal) => (
          <div key={meal.key} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{meal.icon}</span>
              <label className="text-sm font-medium text-gray-700">
                {meal.label}
              </label>
            </div>
            <textarea
              value={meals[meal.key]}
              onChange={(e) => updateMeal(meal.key, e.target.value)}
              placeholder={`What did you have for ${meal.label.toLowerCase()}?`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>
        ))}
      </div>
    </HabitCard>
  );
};