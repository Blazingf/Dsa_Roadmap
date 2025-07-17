import React from 'react';

interface StatCardProps {
  number: string | number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-blue-600">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};