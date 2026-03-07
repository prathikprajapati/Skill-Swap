import { Target, MessageSquare } from "lucide-react";
import { SkillChip } from "@/app/components/ui/skill-chip";
import type { UserProfile } from "@/app/api/users";

interface DashboardSidebarProps {
  user: UserProfile | null;
  progressPercentage?: number;
}

export function DashboardSidebar({ user, progressPercentage = 0 }: DashboardSidebarProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const offeredSkills = (user as any)?.offeredSkills || [];
  const wantedSkills = (user as any)?.wantedSkills || [];

  return (
    <div className="space-y-6">
      {/* Profile Completion Card */}
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

      {/* Skills Summary Card */}
      <div 
        className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <h3 
          className="text-[18px] mb-4"
          style={{ color: 'var(--text-primary)', fontWeight: 600 }}
        >
          Your Skills Summary
        </h3>

        <div className="mb-5">
          <p 
            className="text-[12px] mb-2"
            style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
          >
            YOU CAN TEACH ({offeredSkills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {offeredSkills.map((skill: any) => (
              <SkillChip key={skill.id} skill={skill.name} type="offer" size="sm" />
            ))}
            {offeredSkills.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--text-disabled)' }}>No skills added yet</p>
            )}
          </div>
        </div>

        <div>
          <p 
            className="text-[12px] mb-2"
            style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
          >
            YOU WANT TO LEARN ({wantedSkills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {wantedSkills.map((skill: any) => (
              <SkillChip key={skill.id} skill={skill.name} type="want" size="sm" />
            ))}
            {wantedSkills.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--text-disabled)' }}>No skills added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
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
            style={{ backgroundColor: 'var(--primary-light)' }}
          >
            <MessageSquare className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          </div>
          <h3 
            className="text-[18px]"
            style={{ color: 'var(--text-primary)', fontWeight: 600 }}
          >
            Activity
          </h3>
        </div>

        <div className="space-y-3">
          <div 
            className="flex justify-between items-center p-3 rounded-lg transition-all hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--section-bg)' }}
          >
            <span style={{ color: 'var(--text-secondary)' }} className="text-[14px]">
              Active Matches
            </span>
            <span 
              className="text-[20px]"
              style={{ color: 'var(--accent)', fontWeight: 600 }}
            >
              2
            </span>
          </div>
          
          <div 
            className="flex justify-between items-center p-3 rounded-lg transition-all hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--section-bg)' }}
          >
            <span style={{ color: 'var(--text-secondary)' }} className="text-[14px]">
              Pending Requests
            </span>
            <span 
              className="text-[20px]"
              style={{ color: 'var(--warning)', fontWeight: 600 }}
            >
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

