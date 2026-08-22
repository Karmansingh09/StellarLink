import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { TrendingUp } from 'lucide-react';
import useAnalytics from '../../hooks/useAnalytics';

export default function SettlementTrendsChart({ metrics: metricsProp }) {
  const { data: metricsFromHook, isLoading } = useAnalytics();
  const metrics = metricsProp || metricsFromHook;
  const chartData = metrics?.settlementTrends || [];
  const hasData = chartData.length > 0 && chartData.some((d) => d.volume > 0);

  const formatYTick = (val) => {
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val;
  };

  return (
    <Card padding="generous" className="h-full min-w-0">
      <CardHeader className="mb-2">
        <CardTitle className="text-base font-semibold text-[#0F172A]">Settlement Volume Trends</CardTitle>
        <CardDescription className="text-xs">Weekly aggregated volume (XLM)</CardDescription>
      </CardHeader>
      <div className="h-56 sm:h-64 w-full pt-2">
        {isLoading && !metrics ? (
          <div className="flex h-full items-center justify-center text-xs text-[#64748B]">
            Loading settlement trends...
          </div>
        ) : !hasData ? (
          <EmptyState
            icon={TrendingUp}
            title="No Settlement Volume Data"
            description="No settlement trends recorded on Stellar Testnet for the active window."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="settlementTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={formatYTick} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                formatter={(val) => [`${typeof val === 'number' ? val.toLocaleString() : val} XLM`, 'Settlement Volume']}
              />
              <Area type="monotone" dataKey="volume" stroke="#0F766E" strokeWidth={2.5} fillOpacity={1} fill="url(#settlementTrendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
