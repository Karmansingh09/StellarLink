import { useMemo } from 'react';
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
import { TrendingUp, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import useTransactions from '../../hooks/useTransactions';

const DEVICE_COLORS = ['#0F766E', '#14B8A6', '#F59E0B', '#64748B', '#6366F1', '#EC4899'];

export default function TransactionAnalytics() {
  const { data: transactions = [] } = useTransactions();
  const hasData = Array.isArray(transactions) && transactions.length > 0;

  // 1. Dynamic Volume Data (grouped by transaction index/label)
  const volumeLineData = useMemo(() => {
    if (!hasData) return [];
    const grouped = {};
    transactions.forEach((tx, idx) => {
      const rawAmt = typeof tx.amount === 'string' ? tx.amount : '';
      const num = parseFloat(rawAmt.replace(/[^0-9.]/g, '')) || 0;
      const label = tx.timestamp ? String(tx.timestamp).split(' ')[0] : `Tx ${idx + 1}`;
      grouped[label] = (grouped[label] || 0) + num;
    });
    return Object.keys(grouped).map((label) => ({
      day: label,
      volume: grouped[label],
    }));
  }, [transactions, hasData]);

  // 2. Dynamic Distribution Data (grouped by device)
  const distributionDonutData = useMemo(() => {
    if (!hasData) return [];
    const counts = {};
    let total = 0;
    transactions.forEach((tx) => {
      const device = tx.device || 'Unassigned Device';
      counts[device] = (counts[device] || 0) + 1;
      total += 1;
    });
    return Object.keys(counts).map((device, idx) => ({
      name: device,
      value: Math.round((counts[device] / total) * 100),
      color: DEVICE_COLORS[idx % DEVICE_COLORS.length],
    }));
  }, [transactions, hasData]);

  // 3. Dynamic Hourly Activity Data (grouped by timestamp hour)
  const hourlyBarData = useMemo(() => {
    if (!hasData) return [];
    const hoursMap = {};
    transactions.forEach((tx) => {
      let hourLabel = '12:00';
      if (tx.timestamp && typeof tx.timestamp === 'string') {
        const parts = tx.timestamp.match(/(\d{1,2}):\d{2}/);
        if (parts && parts[1]) {
          hourLabel = `${parts[1].padStart(2, '0')}:00`;
        } else {
          hourLabel = tx.timestamp.slice(0, 5);
        }
      }
      hoursMap[hourLabel] = (hoursMap[hourLabel] || 0) + 1;
    });
    return Object.keys(hoursMap).map((h) => ({
      hour: h,
      txs: hoursMap[h],
    }));
  }, [transactions, hasData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1. Transaction Volume (Line / Area Chart) */}
      <Card padding="generous" className="h-full min-w-0 flex flex-col justify-between">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Transaction Volume</CardTitle>
          <CardDescription className="text-xs">Settlement volume calculated from real Horizon transactions</CardDescription>
        </CardHeader>
        <div className="h-44 sm:h-52 w-full pt-2">
          {!hasData ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]/80 shadow-2xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-[#0F766E]">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5 max-w-xs">
                <p className="text-xs font-bold text-[#0F172A]">No Volume Data</p>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Volume trends will appear after settlements are recorded.
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeLineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="txVolGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  formatter={(val) => [`${typeof val === 'number' ? val.toLocaleString() : val} XLM`, 'Volume']}
                />
                <Area type="monotone" dataKey="volume" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#txVolGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* 2. Settlement Distribution (Donut Chart) */}
      <Card padding="generous" className="h-full min-w-0 flex flex-col justify-between">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Settlement Distribution</CardTitle>
          <CardDescription className="text-xs">Device distribution derived from active transactions</CardDescription>
        </CardHeader>
        <div className="h-44 sm:h-52 w-full flex items-center justify-center relative pt-2">
          {!hasData ? (
            <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]/80 shadow-2xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-[#0F766E]">
                <PieIcon className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5 max-w-xs">
                <p className="text-xs font-bold text-[#0F172A]">No Distribution Data</p>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Device settlement shares will appear with transaction activity.
                </p>
              </div>
            </div>
          ) : (
            <>
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
                <span className="text-xl font-bold font-['Space_Grotesk'] text-[#0F172A]">{transactions.length}</span>
                <span className="text-[10px] text-[#64748B]">Total Txs</span>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* 3. Hourly Activity (Bar Chart) */}
      <Card padding="generous" className="h-full min-w-0 flex flex-col justify-between">
        <CardHeader className="mb-2">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Hourly Activity</CardTitle>
          <CardDescription className="text-xs">Transaction count aggregated by settlement timestamp</CardDescription>
        </CardHeader>
        <div className="h-44 sm:h-52 w-full pt-2">
          {!hasData ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]/80 shadow-2xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-[#0F766E]">
                <BarChart2 className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5 max-w-xs">
                <p className="text-xs font-bold text-[#0F172A]">No Hourly Data</p>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Hourly activity will populate when transactions are recorded.
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyBarData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Bar dataKey="txs" fill="#0F766E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
