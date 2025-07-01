import React from 'react';
import { PenTool, Dumbbell } from 'lucide-react';
import { HabitCard } from './HabitCard';

interface DailyNotesProps {
  notes: string;
  exercise: boolean;
  onNotesUpdate: (notes: string) => void;
  onExerciseUpdate: (exercise: boolean) => void;
}

export const DailyNotes: React.FC<DailyNotesProps> = ({
  notes,
  exercise,
  onNotesUpdate,
  onExerciseUpdate,
}) => {
  return (
    <HabitCard title="Daily Notes & Exercise" icon={PenTool}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Did you exercise today?
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onExerciseUpdate(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                exercise
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Dumbbell className="h-4 w-4" />
              Yes
            </button>
            <button
              onClick={() => onExerciseUpdate(false)}
              className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                !exercise
                  ? 'bg-gray-100 text-gray-800 border-gray-200'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Notable things that happened today
          </label>
          <textarea
            value={notes}
            onChange={(e) => onNotesUpdate(e.target.value)}
            placeholder="Any interesting events, thoughts, or experiences from today..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>
      </div>
    </HabitCard>
  );
};