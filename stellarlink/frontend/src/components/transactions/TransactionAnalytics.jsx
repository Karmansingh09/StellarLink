import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';

const volumeLineData = [
  { day: 'Mon', volume: 1420 },
  { day: 'Tue', volume: 1890 },
  { day: 'Wed', volume: 2400 },
  { day: 'Thu', volume: 3100 },
  { day: 'Fri', volume: 2800 },
  { day: 'Sat', volume: 3600 },
  { day: 'Sun', volume: 4200 },
];

const distributionDonutData = [
  { name: 'EV Charging', value: 45, color: '#0F766E' },
  { name: 'Fleet Robotics', value: 30, color: '#14B8A6' },
  { name: 'Microgrid', value: 15, color: '#F59E0B' },
  { name: 'Sensors', value: 10, color: '#64748B' },
];

const hourlyBarData = [
  { hour: '02:00', txs: 340 },
  { hour: '06:00', txs: 620 },
  { hour: '10:00', txs: 1450 },
  { hour: '14:00', txs: 1890 },
  { hour: '18:00', txs: 1210 },
  { hour: '22:00', txs: 780 },
];

export default function TransactionAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1. Transaction Volume (Line / Area Chart) */}
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Transaction Volume</CardTitle>
          <CardDescription className="text-xs">Weekly settlement throughput (XLM)</CardDescription>
        </CardHeader>
        <div className="h-48 sm:h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeLineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="txVolGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="volume" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#txVolGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Settlement Distribution (Donut Chart) */}
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Settlement Distribution</CardTitle>
          <CardDescription className="text-xs">Volume share by device hardware category</CardDescription>
        </CardHeader>
        <div className="h-48 sm:h-56 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionDonutData}
                dataKey="value"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                stroke="none"
              >
                {distributionDonutData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-['Space_Grotesk'] text-[#0F172A]">100%</span>
            <span className="text-[10px] text-[#64748B]">Soroban SLA</span>
          </div>
        </div>
      </Card>

      {/* 3. Hourly Activity (Bar Chart) */}
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Hourly Activity</CardTitle>
          <CardDescription className="text-xs">Peak transaction load distribution</CardDescription>
        </CardHeader>
        <div className="h-48 sm:h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyBarData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="hour" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Bar dataKey="txs" fill="#0F766E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
