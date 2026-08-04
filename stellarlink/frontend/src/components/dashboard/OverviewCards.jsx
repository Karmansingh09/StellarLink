import { Activity, ShieldCheck, Wallet, Zap } from 'lucide-react';
import OverviewCard from './OverviewCard';

const defaultCards = [
  {
    title: 'Total settlement value',
    value: '$12.48M',
    change: { label: '+18.4%', tone: 'success', description: 'vs. last 30 days' },
    icon: Wallet,
    tone: 'primary',
  },
  {
    title: 'Active endpoints',
    value: '1,284',
    change: { label: '+64', tone: 'success', description: 'new devices onboarded' },
    icon: Activity,
    tone: 'neutral',
  },
  {
    title: 'Live throughput',
    value: '8.2k/min',
    change: { label: '+7.1%', tone: 'success', description: 'network burst rate' },
    icon: Zap,
    tone: 'warning',
  },
  {
    title: 'Operational SLA',
    value: '99.98%',
    change: { label: 'Stable', tone: 'primary', description: 'no incidents today' },
    icon: ShieldCheck,
    tone: 'success',
  },
];

export default function OverviewCards({ cards = defaultCards, className = '' }) {
  return (
    <div className={`grid gap-4 xl:grid-cols-4 ${className}`}>
      {cards.map((card) => (
        <OverviewCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          tone={card.tone}
        />
      ))}
    </div>
  );
}

export { OverviewCard };
