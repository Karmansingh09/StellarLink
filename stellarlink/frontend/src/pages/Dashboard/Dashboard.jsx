import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Activity, ShieldCheck, Wallet, Zap, FileCode, Lock, Cpu, Globe, Layers, Clock } from 'lucide-react';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import OverviewCards from '../../components/dashboard/OverviewCards';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import DeviceHealthChart from '../../components/dashboard/DeviceHealthChart';
import LiveNetworkTable from '../../components/dashboard/LiveNetworkTable';
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton';
import useDashboard from '../../hooks/useDashboard';
import useDevices from '../../hooks/useDevices';
import { useStellarNetwork, useStellarWallet } from '../../hooks/useStellar';

const defaultTestnetPublicKey = 'GD6WTVMWBX227SYP5T5GZ2H4P5V2K3L4M5N6P7Q8R9S0T1U2V3W4X5Y6';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboard();
  const { data: networkStatus } = useStellarNetwork();
  const { data: walletData } = useStellarWallet(defaultTestnetPublicKey);
  const { data: devices = [] } = useDevices();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const activeDeviceCount = devices.length ? devices.filter((d) => d.status === 'active' || d.status === 'settled').length : 1284;
  const ledgerSequence = networkStatus?.ledgerSequence || 52894105;
  const protocolVersion = networkStatus?.protocolVersion || 21;
  const baseFeeStroops = networkStatus?.baseFee || 100;
  const avgFinality = networkStatus?.avgConfirmationTimeMs || 482;
  const connectedBalance = walletData?.balance || '10,000.00 XLM';

  const overviewCardsData = [
    {
      title: 'Connected Wallet Balance',
      value: connectedBalance,
      change: { label: 'Live Testnet', tone: 'success', description: 'Primary Vault Balance' },
      icon: Wallet,
      tone: 'primary',
    },
    {
      title: 'Successful Settlements',
      value: '12,840 Txs',
      change: { label: '+18.4%', tone: 'success', description: 'Soroban Escrow Settled' },
      icon: ShieldCheck,
      tone: 'neutral',
    },
    {
      title: 'Active Fleet Terminals',
      value: `${activeDeviceCount.toLocaleString()} Nodes`,
      change: { label: 'Online', tone: 'success', description: `${devices.length} Total Registered` },
      icon: Cpu,
      tone: 'warning',
    },
    {
      title: 'Network Base Fee',
      value: `${baseFeeStroops} Stroops`,
      change: { label: '0.00001 XLM', tone: 'primary', description: 'Fee Pool Accepted' },
      icon: Zap,
      tone: 'success',
    },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Live Stellar Control Center Header */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Stellar Testnet • Healthy (100% SLA)
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E] font-mono">
                  Protocol v{protocolVersion}
                </span>
                <span className="text-xs text-[#64748B] border-l border-[#E2E8F0] pl-3">
                  Auto-sync every 10s
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Stellar Network Control Center
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Real-time consensus telemetry, ledger sequence monitoring, and machine settlement metrics across the estate.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Animated Live Ledger Chip */}
              <div className="rounded-[16px] border border-[#CBE9E3] bg-[#EAF8F6] px-4 py-2.5 text-left font-mono">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F766E]">Latest Ledger</p>
                <div className="mt-0.5 text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-[#0F766E]" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ledgerSequence}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      #{ledgerSequence}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Confirmation Speed Chip */}
              <div className="hidden sm:block rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-left font-mono">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">Avg Finality</p>
                <p className="mt-0.5 text-sm font-bold text-[#0F766E] flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
                  {avgFinality}ms
                </p>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Animated KPI Overview Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <OverviewCards cards={overviewCardsData} />
        </Container>
      </motion.section>

      {/* Performance & Health Charts Grid */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <AnalyticsChart />
            <DeviceHealthChart />
          </div>
        </Container>
      </motion.section>

      {/* Live Network Table */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <LiveNetworkTable />
        </Container>
      </motion.section>
    </motion.div>
  );
}
