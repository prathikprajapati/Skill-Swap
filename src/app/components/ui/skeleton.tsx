export function Skeleton({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{
        backgroundColor: 'var(--secondary)',
        ...style,
      }}
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div 
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar Skeleton */}
        <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />

        {/* Content Skeleton */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Name and Score */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Progress Bar */}
          <Skeleton className="h-2 w-full" />

          {/* Offered Skills */}
          <div>
            <Skeleton className="h-3 w-20 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>

          {/* Wanted Skills */}
          <div>
            <Skeleton className="h-3 w-24 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-16" />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div 
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
