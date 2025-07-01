import React from 'react';
import { Moon, Clock, Sunrise, Sunset } from 'lucide-react';
import { HabitCard } from './HabitCard';
import { SleepData } from '../types';

interface SleepTrackerProps {
  data: SleepData;
  onUpdate: (data: Partial<SleepData>) => void;
}

export const SleepTracker: React.FC<SleepTrackerProps> = ({ data, onUpdate }) => {
  const qualityColors = {
    poor: 'bg-red-100 text-red-800 border-red-200',
    fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    good: 'bg-green-100 text-green-800 border-green-200',
    excellent: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <HabitCard title="Sleep Tracking" icon={Moon}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Hours:</span>
          </div>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={data.hours || ''}
            onChange={(e) => onUpdate({ hours: parseFloat(e.target.value) || 0 })}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
          <span className="text-sm text-gray-500">hours</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Quality:</span>
          <div className="flex gap-2">
            {(['poor', 'fair', 'good', 'excellent'] as const).map((quality) => (
              <button
                key={quality}
                onClick={() => onUpdate({ quality })}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors duration-200 ${
                  data.quality === quality
                    ? qualityColors[quality]
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Sunset className="h-4 w-4 text-orange-500" />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Bedtime</label>
              <input
                type="time"
                value={data.bedtime}
                onChange={(e) => onUpdate({ bedtime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sunrise className="h-4 w-4 text-yellow-500" />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Wake up</label>
              <input
                type="time"
                value={data.wakeup}
                onChange={(e) => onUpdate({ wakeup: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {data.hours > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">Sleep Score</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ 
                      width: `${Math.min((data.hours / 8) * 100, 100)}%` 
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-blue-900">
                  {Math.round((data.hours / 8) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </HabitCard>
  );
};