import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, Zap, Clock, ShieldCheck } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card, { CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const timeFilters = ['24H', '7D', '30D', '90D', '1Y'];

const volumeData = [
  { time: '00:00', volume: 420, latency: 380 },
  { time: '04:00', volume: 680, latency: 410 },
  { time: '08:00', volume: 1250, latency: 490 },
  { time: '12:00', volume: 1890, latency: 520 },
  { time: '16:00', volume: 2100, latency: 460 },
  { time: '20:00', volume: 1540, latency: 420 },
  { time: '23:59', volume: 980, latency: 390 },
];

const networkBreakdown = [
  { region: 'Europe West', txs: 4820, percentage: '38%' },
  { region: 'North America', txs: 3910, percentage: '31%' },
  { region: 'Asia Pacific', txs: 2450, percentage: '19%' },
  { region: 'Middle East', txs: 1520, percentage: '12%' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Analytics() {
  const [activeFilter, setActiveFilter] = useState('30D');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Header Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Telemetry Intelligence
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Stellar Network Analytics
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Network Analytics & SLA
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Real-time throughput metrics, settlement latency distributions, and regional volume health across all connected devices.
                </p>
              </div>
            </div>

            {/* Time Filter Pills (Swipeable on Mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none border border-[#E2E8F0] p-1.5 rounded-2xl bg-[#F8FAFC]">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${activeFilter === filter ? 'bg-white text-[#0F766E] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </motion.section>

      {/* KPI Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card padding="normal">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Total Volume</p>
                <TrendingUp className="h-4 w-4 text-[#0F766E]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-['Space_Grotesk'] text-[#0F172A]">$12,480,290</p>
              <p className="mt-1 text-xs text-emerald-600 font-medium">+18.4% vs last period</p>
            </Card>

            <Card padding="normal">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Avg Latency</p>
                <Clock className="h-4 w-4 text-[#0F766E]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-['Space_Grotesk'] text-[#0F172A]">412 ms</p>
              <p className="mt-1 text-xs text-emerald-600 font-medium">-14ms improvement</p>
            </Card>

            <Card padding="normal">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Settlement Rate</p>
                <Zap className="h-4 w-4 text-[#0F766E]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-['Space_Grotesk'] text-[#0F172A]">99.98%</p>
              <p className="mt-1 text-xs text-emerald-600 font-medium">Stable SLA</p>
            </Card>

            <Card padding="normal">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Active Routes</p>
                <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-['Space_Grotesk'] text-[#0F172A]">1,284 Nodes</p>
              <p className="mt-1 text-xs text-slate-500 font-medium">Fully verified</p>
            </Card>
          </div>
        </Container>
      </motion.section>

      {/* Main Chart */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <Card padding="generous">
            <CardHeader className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-[#0F172A]">Settlement Throughput vs Latency</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Real-time micro-payments processed per hour across the control plane.</CardDescription>
                </div>
                <Badge variant="primary" dot size="sm" className="self-start sm:self-auto">
                  Live Stream
                </Badge>
              </div>
            </CardHeader>

            <div className="h-64 sm:h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#0F766E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVol)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Container>
      </motion.section>

      {/* Regional Breakdown Grid */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <Card padding="generous">
            <CardHeader className="mb-4">
              <CardTitle className="text-lg font-semibold text-[#0F172A]">Regional Volume Share</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {networkBreakdown.map((item) => (
                <div key={item.region} className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0F172A]">{item.region}</span>
                    <span className="text-xs font-bold text-[#0F766E]">{item.percentage}</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F766E] h-full rounded-full" style={{ width: item.percentage }} />
                  </div>
                  <p className="text-xs text-[#64748B]">{item.txs.toLocaleString()} txs processed</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </motion.section>
    </motion.div>
  );
}
