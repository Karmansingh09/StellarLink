import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';

const data = [
  { day: 'Mon', tps: 6200, burst: 7800 },
  { day: 'Tue', tps: 6800, burst: 8100 },
  { day: 'Wed', tps: 7400, burst: 8400 },
  { day: 'Thu', tps: 8200, burst: 9100 },
  { day: 'Fri', tps: 7900, burst: 8700 },
  { day: 'Sat', tps: 8500, burst: 9400 },
  { day: 'Sun', tps: 8200, burst: 9200 },
];

export default function NetworkPerformanceChart() {
  return (
    <Card padding="generous" className="h-full">
      <CardHeader className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Network Throughput & Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Daily transaction execution rate (tx/min) across the control plane</CardDescription>
          </div>
          <Badge variant="primary" dot size="sm" className="self-start sm:self-auto">
            Live Telemetry
          </Badge>
        </div>
      </CardHeader>

      <div className="h-64 sm:h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
      </div>
    </Card>
  );
}
