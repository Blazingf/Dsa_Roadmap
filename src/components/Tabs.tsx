import React from 'react';

interface TabsProps {
  activeMonth: number;
  onMonthChange: (month: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeMonth, onMonthChange }) => {
  const tabs = [
    { id: 1, title: 'Month 1: Foundations' },
    { id: 2, title: 'Month 2: Intermediate' },
    { id: 3, title: 'Month 3: Advanced' }
  ];

  return (
    <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onMonthChange(tab.id)}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
            activeMonth === tab.id
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/80 hover:bg-white/10'
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};