import Card from '../ui/Card';

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-[14px] bg-[#E2E8F0] ${className}`} />;
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} padding="generous">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="mt-4 h-10 w-24" />
            <SkeletonBlock className="mt-6 h-8 w-full" />
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card padding="generous">
          <SkeletonBlock className="h-4 w-44" />
          <SkeletonBlock className="mt-5 h-72 w-full" />
        </Card>
        <Card padding="generous">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="mt-5 h-72 w-full" />
        </Card>
      </div>

      <Card padding="generous">
        <SkeletonBlock className="h-4 w-52" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-14 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}