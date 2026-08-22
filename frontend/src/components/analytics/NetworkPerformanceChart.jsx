import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { Activity } from 'lucide-react';
import useAnalytics from '../../hooks/useAnalytics';

export default function NetworkPerformanceChart({ metrics: metricsProp }) {
  const { data: metricsFromHook, isLoading } = useAnalytics();
  const metrics = metricsProp || metricsFromHook;
  const chartData = metrics?.performance || [];

  const hasData = chartData.length > 0 && chartData.some((d) => (d.txCount || 0) > 0);

  const formatYTick = (val) => {
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val;
  };

  return (
    <Card padding="generous" className="min-w-0">
      <CardHeader className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Network Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Daily transaction count calculated directly from Stellar Testnet Horizon RPC
            </CardDescription>
          </div>
          <Badge variant="primary" dot size="sm" className="w-fit">
            Horizon RPC Live
          </Badge>
        </div>
      </CardHeader>

      <div className="h-64 sm:h-72 w-full pt-2">
        {isLoading && !metrics ? (
          <div className="flex h-full items-center justify-center text-xs text-[#64748B]">
            Loading network telemetry...
          </div>
        ) : !hasData ? (
          <EmptyState
            icon={Activity}
            title="No Network Performance Data"
            description="No transaction telemetry recorded on Stellar Testnet for the active window."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tpsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={formatYTick} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                formatter={(value) => [`${typeof value === 'number' ? value.toLocaleString() : value} tx`, 'Transactions']}
              />
              <Area type="monotone" dataKey="txCount" stroke="#0F766E" strokeWidth={2.5} fillOpacity={1} fill="url(#tpsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
