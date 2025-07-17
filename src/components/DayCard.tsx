import React from 'react';
import { Day } from '../types';
import { DifficultyBadge } from './DifficultyBadge';
import { QuestionItem } from './QuestionItem';

interface DayCardProps {
  day: Day;
  dayIndex: number;
  weekIndex: number;
  completedQuestions: Set<string>;
  onQuestionToggle: (questionId: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ 
  day, 
  dayIndex, 
  weekIndex, 
  completedQuestions, 
  onQuestionToggle 
}) => {
  const allCompleted = day.list.every((_, qIndex) => 
    completedQuestions.has(`${weekIndex}_${dayIndex}_${qIndex}`)
  );

  return (
    <div className={`bg-gradient-to-br ${allCompleted ? 'from-green-50 to-green-100 border-green-300' : 'from-gray-50 to-gray-100 border-transparent'} border-2 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-blue-400`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Day {dayIndex + 1}</h3>
        <DifficultyBadge difficulty={day.badge} />
      </div>
      <ul className="space-y-1">
        {day.list.map((question, qIndex) => (
          <QuestionItem
            key={qIndex}
            question={question}
            isCompleted={completedQuestions.has(`${weekIndex}_${dayIndex}_${qIndex}`)}
            onToggle={() => onQuestionToggle(`${weekIndex}_${dayIndex}_${qIndex}`)}
          />
        ))}
      </ul>
    </div>
  );
};