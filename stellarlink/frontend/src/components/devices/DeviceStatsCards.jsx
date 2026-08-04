import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Wallet, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const stats = [
  {
    title: 'Total Connected Fleet',
    value: '1,284',
    change: { label: '1,210 Active', tone: 'success' },
    icon: Cpu,
    tone: 'primary',
  },
  {
    title: 'Settlement Wallets',
    value: '1,280 Funded',
    change: { label: '4 Low Balance', tone: 'warning' },
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

export default function DeviceStatsCards() {
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
            <Card padding="generous" className="h-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                    {stat.title}
                  </p>
                  <p className="mt-3 font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
                    {stat.value}
                  </p>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-[16px] border ${tones[stat.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
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
