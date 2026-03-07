"use client";

import { MessageSquare } from "lucide-react";

interface ActivityCardProps {
  activeMatches?: number;
  pendingRequests?: number;
}

export function ActivityCard({ 
  activeMatches = 0, 
  pendingRequests = 0 
}: ActivityCardProps) {
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
            {activeMatches}
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
            {pendingRequests}
          </span>
        </div>
      </div>
    </div>
  );
}

