import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';

const data = [
  { name: 'Healthy', value: 72, color: '#0F766E' },
  { name: 'Warning', value: 18, color: '#F59E0B' },
  { name: 'Offline', value: 7, color: '#EF4444' },
  { name: 'Maintenance', value: 3, color: '#64748B' },
];

export default function DeviceHealthDonutChart() {
  return (
    <Card padding="generous" className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="text-base font-semibold text-[#0F172A]">Device Health</CardTitle>
        <CardDescription className="text-xs">Fleet operational status breakdown</CardDescription>
      </CardHeader>

      <div className="h-56 sm:h-64 w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-xl font-bold font-['Space_Grotesk'] text-[#0F172A]">72%</span>
          <span className="text-[10px] text-[#64748B]">Healthy Fleet</span>
        </div>
      </div>
    </Card>
  );
}
