import React from 'react';
import { TrendingUp, Calendar, Award } from 'lucide-react';
import { HabitCard } from './HabitCard';

interface StatsCardProps {
  stats: {
    avgSleep: number;
    avgCigarettes: number;
    avgCoffees: number;
    avgWater: number;
    exerciseDays: number;
    totalDays: number;
  } | null;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  if (!stats || stats.totalDays === 0) {
    return (
      <HabitCard title="Statistics" icon={TrendingUp}>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No data yet. Start tracking your habits to see statistics!</p>
        </div>
      </HabitCard>
    );
  }

  const exercisePercentage = (stats.exerciseDays / stats.totalDays) * 100;

  return (
    <HabitCard title="Statistics" icon={TrendingUp}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stats.avgSleep.toFixed(1)}h
            </div>
            <div className="text-sm text-blue-800">Avg Sleep</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {stats.avgWater.toFixed(0)}
            </div>
            <div className="text-sm text-green-800">Avg Water</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {stats.avgCigarettes.toFixed(1)}
            </div>
            <div className="text-sm text-red-800">Avg Cigarettes</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {stats.avgCoffees.toFixed(1)}
            </div>
            <div className="text-sm text-orange-800">Avg Coffees</div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Exercise Streak</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              {exercisePercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${exercisePercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.exerciseDays} out of {stats.totalDays} days
          </div>
        </div>
      </div>
    </HabitCard>
  );
};