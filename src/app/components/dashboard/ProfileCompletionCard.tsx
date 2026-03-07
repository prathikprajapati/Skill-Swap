"use client";

import { Target } from "lucide-react";

interface ProfileCompletionCardProps {
  progressPercentage: number;
}

export function ProfileCompletionCard({ progressPercentage }: ProfileCompletionCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div 
      className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="p-1.5 rounded-lg"
          style={{ backgroundColor: 'var(--accent-light)' }}
        >
          <Target className="w-4 h-4" style={{ color: 'var(--accent)' }} />
        </div>
        <h3 
          className="text-[18px]"
          style={{ color: 'var(--text-primary)', fontWeight: 600 }}
        >
          Profile Completion
        </h3>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="var(--secondary)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="var(--accent)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-[28px]"
              style={{ color: 'var(--accent)', fontWeight: 600 }}
            >
              {progressPercentage}%
            </span>
          </div>
        </div>
      </div>
      
      <p 
        className="text-[14px] text-center"
        style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
      >
        Add more skills to get better match recommendations 🎯
      </p>
    </div>
  );
}

