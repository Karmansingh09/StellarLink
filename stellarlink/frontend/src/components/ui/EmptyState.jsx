import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No records found',
  description = 'There is no data available matching your query or filter criteria.',
  icon: Icon = Inbox,
  actionText = 'Reset Filters',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border border-[#E2E8F0] rounded-2xl bg-white space-y-4">
      <div className="h-16 w-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E]">
        <Icon className="h-8 w-8" />
      </div>
      <div className="max-w-md space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{description}</p>
      </div>
      {onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
