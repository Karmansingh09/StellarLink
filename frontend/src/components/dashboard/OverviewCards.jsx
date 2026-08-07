import { ShieldCheck, Wallet, Lock, FileCode } from 'lucide-react';
import OverviewCard from './OverviewCard';

const defaultCards = [
  {
    title: 'Soroban Active Contracts',
    value: '0 Contracts',
    change: { label: 'Active', tone: 'success', description: 'Device & Escrow WASM' },
    icon: FileCode,
    tone: 'primary',
  },
  {
    title: 'Successful Settlements',
    value: '0',
    change: { label: '0.0%', tone: 'neutral', description: 'On-chain auto-settled' },
    icon: Wallet,
    tone: 'neutral',
  },
  {
    title: 'Pending Escrows Locked',
    value: '0 Locked',
    change: { label: 'Escrow Safe', tone: 'warning', description: '0.00 XLM in escrow' },
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
