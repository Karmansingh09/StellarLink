import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const kpis = [
  {
    title: 'Total Balance',
    value: '482,910.00 XLM',
    change: { label: '+14.2%', tone: 'success' },
    icon: Wallet,
    tone: 'primary',
  },
  {
    title: 'Available Balance',
    value: '450,000.00 XLM',
    change: { label: 'Available', tone: 'primary' },
    icon: ShieldCheck,
    tone: 'neutral',
  },
  {
    title: "Today's Volume",
    value: '$124,500.00',
    change: { label: '+8.1%', tone: 'success' },
    icon: TrendingUp,
    tone: 'warning',
  },
  {
    title: 'Active Wallets',
    value: '1,280',
    change: { label: '99.8% Active', tone: 'success' },
    icon: Cpu,
    tone: 'success',
  },
];

export default function WalletKPICards() {
  const tones = {
    primary: 'bg-[#EAF8F6] text-[#0F766E] border-[#CBE9E3]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    warning: 'bg-[#FFF7E6] text-[#92400E] border-[#F6E2B5]',
    success: 'bg-[#EAF7EE] text-[#166534] border-[#CDECCD]',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.title}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <Card padding="generous" className="h-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                    {kpi.title}
                  </p>
                  <p className="mt-3 font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
                    {kpi.value}
                  </p>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-[16px] border ${tones[kpi.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Badge variant={kpi.change.tone} dot size="sm">
                  {kpi.change.label}
                </Badge>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
