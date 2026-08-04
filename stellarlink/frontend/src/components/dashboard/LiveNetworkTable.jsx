import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from './StatusBadge';

const rows = [
  { device: 'EV Charging Node 04', region: 'Europe West', status: 'settled', latency: '412 ms', volume: '128 tx' },
  { device: 'Autonomous Fleet 11', region: 'North America', status: 'active', latency: '478 ms', volume: '96 tx' },
  { device: 'Microgrid Relay 02', region: 'Asia Pacific', status: 'monitoring', latency: '521 ms', volume: '84 tx' },
  { device: 'Logistics Hub 07', region: 'Middle East', status: 'pending', latency: '603 ms', volume: '64 tx' },
  { device: 'Smart Sensor Ring', region: 'South America', status: 'settled', latency: '389 ms', volume: '142 tx' },
  { device: 'Warehouse AI Cluster', region: 'Europe Central', status: 'offline', latency: '—', volume: '0 tx' },
];

export default function LiveNetworkTable() {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-[1.05rem]">Live network activity</CardTitle>
              <CardDescription>
                Mock settlement feed for enterprise devices, wallets, and regional nodes.
              </CardDescription>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Updated just now
            </p>
          </div>
        </CardHeader>

        <div className="overflow-hidden rounded-[16px] border border-[#E2E8F0]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  {['Device', 'Region', 'Status', 'Latency', 'Volume'].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] bg-white">
                {rows.map((row) => (
                  <tr key={row.device} className="transition-colors hover:bg-[#FAF8FF]">
                    <td className="px-4 py-4 sm:px-6">
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{row.device}</p>
                        <p className="text-xs text-[#64748B]">Settlement endpoint</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#475569] sm:px-6">{row.region}</td>
                    <td className="px-4 py-4 sm:px-6">
                      <StatusBadge status={row.status}>{row.status}</StatusBadge>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-[#0F172A] sm:px-6">{row.latency}</td>
                    <td className="px-4 py-4 text-sm text-[#475569] sm:px-6">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}