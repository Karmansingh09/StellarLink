import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from '../dashboard/StatusBadge';
import Badge from '../ui/Badge';
import { Trophy } from 'lucide-react';
import useDevices from '../../hooks/useDevices';

export default function TopDevicesLeaderboard() {
  const { data: devices = [] } = useDevices();

  const leaders = devices.slice(0, 5).map((dev, idx) => ({
    rank: idx + 1,
    name: dev.name,
    txs: dev.volume || '0 tx',
    volume: dev.balance || '0.00 XLM',
    status: dev.status,
    lastActivity: dev.lastHeartbeat || '--',
  }));

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#0F766E]" />
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Top Performing Devices</CardTitle>
          </div>
          <Badge variant="primary" dot size="sm">
            Leaderboard
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm">Highest volume and transaction throughput nodes</CardDescription>
      </CardHeader>

      {/* Mobile View (< md) */}
      <div className="grid gap-3 md:hidden">
        {leaders.map((dev) => (
          <div key={dev.name} className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F766E] text-white text-xs font-bold">
                  {dev.rank}
                </span>
                <span className="text-sm font-bold text-[#0F172A]">{dev.name}</span>
              </div>
              <StatusBadge status={dev.status}>{dev.status}</StatusBadge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
              <div>
                <span className="text-[#64748B]">Txs: </span>
                <span className="font-semibold text-[#0F172A]">{dev.txs}</span>
              </div>
              <div>
                <span className="text-[#64748B]">Volume: </span>
                <span className="font-mono font-bold text-[#0F766E]">{dev.volume}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-x-auto rounded-[16px] border border-[#E2E8F0]">
        <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {['Rank & Device', 'Transactions', 'Volume', 'Status', 'Last Activity'].map((heading) => (
                  <th key={heading} className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] bg-white">
              {leaders.map((dev) => (
                <tr key={dev.name} className="transition-colors hover:bg-[#FAF8FF]">
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold">
                        #{dev.rank}
                      </span>
                      <span className="text-sm font-semibold text-[#0F172A]">{dev.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-sm font-semibold text-[#0F172A] sm:px-6">{dev.txs}</td>
                  <td className="px-4 py-4 font-mono text-sm font-bold text-[#0F766E] sm:px-6">{dev.volume}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <StatusBadge status={dev.status}>{dev.status}</StatusBadge>
                  </td>
                  <td className="px-4 py-4 text-xs text-[#64748B] sm:px-6">{dev.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
}
