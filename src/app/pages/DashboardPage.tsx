import { useState, useMemo, useEffect, useRef } from "react";
import { MatchCard } from "@/app/components/ui/match-card";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { MatchCardSkeleton } from "@/app/components/ui/skeleton";
import { mockMatches, currentUser } from "@/app/data/mockData";
import { Users, Target, MessageSquare, Search, SlidersHorizontal, ChevronDown, Sparkles, Filter } from "lucide-react";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [showFilters, setShowFilters] = useState(false);
  const [displayedMatches, setDisplayedMatches] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilterChips, setActiveFilterChips] = useState<string[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const progressPercentage = currentUser.profileCompletion;

  // Filter chips for skill-based filtering
  const filterChips = ["Teaching", "Learning", "High Match", "New"];

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let filtered = mockMatches.filter((match) => {
      const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.offeredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        match.wantedSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });

    // Apply filter chips
    if (activeFilterChips.includes("High Match")) {
      filtered = filtered.filter(m => m.matchScore >= 85);
    }
    if (activeFilterChips.includes("New")) {
      filtered = filtered.filter(m => m.matchScore >= 90);
    }

    // Sort matches
    if (sortBy === "score") {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, sortBy, activeFilterChips]);

  const toggleFilterChip = (chip: string) => {
    setActiveFilterChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  // Infinite scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && displayedMatches < filteredMatches.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setDisplayedMatches(prev => Math.min(prev + 6, filteredMatches.length));
            setLoadingMore(false);
          }, 1000);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayedMatches, filteredMatches.length, loadingMore]);

  // Reset displayed matches when filters change
  useEffect(() => {
    setDisplayedMatches(6);
  }, [searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h1 
          className="text-3xl md:text-4xl mb-3 tracking-tight"
          style={{ color: 'var(--text-primary)', fontWeight: 700 }}
        >
          Welcome back, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p 
          className="text-base md:text-lg"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          Find people who complement your skills and start learning today
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column - Match Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search and Filter Section */}
          <div 
            className="p-6 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--section-bg)',
              borderColor: '#2D2D2D',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="p-2 rounded-xl"
                style={{ backgroundColor: 'var(--primary-light)' }}
              >
                <Users className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <h2 
                className="text-xl md:text-2xl flex-1"
                style={{ color: '#E0E0E0', fontWeight: 600 }}
              >
                Recommended Matches
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: showFilters ? 'var(--accent-indigo)' : 'var(--card)',
                  color: showFilters ? 'white' : 'var(--text-secondary)',
                }}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
            <p 
              className="text-sm md:text-base mb-4"
              style={{ color: '#BDBDBD', lineHeight: 1.6 }}
            >
              These users match your learning goals and can benefit from your skills
            </p>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" 
                style={{ color: 'var(--text-secondary)' }}
              />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 focus:outline-none"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: '#2D2D2D',
                  color: '#E0E0E0',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-indigo)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-light)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#2D2D2D';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Filter className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              {filterChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => toggleFilterChip(chip)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: activeFilterChips.includes(chip) ? 'var(--accent-indigo)' : 'var(--secondary)',
                    color: activeFilterChips.includes(chip) ? 'white' : '#BDBDBD',
                    border: '1px solid #2D2D2D',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Filters (collapsible) */}
            {showFilters && (
              <div 
                className="mt-4 p-4 rounded-xl border animate-in slide-in-from-top-2 fade-in duration-300" 
                style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: '#2D2D2D',
                }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold" style={{ color: '#BDBDBD' }}>
                    Sort by:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy("score")}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                      style={{
                        backgroundColor: sortBy === "score" ? 'var(--accent-indigo)' : 'var(--secondary)',
                        color: sortBy === "score" ? 'white' : '#BDBDBD',
                      }}
                    >
                      Match Score
                    </button>
                    <button
                      onClick={() => setSortBy("name")}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                      style={{
                        backgroundColor: sortBy === "name" ? 'var(--accent-indigo)' : 'var(--secondary)',
                        color: sortBy === "name" ? 'white' : '#BDBDBD',
                      }}
                    >
                      Name
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Matches Grid - Card Layout with Infinite Scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeleton loaders
              <>
                <MatchCardSkeleton />
                <MatchCardSkeleton />
                <MatchCardSkeleton />
                <MatchCardSkeleton />
                <MatchCardSkeleton />
                <MatchCardSkeleton />
              </>
            ) : filteredMatches.length > 0 ? (
              <>
                {filteredMatches.slice(0, displayedMatches).map((match, index) => (
                  <div
                    key={match.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
                  >
                    <MatchCard
                      user={match}
                      onSendRequest={() => console.log(`Sending request to ${match.name}`)}
                      isNewMatch={match.matchScore >= 90}
                    />
                  </div>
                ))}

                {/* Infinite Scroll Trigger */}
                {displayedMatches < filteredMatches.length && (
                  <div ref={loadMoreRef} className="col-span-full flex justify-center py-8">
                    {loadingMore ? (
                      <div 
                        className="flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{ backgroundColor: 'var(--section-bg)' }}
                      >
                        <div 
                          className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent"
                          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          Loading more matches...
                        </span>
                      </div>
                    ) : (
                      <div 
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:shadow-md"
                        style={{ 
                          backgroundColor: 'var(--card)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                        Scroll for more
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div
                className="col-span-full p-12 md:p-16 text-center rounded-2xl border"
                style={{ 
                  backgroundColor: 'var(--section-bg)',
                  borderColor: '#2D2D2D',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <Search className="w-10 h-10" style={{ color: 'var(--text-disabled)' }} />
                </div>
                <p
                  className="text-lg md:text-xl mb-2"
                  style={{ color: '#E0E0E0', fontWeight: 600 }}
                >
                  No matches found
                </p>
                <p
                  className="text-sm md:text-base max-w-md mx-auto"
                  style={{ color: '#BDBDBD' }}
                >
                  Try adjusting your search or add more skills to your profile
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Completion Card */}
          <SpotlightCard 
            className="h-[260px] w-full flex flex-col p-5 transition-all duration-300 hover:shadow-lg"
            spotlightColor="rgba(245, 158, 11, 0.15)"
          >
            <div className="flex items-center gap-2.5 mb-4 shrink-0">
              <div 
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: 'var(--accent-light)' }}
              >
                <Target className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 
                className="text-sm font-semibold"
                style={{ color: '#E0E0E0' }}
              >
                Profile Completion
              </h3>
            </div>
            
            {/* Divider */}
            <div 
              className="w-full h-px mb-4 shrink-0"
              style={{ backgroundColor: '#2D2D2D' }}
            />
            
            <div className="flex-1 flex items-center justify-center min-h-0">
              {/* Circular Progress */}
              <div className="relative w-24 h-24">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="var(--secondary)"
                    strokeWidth="5"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="var(--accent)"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 - (progressPercentage / 100) * 2 * Math.PI * 40}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-xl font-bold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {progressPercentage}%
                  </span>
                </div>
              </div>
            </div>
            
            <p 
              className="text-xs text-center leading-relaxed mt-auto shrink-0"
              style={{ color: '#BDBDBD' }}
            >
              Add more skills for better matches 🎯
            </p>
          </SpotlightCard>

          {/* Skills Summary Card */}
          <SpotlightCard
            className="h-[300px] w-full flex flex-col p-5 transition-all duration-300 hover:shadow-lg cursor-pointer group"
            spotlightColor="rgba(99, 102, 241, 0.15)"
          >
            <h3 
              className="text-sm font-semibold mb-3 shrink-0"
              style={{ color: '#E0E0E0' }}
            >
              Your Skills Summary
            </h3>

            {/* Divider */}
            <div 
              className="w-full h-px mb-3 shrink-0"
              style={{ backgroundColor: '#2D2D2D' }}
            />

            <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
              {/* Offered Skills */}
              <div className="shrink-0">
                <p 
                  className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#BDBDBD' }}
                >
                  Can Teach ({currentUser.offeredSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.offeredSkills.slice(0, 4).map((skill) => (
                    <SkillChip key={skill} skill={skill} type="offer" size="sm" />
                  ))}
                  {currentUser.offeredSkills.length > 4 && (
                    <span 
                      className="text-[10px] px-2 py-1 rounded-full font-medium"
                      style={{ 
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      +{currentUser.offeredSkills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Divider between sections */}
              <div 
                className="w-full h-px shrink-0"
                style={{ backgroundColor: '#2D2D2D', opacity: 0.5 }}
              />

              {/* Wanted Skills */}
              <div className="shrink-0">
                <p 
                  className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#BDBDBD' }}
                >
                  Want to Learn ({currentUser.wantedSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.wantedSkills.slice(0, 4).map((skill) => (
                    <SkillChip key={skill} skill={skill} type="want" size="sm" />
                  ))}
                  {currentUser.wantedSkills.length > 4 && (
                    <span 
                      className="text-[10px] px-2 py-1 rounded-full font-medium"
                      style={{ 
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      +{currentUser.wantedSkills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Quick Stats Card */}
          <SpotlightCard 
            className="h-[220px] w-full flex flex-col p-5 transition-all duration-300 hover:shadow-lg"
            spotlightColor="rgba(16, 185, 129, 0.15)"
          >
            <div className="flex items-center gap-2.5 mb-4 shrink-0">
              <div 
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: 'var(--primary-light)' }}
              >
                <MessageSquare className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 
                className="text-sm font-semibold"
                style={{ color: '#E0E0E0' }}
              >
                Activity
              </h3>
            </div>

            {/* Divider */}
            <div 
              className="w-full h-px mb-4 shrink-0"
              style={{ backgroundColor: '#2D2D2D' }}
            />

            <div className="flex-1 flex flex-col gap-2.5 min-h-0">
              <div
                className="flex justify-between items-center px-3 py-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--section-bg)',
                  border: '1px solid #2D2D2D',
                }}
              >
                <span className="text-xs font-medium" style={{ color: '#BDBDBD' }}>
                  Active Matches
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  2
                </span>
              </div>

              <div
                className="flex justify-between items-center px-3 py-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--section-bg)',
                  border: '1px solid #2D2D2D',
                }}
              >
                <span className="text-xs font-medium" style={{ color: '#BDBDBD' }}>
                  Pending Requests
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: 'var(--warning)' }}
                >
                  3
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
