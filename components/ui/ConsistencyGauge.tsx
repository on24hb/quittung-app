import React from 'react';

interface GaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function ConsistencyGauge({ score, size = 64, strokeWidth = 5 }: GaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  // Farben je nach Score: Grün (>75), Gelb (>50), Rot (Rest)
  const color = score > 75 ? '#059669' : score > 50 ? '#d97706' : '#e11d48';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Hintergrund-Kreis (Grau) */}
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Füll-Kreis (Farbig) */}
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Prozentzahl in der Mitte */}
      <span className="absolute text-xs font-bold text-slate-700">
        {score}%
      </span>
    </div>
  );
}