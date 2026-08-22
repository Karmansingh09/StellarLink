import { motion } from 'framer-motion';
import { Activity, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import useTransactions from '../../hooks/useTransactions';

export default function TransactionKPIs() {
  const { data: transactions = [] } = useTransactions();

  const totalTxCount = transactions.length;
  const completedCount = transactions.filter((t) => t.status === 'completed' || t.status === 'settled').length;
  const successPct = totalTxCount > 0 ? Math.round((completedCount / totalTxCount) * 100) : 100;

  const metrics = [
    {
      title: 'Total Transactions',
      value: `${totalTxCount} Ledger Txs`,
      change: { label: 'Live Ledger', tone: 'success' },
      icon: Activity,
      tone: 'primary',
    },
    {
      title: 'Settlement Volume',
      value: '$0.00',
      change: { label: '0.0%', tone: 'neutral' },
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
      value: `${successPct}%`,
      change: { label: 'Stable', tone: 'primary' },
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.title}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <Card padding="generous" className="h-full flex flex-col justify-between min-w-0">
              {/* Header Row: Title & Icon */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B] whitespace-nowrap">
                  {metric.title}
                </p>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border ${tones[metric.tone]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Value Row: Clean Numeric Display */}
              <div className="mt-3 min-w-0">
                <p className="font-['Space_Grotesk'] text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap overflow-hidden text-ellipsis">
                  {metric.value}
                </p>
              </div>

              {/* Footer Row: Status Badge */}
              <div className="mt-3.5 flex items-center gap-2">
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
