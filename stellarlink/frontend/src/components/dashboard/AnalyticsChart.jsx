import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';

const data = [
  { month: 'Jan', volume: 58, target: 48 },
  { month: 'Feb', volume: 64, target: 52 },
  { month: 'Mar', volume: 72, target: 56 },
  { month: 'Apr', volume: 86, target: 68 },
  { month: 'May', volume: 94, target: 74 },
  { month: 'Jun', volume: 102, target: 82 },
  { month: 'Jul', volume: 117, target: 90 },
  { month: 'Aug', volume: 112, target: 92 },
  { month: 'Sep', volume: 126, target: 100 },
  { month: 'Oct', volume: 138, target: 108 },
  { month: 'Nov', volume: 144, target: 114 },
  { month: 'Dec', volume: 158, target: 122 },
];

const insightItems = [
  { label: 'Settlement throughput', value: '15.8k tx' },
  { label: 'Success rate', value: '99.92%' },
  { label: 'Average latency', value: '482 ms' },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-6">
            <span className="text-[#475569]">{entry.name}</span>
            <span className="font-semibold text-[#0F172A]">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsChart() {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-[1.05rem]">Network performance</CardTitle>
              <CardDescription>
                Monthly settlement volume and target progress across the StellarLink estate.
              </CardDescription>
            </div>

            <Badge variant="primary" dot size="sm">
              12 month view
            </Badge>
          </div>
        </CardHeader>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={32} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="volume"
                name="Volume"
                stroke="#0F766E"
                strokeWidth={2.5}
                fill="url(#volumeGradient)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#64748B"
                strokeWidth={2}
                fill="url(#targetGradient)"
                dot={false}
                strokeDasharray="6 6"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {insightItems.map((item) => (
            <div key={item.label} className="rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">{item.label}</p>
              <p className="mt-1 font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#0F172A]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}