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
            <Card padding="generous" className="h-full min-w-0 overflow-hidden">
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] truncate">
                    {kpi.title}
                  </p>
                  <p className="mt-3 font-['Space_Grotesk'] text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] break-all sm:break-normal">
                    {kpi.value}
                  </p>
                </div>

                <div className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-[16px] border ${tones[kpi.tone]}`}>
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
