import React from 'react';

interface GaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function ConsistencyGauge({ score, size = 80, strokeWidth = 6 }: GaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 70) return '#10b981'; // Emerald
    if (s >= 40) return '#f59e0b'; // Amber
    return '#dc2626'; // Crimson
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold text-slate-800">{score}%</span>
      </div>
    </div>
  );
}