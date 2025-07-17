import React from 'react';

interface ProgressCardProps {
  title: string;
  description: string;
  progress: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ title, description, progress }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-blue-100 mb-4">{description}</p>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-300 to-cyan-200 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};