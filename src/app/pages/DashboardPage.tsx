import { useState, useMemo } from "react";
import { MatchCard } from "@/app/components/ui/match-card";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { MatchCardSkeleton } from "@/app/components/ui/skeleton";
import { mockMatches, currentUser } from "@/app/data/mockData";
import { Users, Target, MessageSquare, Search, SlidersHorizontal } from "lucide-react";

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [showFilters, setShowFilters] = useState(false);
  
  const progressPercentage = currentUser.profileCompletion;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let filtered = mockMatches.filter((match) => {
      const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.offeredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        match.wantedSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });

    // Sort matches
    if (sortBy === "score") {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, sortBy]);

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 
          className="text-[32px] mb-2"
          style={{ color: 'var(--text-primary)', fontWeight: 600 }}
        >
          Welcome back, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p 
          className="text-[16px]"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          Find people who complement your skills and start learning today
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Match Recommendations (8 columns) */}
        <div className="col-span-8">
          {/* Search and Filter Section */}
          <div 
            className="mb-6 p-6 rounded-xl"
            style={{ backgroundColor: 'var(--section-bg)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6" style={{ color: 'var(--primary)' }} />
              <h2 
                className="text-[24px] flex-1"
                style={{ color: 'var(--text-primary)', fontWeight: 600 }}
              >
                Recommended Matches
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg transition-colors hover:bg-[var(--card)]"
                aria-label="Toggle filters"
              >
                <SlidersHorizontal 
                  className="w-5 h-5" 
                  style={{ color: showFilters ? 'var(--accent-indigo)' : 'var(--text-secondary)' }} 
                />
              </button>
            </div>
            <p 
              className="text-[14px] mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              These users match your learning goals and can benefit from your skills
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                style={{ color: 'var(--text-secondary)' }}
              />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                }}
              />
            </div>

            {/* Filters (collapsible) */}
            {showFilters && (
              <div className="mt-4 p-4 rounded-lg animate-in slide-in-from-top-2 fade-in" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-4">
                  <span className="text-[14px]" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Sort by:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy("score")}
                      className="px-4 py-2 rounded-lg text-[13px] transition-all"
                      style={{
                        backgroundColor: sortBy === "score" ? 'var(--accent-indigo)' : 'var(--secondary)',
                        color: sortBy === "score" ? 'white' : 'var(--text-secondary)',
                        fontWeight: sortBy === "score" ? 600 : 400,
                      }}
                    >
                      Match Score
                    </button>
                    <button
                      onClick={() => setSortBy("name")}
                      className="px-4 py-2 rounded-lg text-[13px] transition-all"
                      style={{
                        backgroundColor: sortBy === "name" ? 'var(--accent-indigo)' : 'var(--secondary)',
                        color: sortBy === "name" ? 'white' : 'var(--text-secondary)',
                        fontWeight: sortBy === "name" ? 600 : 400,
                      }}
                    >
                      Name
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Matches List */}
          <div className="space-y-4">
            {isLoading ? (
              // Show skeleton loaders
              <>
                <MatchCardSkeleton />
                <MatchCardSkeleton />
                <MatchCardSkeleton />
              </>
            ) : filteredMatches.length > 0 ? (
              filteredMatches.map((match, index) => (
                <div 
                  key={match.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <MatchCard
                    user={match}
                    onSendRequest={() => console.log(`Sending request to ${match.name}`)}
                  />
                </div>
              ))
            ) : (
              <div 
                className="p-16 text-center rounded-xl"
                style={{ backgroundColor: 'var(--section-bg)' }}
              >
                <Search 
                  className="w-16 h-16 mx-auto mb-4 opacity-30" 
                  style={{ color: 'var(--text-secondary)' }} 
                />
                <p 
                  className="text-[18px] mb-2"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  No matches found
                </p>
                <p 
                  className="text-[14px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Try adjusting your search or add more skills to your profile
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar (4 columns) */}
        <div className="col-span-4 space-y-6">
          {/* Profile Completion Card */}
          <div 
            className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <h3 
                className="text-[18px]"
                style={{ color: 'var(--text-primary)', fontWeight: 600 }}
              >
                Profile Completion
              </h3>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              {/* Circular Progress */}
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

            {/* Offered Skills */}
            <div className="mb-5">
              <p 
                className="text-[12px] mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
              >
                YOU CAN TEACH ({currentUser.offeredSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {currentUser.offeredSkills.map((skill) => (
                  <SkillChip key={skill} skill={skill} type="offer" size="sm" />
                ))}
              </div>
            </div>

            {/* Wanted Skills */}
            <div>
              <p 
                className="text-[12px] mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
              >
                YOU WANT TO LEARN ({currentUser.wantedSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {currentUser.wantedSkills.map((skill) => (
                  <SkillChip key={skill} skill={skill} type="want" size="sm" />
                ))}
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
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--primary)' }} />
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
      </div>
    </div>
  );
}
