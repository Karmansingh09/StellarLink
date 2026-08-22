import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { Activity } from 'lucide-react';
import useAnalytics from '../../hooks/useAnalytics';

export default function NetworkPerformanceChart() {
  const { data: metrics, isLoading } = useAnalytics();
  const chartData = metrics?.performance || [];
  const hasData = chartData.length > 0 && chartData.some((d) => d.tps > 0 || d.burst > 0);

  return (
    <Card padding="generous" className="h-full min-w-0">
      <CardHeader className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Network Throughput & Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Daily transaction execution rate (tx/min) calculated from Stellar Testnet</CardDescription>
          </div>
          <Badge variant="primary" dot size="sm" className="self-start sm:self-auto">
            Live Testnet Data
          </Badge>
        </div>
      </CardHeader>

      <div className="h-64 sm:h-80 w-full pt-2">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-xs text-[#64748B]">
            Loading Stellar Testnet telemetry...
          </div>
        ) : !hasData ? (
          <EmptyState
            icon={Activity}
            title="No Network Performance Data"
            description="No daily transaction throughput recorded in the selected window on Stellar Testnet."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#475569' }} />
              <Line
                type="monotone"
                dataKey="tps"
                name="Standard Throughput (tx/min)"
                stroke="#0F766E"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="burst"
                name="Burst Capacity (tx/min)"
                stroke="#14B8A6"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={true}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
