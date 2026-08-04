import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Clock, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const defaultKPIs = [
  {
    title: 'Network Throughput',
    value: '8.2k tx/min',
    change: { label: '+6.4%', tone: 'success' },
    icon: Activity,
    tone: 'primary',
  },
  {
    title: 'Settlement Success',
    value: '99.98%',
    change: { label: 'Stable', tone: 'primary' },
    icon: ShieldCheck,
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
    title: 'Connected Devices',
    value: '1,284',
    change: { label: '+42', tone: 'success' },
    icon: Cpu,
    tone: 'success',
  },
];

export default function AnalyticsKPICards() {
  const tones = {
    primary: 'bg-[#EAF8F6] text-[#0F766E] border-[#CBE9E3]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    warning: 'bg-[#FFF7E6] text-[#92400E] border-[#F6E2B5]',
    success: 'bg-[#EAF7EE] text-[#166534] border-[#CDECCD]',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {defaultKPIs.map((kpi) => {
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
