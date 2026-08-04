import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';

const balanceTrendData = [
  { day: 'Mon', balance: 410000 },
  { day: 'Tue', balance: 425000 },
  { day: 'Wed', balance: 440000 },
  { day: 'Thu', balance: 460000 },
  { day: 'Fri', balance: 475000 },
  { day: 'Sat', balance: 482910 },
];

const assetAllocationData = [
  { name: 'XLM Native', value: 70, color: '#0F766E' },
  { name: 'USDC Anchored', value: 15, color: '#14B8A6' },
  { name: 'SLK Token', value: 10, color: '#F59E0B' },
  { name: 'AQUA', value: 5, color: '#64748B' },
];

const dailyVolumeData = [
  { day: 'Mon', volume: 12000 },
  { day: 'Tue', volume: 18500 },
  { day: 'Wed', volume: 24000 },
  { day: 'Thu', volume: 31000 },
  { day: 'Fri', volume: 29500 },
  { day: 'Sat', volume: 38200 },
];

export default function WalletAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1. Balance Trend (Area Chart) */}
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Balance Trend</CardTitle>
          <CardDescription className="text-xs">XLM Liquidity growth over time</CardDescription>
        </CardHeader>
        <div className="h-48 sm:h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="balTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="balance" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#balTrendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Asset Allocation (Donut Chart) */}
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Asset Allocation</CardTitle>
          <CardDescription className="text-xs">Vault share by asset type</CardDescription>
        </CardHeader>
        <div className="h-48 sm:h-56 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={assetAllocationData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3} stroke="none">
                {assetAllocationData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-['Space_Grotesk'] text-[#0F172A]">70%</span>
            <span className="text-[10px] text-[#64748B]">XLM Share</span>
          </div>
        </div>
      </Card>

      {/* 3. Daily Payment Volume (Bar Chart) */}
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Daily Payment Volume</CardTitle>
          <CardDescription className="text-xs">Settlement throughput in USD</CardDescription>
        </CardHeader>
        <div className="h-48 sm:h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyVolumeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Bar dataKey="volume" fill="#0F766E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
