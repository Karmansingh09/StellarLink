import { motion } from 'framer-motion';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from './StatusBadge';
import useDevices from '../../hooks/useDevices';

export default function DeviceHealthChart() {
  const { data: devices = [] } = useDevices();

  const total = devices.length;
  const healthyCount = devices.filter((d) => d.status === 'active' || d.status === 'settled').length;
  const monitoringCount = devices.filter((d) => d.status === 'monitoring' || d.status === 'pending').length;
  const offlineCount = devices.filter((d) => d.status === 'offline' || d.status === 'failed').length;

  const healthyPct = total > 0 ? Math.round((healthyCount / total) * 100) : 100;
  const monitoringPct = total > 0 ? Math.round((monitoringCount / total) * 100) : 0;
  const offlinePct = total > 0 ? Math.round((offlineCount / total) * 100) : 0;

  const chartData = [
    { name: 'Healthy', value: healthyPct, color: '#0F766E' },
    { name: 'Monitoring', value: monitoringPct, color: '#F59E0B' },
    { name: 'Offline', value: offlinePct, color: '#EF4444' },
  ];

  const healthSummary = [
    { label: 'Healthy', value: `${healthyPct}%`, status: 'healthy' },
    { label: 'Monitoring', value: `${monitoringPct}%`, status: 'warning' },
    { label: 'Offline', value: `${offlinePct}%`, status: 'offline' },
  ];

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-6">
          <CardTitle className="text-[1.05rem]">Device health</CardTitle>
          <CardDescription>
            Real-time operational status across connected terminals and smart endpoints.
          </CardDescription>
        </CardHeader>

        <div className="grid gap-6 md:grid-cols-[200px_1fr] md:items-center">
          <div className="relative h-55">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={94}
                  paddingAngle={2}
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Fleet health</p>
              <p className="mt-2 font-['Space_Grotesk'] text-4xl font-semibold tracking-tight text-[#0F172A]">{healthyPct}%</p>
              <p className="mt-1 text-sm text-[#475569]">Healthy devices</p>
            </div>
          </div>

          <div className="space-y-3">
            {healthSummary.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{item.label}</p>
                  <p className="text-xs text-[#64748B]">Connected endpoint health</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status}>{item.value}</StatusBadge>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                Fleet SLA Monitor
              </p>
              <p className="mt-2 text-sm leading-6 text-[#475569]">
                {offlineCount} offline terminal{offlineCount === 1 ? '' : 's'}. Automated Soroban smart contract failover remains active across {healthyCount} endpoints.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}