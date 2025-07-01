import React from 'react';
import { Calendar, BarChart3 } from 'lucide-react';
import { useHabits } from './hooks/useHabits';
import { SleepTracker } from './components/SleepTracker';
import { ConsumptionTracker } from './components/ConsumptionTracker';
import { MoodTracker } from './components/MoodTracker';
import { FoodTracker } from './components/FoodTracker';
import { DailyNotes } from './components/DailyNotes';
import { StatsCard } from './components/StatsCard';
import { Coffee, Cigarette, Droplets } from 'lucide-react';

function App() {
  const { todayData, stats, isLoading, updateHabit } = useHabits();

  if (isLoading || !todayData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your habits...</p>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Daily Habits</h1>
          </div>
          <p className="text-lg text-gray-600">{today}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Sleep Tracker */}
          <div className="xl:col-span-2">
            <SleepTracker
              data={todayData.sleep}
              onUpdate={(sleepData) => updateHabit({ sleep: { ...todayData.sleep, ...sleepData } })}
            />
          </div>

          {/* Mood Tracker */}
          <div>
            <MoodTracker
              mood={todayData.mood}
              onUpdate={(mood) => updateHabit({ mood })}
            />
          </div>

          {/* Consumption Trackers */}
          <div>
            <ConsumptionTracker
              title="Cigarettes"
              icon={Cigarette}
              value={todayData.cigarettes}
              unit="cigarettes"
              onUpdate={(cigarettes) => updateHabit({ cigarettes })}
              color="red"
              max={20}
            />
          </div>

          <div>
            <ConsumptionTracker
              title="Coffee"
              icon={Coffee}
              value={todayData.coffees}
              unit="cups"
              onUpdate={(coffees) => updateHabit({ coffees })}
              color="orange"
              max={10}
            />
          </div>

          <div>
            <ConsumptionTracker
              title="Water"
              icon={Droplets}
              value={todayData.water}
              unit="glasses"
              onUpdate={(water) => updateHabit({ water })}
              color="blue"
              max={12}
            />
          </div>

          {/* Food Tracker */}
          <div className="xl:col-span-2">
            <FoodTracker
              meals={todayData.meals}
              onUpdate={(meals) => updateHabit({ meals })}
            />
          </div>

          {/* Daily Notes */}
          <div className="xl:col-span-2">
            <DailyNotes
              notes={todayData.notes}
              exercise={todayData.exercise}
              onNotesUpdate={(notes) => updateHabit({ notes })}
              onExerciseUpdate={(exercise) => updateHabit({ exercise })}
            />
          </div>

          {/* Statistics */}
          <div>
            <StatsCard stats={stats} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">Track your daily habits and build healthier routines</p>
        </div>
      </div>
    </div>
  );
}

export default App;