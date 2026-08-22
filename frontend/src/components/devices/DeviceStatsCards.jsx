import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Wallet, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import useDevices from '../../hooks/useDevices';

export default function DeviceStatsCards() {
  const { data: devices = [] } = useDevices();

  const totalDevices = devices.length;
  const activeCount = devices.filter((d) => d.status === 'active' || d.status === 'settled').length;
  const lowBalCount = devices.filter((d) => parseFloat(d.balance || 0) < 100).length;

  const stats = [
    {
      title: 'Total Connected Fleet',
      value: totalDevices.toLocaleString(),
      change: { label: `${activeCount} Active`, tone: 'success' },
      icon: Cpu,
      tone: 'primary',
    },
    {
      title: 'Settlement Wallets',
      value: `${totalDevices} Funded`,
      change: { label: `${lowBalCount} Low Balance`, tone: lowBalCount > 0 ? 'warning' : 'success' },
      icon: Wallet,
      tone: 'neutral',
    },
    {
      title: 'Avg Network Latency',
      value: '412 ms',
      change: { label: 'Optimal', tone: 'success' },
      icon: Zap,
      tone: 'warning',
    },
    {
      title: 'Consensus Rate',
      value: '99.98%',
      change: { label: 'Zero Dropouts', tone: 'primary' },
      icon: ShieldCheck,
      tone: 'success',
    },
  ];

  const tones = {
    primary: 'bg-[#EAF8F6] text-[#0F766E] border-[#CBE9E3]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    warning: 'bg-[#FFF7E6] text-[#92400E] border-[#F6E2B5]',
    success: 'bg-[#EAF7EE] text-[#166534] border-[#CDECCD]',
  };

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <Card padding="generous" className="h-full flex flex-col justify-between min-w-0">
              {/* Header Row: Title & Icon */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B] whitespace-nowrap">
                  {stat.title}
                </p>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border ${tones[stat.tone]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Value Row: Clean Numeric Display */}
              <div className="mt-3 min-w-0">
                <p className="font-['Space_Grotesk'] text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap overflow-hidden text-ellipsis">
                  {stat.value}
                </p>
              </div>

              {/* Footer Row: Status Badge */}
              <div className="mt-3.5 flex items-center gap-2">
                <Badge variant={stat.change.tone} dot size="sm">
                  {stat.change.label}
                </Badge>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
