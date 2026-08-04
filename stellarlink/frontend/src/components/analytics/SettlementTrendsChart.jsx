import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';

const data = [
  { week: 'W1', volume: 8.4 },
  { week: 'W2', volume: 11.2 },
  { week: 'W3', volume: 15.8 },
  { week: 'W4', volume: 18.4 },
  { week: 'W5', volume: 22.1 },
  { week: 'W6', volume: 28.6 },
];

export default function SettlementTrendsChart() {
  return (
    <Card padding="generous" className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="text-base font-semibold text-[#0F172A]">Settlement Trends</CardTitle>
        <CardDescription className="text-xs">Weekly settlement volume ($ Millions)</CardDescription>
      </CardHeader>
      <div className="h-56 sm:h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="settleTrendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
            <Area type="monotone" dataKey="volume" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#settleTrendGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
