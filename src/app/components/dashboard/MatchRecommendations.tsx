"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MatchCard } from "@/app/components/ui/match-card";
import { MatchCardSkeleton } from "@/app/components/ui/skeleton";
import { Search, SlidersHorizontal, ChevronDown, Filter } from "lucide-react";
import { matchesApi, type RecommendedMatch } from "@/app/api/matches";
import { useQuery } from "@tanstack/react-query";

interface MatchRecommendationsProps {
  userId?: string;
}

const filterChips = ["Teaching", "Learning", "High Match", "New"];

export function MatchRecommendations({ userId }: MatchRecommendationsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [showFilters, setShowFilters] = useState(false);
  const [displayedMatches, setDisplayedMatches] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilterChips, setActiveFilterChips] = useState<string[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Use React Query for data fetching
  const { data: matches = [], isLoading, error } = useQuery<RecommendedMatch[]>({
    queryKey: ['recommendedMatches'],
    queryFn: () => matchesApi.getRecommended(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let filtered = matches.filter((match) => {
      const matchesSearch = 
        match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  }, [matches, searchQuery, sortBy, activeFilterChips]);

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
    <div className="col-span-12 lg:col-span-8">
      {/* Search and Filter Section */}
      <div 
        className="mb-6 p-6 rounded-xl"
        style={{ backgroundColor: 'var(--card)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="p-2 rounded-xl"
            style={{ backgroundColor: 'var(--primary-light)' }}
          >
            <Search className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          </div>
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
            style={{
              backgroundColor: showFilters ? 'var(--accent-indigo)' : 'transparent',
              color: showFilters ? 'white' : 'var(--text-secondary)',
            }}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
        <p 
          className="text-[14px] mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          These users match your learning goals and can benefit from your skills
        </p>

        {/* Search Bar */}
        <div className="relative mb-4">
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
                color: activeFilterChips.includes(chip) ? 'white' : 'var(--text-secondary)',
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Filters (collapsible) */}
        {showFilters && (
          <div 
            className="mt-4 p-4 rounded-lg animate-in slide-in-from-top-2 fade-in" 
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="flex flex-wrap items-center gap-3">
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
      
      {/* Matches Grid - Card Layout with Infinite Scroll */}
      <div className="space-y-4">
        {isLoading ? (
          <>
            <MatchCardSkeleton />
            <MatchCardSkeleton />
            <MatchCardSkeleton />
          </>
        ) : error ? (
          <div 
            className="p-16 text-center rounded-xl"
            style={{ backgroundColor: 'var(--section-bg)' }}
          >
            <p 
              className="text-[18px] mb-2"
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
              Failed to load matches
            </p>
            <p 
              className="text-[14px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Please try again later
            </p>
          </div>
        ) : filteredMatches.length > 0 ? (
          <>
            {filteredMatches.slice(0, displayedMatches).map((match, index) => (
              <div
                key={match.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
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
              <div ref={loadMoreRef} className="flex justify-center py-8">
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
  );
}

