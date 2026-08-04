import { Sparkles, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';

const insights = [
  {
    title: 'Volume Spike Detected',
    text: 'Settlement volume increased by 12.4% over the last 7 days across European charging endpoints.',
    icon: TrendingUp,
    highlight: '+12.4% Growth',
  },
  {
    title: 'Peak Throughput Reached',
    text: 'Peak network traffic occurred at 14:00 UTC with 8.2k tx/min burst capacity successfully processed.',
    icon: Zap,
    highlight: '8.2k tx/min Peak',
  },
  {
    title: 'Sub-second Finality SLA',
    text: '98.4% of connected devices settled in under 500ms with zero Soroban contract execution panics.',
    icon: ShieldCheck,
    highlight: '98.4% Sub-500ms',
  },
];

export default function AutomatedInsights() {
  return (
    <Card padding="generous" className="bg-gradient-to-br from-white to-[#F8FAFC]">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0F766E]" />
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Automated Network Insights</CardTitle>
          </div>
          <Badge variant="primary" dot size="sm">
            AI Generated
          </Badge>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.title} className="p-4 rounded-2xl border border-[#E2E8F0] bg-white space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                  <Icon className="h-4 w-4 text-[#0F766E]" />
                  <span>{insight.title}</span>
                </div>
                <Badge variant="success" size="sm">
                  {insight.highlight}
                </Badge>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">{insight.text}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
