import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Clock, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import useAnalytics from '../../hooks/useAnalytics';

export default function AnalyticsKPICards() {
  const { data: metrics } = useAnalytics();

  const kpis = [
    {
      title: 'Network Throughput',
      value: metrics?.throughputTps || '0 tx/min',
      change: { label: metrics?.throughputGrowth || '0.0%', tone: 'neutral' },
      icon: Activity,
      tone: 'primary',
    },
    {
      title: 'Settlement Success',
      value: metrics?.successRate || '100.0%',
      change: { label: 'Stable', tone: 'primary' },
      icon: ShieldCheck,
      tone: 'neutral',
    },
    {
      title: 'Average Finality',
      value: metrics?.averageFinalityMs || '482ms',
      change: { label: 'Optimal', tone: 'success' },
      icon: Clock,
      tone: 'warning',
    },
    {
      title: 'Connected Devices',
      value: metrics?.connectedDevicesCount ? String(metrics.connectedDevicesCount) : '6',
      change: { label: 'Active', tone: 'success' },
      icon: Cpu,
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
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.title}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <Card padding="generous" className="h-full flex flex-col justify-between min-w-0">
              {/* Header Row: Title & Icon */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B] whitespace-nowrap">
                  {kpi.title}
                </p>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border ${tones[kpi.tone]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Value Row: Clean Numeric Display */}
              <div className="mt-3 min-w-0">
                <p className="font-['Space_Grotesk'] text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap overflow-hidden text-ellipsis">
                  {kpi.value}
                </p>
              </div>

              {/* Footer Row: Status Badge */}
              <div className="mt-3.5 flex items-center gap-2">
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
