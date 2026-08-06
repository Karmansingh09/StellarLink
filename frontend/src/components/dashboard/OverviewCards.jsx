import { Activity, ShieldCheck, Wallet, Zap, FileCode, Lock } from 'lucide-react';
import OverviewCard from './OverviewCard';

const defaultCards = [
  {
    title: 'Soroban Active Contracts',
    value: '4 Contracts',
    change: { label: 'Active', tone: 'success', description: 'Device & Escrow WASM' },
    icon: FileCode,
    tone: 'primary',
  },
  {
    title: 'Successful Settlements',
    value: '12,840',
    change: { label: '+18.4%', tone: 'success', description: 'On-chain auto-settled' },
    icon: Wallet,
    tone: 'neutral',
  },
  {
    title: 'Pending Escrows Locked',
    value: '12 Locked',
    change: { label: 'Escrow Safe', tone: 'warning', description: '12,500 XLM in escrow' },
    icon: Lock,
    tone: 'warning',
  },
  {
    title: 'Smart Contract Health',
    value: '100% SLA',
    change: { label: 'Optimal', tone: 'success', description: 'Soroban RPC v21.1' },
    icon: ShieldCheck,
    tone: 'success',
  },
];

export default function OverviewCards({ cards = defaultCards, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
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
