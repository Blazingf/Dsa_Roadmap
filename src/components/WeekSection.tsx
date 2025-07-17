import React from 'react';
import { Week } from '../types';
import { DayCard } from './DayCard';

interface WeekSectionProps {
  week: Week;
  weekIndex: number;
  completedQuestions: Set<string>;
  onQuestionToggle: (questionId: string) => void;
  weekProgress: number;
}

export const WeekSection: React.FC<WeekSectionProps> = ({ 
  week, 
  weekIndex, 
  completedQuestions, 
  onQuestionToggle, 
  weekProgress 
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">{week.title}</h2>
        <div className="bg-gray-200 rounded-full h-2 w-48 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${weekProgress}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {week.days.map((day, dayIndex) => (
          <DayCard
            key={dayIndex}
            day={day}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
            completedQuestions={completedQuestions}
            onQuestionToggle={onQuestionToggle}
          />
        ))}
      </div>
    </div>
  );
};