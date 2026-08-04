import { motion } from 'framer-motion';
import { Activity, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const defaultMetrics = [
  {
    title: 'Total Transactions',
    value: '1.24M',
    change: { label: '+12%', tone: 'success' },
    icon: Activity,
    tone: 'primary',
  },
  {
    title: 'Settlement Volume',
    value: '$48.2M',
    change: { label: '+8.4%', tone: 'success' },
    icon: DollarSign,
    tone: 'neutral',
  },
  {
    title: 'Average Finality',
    value: '482ms',
    change: { label: 'Optimal', tone: 'success' },
    icon: Clock,
    tone: 'warning',
  },
  {
    title: 'Success Rate',
    value: '99.98%',
    change: { label: 'Stable', tone: 'primary' },
    icon: ShieldCheck,
    tone: 'success',
  },
];

export default function TransactionKPIs() {
  const tones = {
    primary: 'bg-[#EAF8F6] text-[#0F766E] border-[#CBE9E3]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    warning: 'bg-[#FFF7E6] text-[#92400E] border-[#F6E2B5]',
    success: 'bg-[#EAF7EE] text-[#166534] border-[#CDECCD]',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {defaultMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.title}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <Card padding="generous" className="h-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                    {metric.title}
                  </p>
                  <p className="mt-3 font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
                    {metric.value}
                  </p>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-[16px] border ${tones[metric.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Badge variant={metric.change.tone} dot size="sm">
                  {metric.change.label}
                </Badge>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
