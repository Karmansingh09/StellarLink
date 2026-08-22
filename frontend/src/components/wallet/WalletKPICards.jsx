import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import useDevices from '../../hooks/useDevices';

export default function WalletKPICards({ walletData }) {
  const { data: devices = [] } = useDevices();

  const totalBal = walletData?.totalXLM
    ? (walletData.totalXLM.includes('XLM') ? walletData.totalXLM : `${walletData.totalXLM} XLM`)
    : walletData?.balance || '0.00 XLM';
  const availableBal = walletData?.availableXLM
    ? (walletData.availableXLM.includes('XLM') ? walletData.availableXLM : `${walletData.availableXLM} XLM`)
    : walletData?.availableBalance || '0.00 XLM';
  const todayVol = walletData?.usdEquivalent || walletData?.usdValue || '$0.00 USD';
  const activeCount = devices.length;

  const kpis = [
    {
      title: 'Total Balance',
      value: totalBal,
      change: { label: walletData?.unfunded ? 'Unfunded Keypair' : 'Stellar Testnet', tone: walletData?.unfunded ? 'warning' : 'success' },
      icon: Wallet,
      tone: 'primary',
    },
    {
      title: 'Available Balance',
      value: availableBal,
      change: { label: 'Minus Base Reserve', tone: 'primary' },
      icon: ShieldCheck,
      tone: 'neutral',
    },
    {
      title: 'Est. Vault USD Value',
      value: todayVol,
      change: { label: 'Live Rate', tone: 'success' },
      icon: TrendingUp,
      tone: 'warning',
    },
    {
      title: 'Active Fleet Wallets',
      value: `${activeCount.toLocaleString()}`,
      change: { label: 'Active Fleet', tone: 'success' },
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
