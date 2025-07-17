import React, { useState, useEffect } from 'react';
import { weeks } from './data/weeks';
import { CheckboxData, ProgressStats } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { StatCard } from './components/StatCard';
import { ProgressCard } from './components/ProgressCard';
import { Tabs } from './components/Tabs';
import { WeekSection } from './components/WeekSection';
import { BookOpen } from 'lucide-react';

function App() {
  const [activeMonth, setActiveMonth] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useLocalStorage<CheckboxData>('dsa-roadmap-checkboxes', {});
  const [stats, setStats] = useState<ProgressStats>({
    totalQuestions: 0,
    completedQuestions: 0,
    progressPercent: 0,
    currentStreak: 0
  });
  const [monthProgress, setMonthProgress] = useState([0, 0, 0]);
  const [monthTotals, setMonthTotals] = useState([0, 0, 0]);

  const completedSet = new Set(Object.keys(completedQuestions).filter(key => completedQuestions[key]));

  const calculateStats = () => {
    let totalQuestions = 0;
    let completedCount = 0;
    const monthProgress = [0, 0, 0];
    const monthTotals = [0, 0, 0];

    weeks.forEach((week, weekIndex) => {
      const monthIndex = Math.floor(weekIndex / 4);
      week.days.forEach((day, dayIndex) => {
        day.list.forEach((_, qIndex) => {
          const key = `${weekIndex}_${dayIndex}_${qIndex}`;
          totalQuestions++;
          monthTotals[monthIndex]++;
          if (completedSet.has(key)) {
            completedCount++;
            monthProgress[monthIndex]++;
          }
        });
      });
    });

    return {
      stats: {
        totalQuestions,
        completedQuestions: completedCount,
        progressPercent: totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0,
        currentStreak: 0 // Simplified for now
      },
      monthProgress,
      monthTotals
    };
  };

  useEffect(() => {
    const { stats: newStats, monthProgress: newMonthProgress, monthTotals: newMonthTotals } = calculateStats();
    setStats(newStats);
    setMonthProgress(newMonthProgress);
    setMonthTotals(newMonthTotals);
  }, [completedQuestions]);

  const handleQuestionToggle = (questionId: string) => {
    setCompletedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getWeekProgress = (weekIndex: number) => {
    const week = weeks[weekIndex];
    let total = 0;
    let completed = 0;

    week.days.forEach((day, dayIndex) => {
      day.list.forEach((_, qIndex) => {
        total++;
        if (completedSet.has(`${weekIndex}_${dayIndex}_${qIndex}`)) {
          completed++;
        }
      });
    });

    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getMonthWeeks = (month: number) => {
    const startWeek = (month - 1) * 4;
    const endWeek = startWeek + 4;
    return weeks.slice(startWeek, endWeek);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSA Job Tracker
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">Complete Data Structures & Algorithms in 3 Months</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number={stats.totalQuestions} label="Total Questions" />
            <StatCard number={stats.completedQuestions} label="Completed" />
            <StatCard number="-" label="Current Streak" />
            <StatCard number={`${stats.progressPercent}%`} label="Progress" />
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProgressCard 
            title="Month 1" 
            description="Foundations & Arrays" 
            progress={monthTotals[0] > 0 ? (monthProgress[0] / monthTotals[0]) * 100 : 0}
          />
          <ProgressCard 
            title="Month 2" 
            description="Trees & Graphs" 
            progress={monthTotals[1] > 0 ? (monthProgress[1] / monthTotals[1]) * 100 : 0}
          />
          <ProgressCard 
            title="Month 3" 
            description="Advanced Topics" 
            progress={monthTotals[2] > 0 ? (monthProgress[2] / monthTotals[2]) * 100 : 0}
          />
        </div>

        {/* Tabs */}
        <Tabs activeMonth={activeMonth} onMonthChange={setActiveMonth} />

        {/* Content */}
        <div className="space-y-6">
          {getMonthWeeks(activeMonth).map((week, index) => {
            const weekIndex = (activeMonth - 1) * 4 + index;
            return (
              <WeekSection
                key={weekIndex}
                week={week}
                weekIndex={weekIndex}
                completedQuestions={completedSet}
                onQuestionToggle={handleQuestionToggle}
                weekProgress={getWeekProgress(weekIndex)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;