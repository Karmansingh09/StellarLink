import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { DollarSign } from 'lucide-react';
import useAnalytics from '../../hooks/useAnalytics';

export default function PaymentVolumeChart({ metrics: metricsProp }) {
  const { data: metricsFromHook, isLoading } = useAnalytics();
  const metrics = metricsProp || metricsFromHook;
  const chartData = metrics?.paymentVolume || [];
  const hasData = chartData.length > 0 && chartData.some((d) => d.volume > 0);

  const formatYTick = (val) => {
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val;
  };

  return (
    <Card padding="generous" className="h-full min-w-0">
      <CardHeader className="mb-2">
        <CardTitle className="text-base font-semibold text-[#0F172A]">Payment Volume</CardTitle>
        <CardDescription className="text-xs">Daily payment totals (XLM)</CardDescription>
      </CardHeader>
      <div className="h-56 sm:h-64 w-full pt-2">
        {isLoading && !metrics ? (
          <div className="flex h-full items-center justify-center text-xs text-[#64748B]">
            Loading payment volume...
          </div>
        ) : !hasData ? (
          <EmptyState
            icon={DollarSign}
            title="No Payment Operations"
            description="No payment operations recorded on Stellar Testnet for the active window."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={formatYTick} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                formatter={(val) => [`${typeof val === 'number' ? val.toLocaleString() : val} XLM`, 'Payment Volume']}
              />
              <Bar dataKey="volume" fill="#0F766E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
