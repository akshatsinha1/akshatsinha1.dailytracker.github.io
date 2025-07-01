import React from 'react';
import { Plus, Minus, DivideIcon as LucideIcon } from 'lucide-react';
import { HabitCard } from './HabitCard';

interface ConsumptionTrackerProps {
  title: string;
  icon: LucideIcon;
  value: number;
  unit: string;
  onUpdate: (value: number) => void;
  color?: string;
  max?: number;
}

export const ConsumptionTracker: React.FC<ConsumptionTrackerProps> = ({
  title,
  icon,
  value,
  unit,
  onUpdate,
  color = 'blue',
  max = 20,
}) => {
  const increment = () => onUpdate(value + 1);
  const decrement = () => onUpdate(Math.max(0, value - 1));

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const buttonColors = {
    blue: 'hover:bg-blue-50 border-blue-200',
    red: 'hover:bg-red-50 border-red-200',
    green: 'hover:bg-green-50 border-green-200',
    orange: 'hover:bg-orange-50 border-orange-200',
  };

  return (
    <HabitCard title={title} icon={icon}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={decrement}
              disabled={value === 0}
              className={`p-2 rounded-lg border transition-colors duration-200 ${
                value === 0
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : `${buttonColors[color as keyof typeof buttonColors]} text-gray-600`
              }`}
            >
              <Minus className="h-4 w-4" />
            </button>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{value}</div>
              <div className="text-sm text-gray-500">{unit}</div>
            </div>
            
            <button
              onClick={increment}
              className={`p-2 rounded-lg border transition-colors duration-200 ${buttonColors[color as keyof typeof buttonColors]} text-gray-600`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {value > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Today's Progress</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      color === 'red' ? 'bg-red-500' : 
                      color === 'green' ? 'bg-green-500' : 
                      color === 'orange' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}
                    style={{ 
                      width: `${Math.min((value / max) * 100, 100)}%` 
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {value}/{max}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </HabitCard>
  );
};