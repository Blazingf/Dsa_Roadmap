import React from 'react';
import { Question } from '../types';

interface QuestionItemProps {
  question: Question;
  isCompleted: boolean;
  onToggle: () => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, isCompleted, onToggle }) => {
  return (
    <li className="py-2 border-b border-gray-200 last:border-b-0 flex justify-between items-center">
      <a 
        href={question.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-purple-600 font-medium hover:underline transition-colors"
      >
        {question.name}
      </a>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
      />
    </li>
  );
};