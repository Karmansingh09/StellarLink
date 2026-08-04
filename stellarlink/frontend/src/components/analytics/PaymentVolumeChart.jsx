import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';

const data = [
  { day: 'Mon', volume: 1.2 },
  { day: 'Tue', volume: 1.8 },
  { day: 'Wed', volume: 2.4 },
  { day: 'Thu', volume: 3.1 },
  { day: 'Fri', volume: 2.9 },
  { day: 'Sat', volume: 3.8 },
  { day: 'Sun', volume: 3.2 },
];

export default function PaymentVolumeChart() {
  return (
    <Card padding="generous" className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="text-base font-semibold text-[#0F172A]">Payment Volume</CardTitle>
        <CardDescription className="text-xs">Daily payment totals ($ Millions)</CardDescription>
      </CardHeader>
      <div className="h-56 sm:h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
            <Bar dataKey="volume" fill="#0F766E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
