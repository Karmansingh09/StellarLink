import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import AnalyticsKPICards from '../../components/analytics/AnalyticsKPICards';
import AnalyticsFilterBar from '../../components/analytics/AnalyticsFilterBar';
import NetworkPerformanceChart from '../../components/analytics/NetworkPerformanceChart';
import SettlementTrendsChart from '../../components/analytics/SettlementTrendsChart';
import PaymentVolumeChart from '../../components/analytics/PaymentVolumeChart';
import DeviceHealthDonutChart from '../../components/analytics/DeviceHealthDonutChart';
import RegionalActivityCards from '../../components/analytics/RegionalActivityCards';
import TopDevicesLeaderboard from '../../components/analytics/TopDevicesLeaderboard';
import LiveTelemetryFeed from '../../components/analytics/LiveTelemetryFeed';
import SystemHealthCards from '../../components/analytics/SystemHealthCards';
import AutomatedInsights from '../../components/analytics/AutomatedInsights';
import useAnalytics from '../../hooks/useAnalytics';
import { useWalletContext } from '../../context/WalletContext';

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

export default function Analytics() {
  const { walletData, publicKey } = useWalletContext();
  const activeKey = walletData?.publicKey || publicKey;

  const [dateRange, setDateRange] = useState('30d');
  const [deviceType, setDeviceType] = useState('all');
  const [network, setNetwork] = useState('all');

  const { data: analyticsData, refetch } = useAnalytics({
    publicKey: activeKey,
    dateRange,
    deviceType,
    network,
  });

  const handleReset = () => {
    setDateRange('30d');
    setDeviceType('all');
    setNetwork('all');
    refetch();
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Title Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Telemetry Control Plane
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Stellar Network Insights
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Analytics
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Monitor network performance, payment throughput, machine activity, settlement trends, and operational health across the StellarLink ecosystem.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Top 4 KPI Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <AnalyticsKPICards metrics={analyticsData} />
        </Container>
      </motion.section>

      {/* Filter Bar */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <AnalyticsFilterBar
            dateRange={dateRange}
            onDateChange={setDateRange}
            deviceType={deviceType}
            onDeviceChange={setDeviceType}
            network={network}
            onNetworkChange={setNetwork}
            onRefresh={handleReset}
            lastUpdated={analyticsData?.latestLedgerSequence ? Date.now() : null}
          />
        </Container>
      </motion.section>

      {/* Automated AI Insights */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <AutomatedInsights />
        </Container>
      </motion.section>

      {/* Large Line Chart: Network Performance */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <NetworkPerformanceChart />
        </Container>
      </motion.section>

      {/* 3 Secondary Charts Grid */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SettlementTrendsChart />
            <PaymentVolumeChart />
            <DeviceHealthDonutChart />
          </div>
        </Container>
      </motion.section>

      {/* Regional Activity Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <RegionalActivityCards />
        </Container>
      </motion.section>

      {/* Top Performing Devices Leaderboard & Live Telemetry Feed */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <TopDevicesLeaderboard />
            </div>
            <div className="lg:col-span-4">
              <LiveTelemetryFeed />
            </div>
          </div>
        </Container>
      </motion.section>

      {/* System Infrastructure Health */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <SystemHealthCards />
        </Container>
      </motion.section>
    </motion.div>
  );
}
