import React from 'react';
import ConsistencyGauge from './ConsistencyGauge';

interface MeterProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function ConsistencyMeter({ score, size = 64, strokeWidth = 5 }: MeterProps) {
  return <ConsistencyGauge score={score} size={size} strokeWidth={strokeWidth} />;
}