import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from './StatusBadge';
import { Cpu, Zap } from 'lucide-react';

const rows = [
  { device: 'EV Charging Node 04', id: 'DEV-9842', region: 'Europe West', status: 'settled', latency: '412 ms', volume: '128 tx' },
  { device: 'Autonomous Fleet 11', id: 'DEV-8711', region: 'North America', status: 'active', latency: '478 ms', volume: '96 tx' },
  { device: 'Microgrid Relay 02', id: 'DEV-6520', region: 'Asia Pacific', status: 'monitoring', latency: '521 ms', volume: '84 tx' },
  { device: 'Logistics Hub 07', id: 'DEV-4310', region: 'Middle East', status: 'pending', latency: '603 ms', volume: '64 tx' },
  { device: 'Smart Sensor Ring', id: 'DEV-3209', region: 'South America', status: 'settled', latency: '389 ms', volume: '142 tx' },
  { device: 'Warehouse AI Cluster', id: 'DEV-1102', region: 'Europe Central', status: 'offline', latency: '—', volume: '0 tx' },
];

export default function LiveNetworkTable() {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
      <Card padding="generous" className="h-full">
        <CardHeader className="mb-4 sm:mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-base sm:text-[1.05rem]">Live network activity</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Mock settlement feed for enterprise devices, wallets, and regional nodes.
              </CardDescription>
            </div>

            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Updated just now
            </p>
          </div>
        </CardHeader>

        {/* Mobile View: Cards (< md) */}
        <div className="grid gap-3 md:hidden">
          {rows.map((row) => (
            <div
              key={row.device}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3 transition-colors active:bg-[#EAF8F6]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#0F766E]">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{row.device}</p>
                    <p className="text-xs font-mono text-[#64748B]">{row.id} • {row.region}</p>
                  </div>
                </div>
                <StatusBadge status={row.status}>{row.status}</StatusBadge>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
                <div>
                  <span className="text-[#64748B]">Latency: </span>
                  <span className="font-semibold text-[#0F172A]">{row.latency}</span>
                </div>
                <div>
                  <span className="text-[#64748B]">Volume: </span>
                  <span className="font-semibold text-[#0F766E]">{row.volume}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table (>= md) */}
        <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0]">
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