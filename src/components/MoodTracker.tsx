import React from 'react';
import { Smile } from 'lucide-react';
import { HabitCard } from './HabitCard';

interface MoodTrackerProps {
  mood: 'terrible' | 'poor' | 'neutral' | 'good' | 'excellent';
  onUpdate: (mood: 'terrible' | 'poor' | 'neutral' | 'good' | 'excellent') => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ mood, onUpdate }) => {
  const moods = [
    { value: 'terrible', emoji: '😢', label: 'Terrible', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'poor', emoji: '😔', label: 'Poor', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { value: 'good', emoji: '😊', label: 'Good', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'excellent', emoji: '😄', label: 'Excellent', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  ] as const;

  return (
    <HabitCard title="Mood Tracker" icon={Smile}>
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-3">
          How are you feeling today?
        </div>
        <div className="grid grid-cols-5 gap-2">
          {moods.map((moodOption) => (
            <button
              key={moodOption.value}
              onClick={() => onUpdate(moodOption.value)}
              className={`p-3 rounded-lg border transition-colors duration-200 flex flex-col items-center gap-1 ${
                mood === moodOption.value
                  ? moodOption.color
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{moodOption.emoji}</span>
              <span className="text-xs font-medium">{moodOption.label}</span>
            </button>
          ))}
        </div>
      </div>
    </HabitCard>
  );
};