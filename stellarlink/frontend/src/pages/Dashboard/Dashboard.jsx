import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import OverviewCards from '../../components/dashboard/OverviewCards';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import DeviceHealthChart from '../../components/dashboard/DeviceHealthChart';
import LiveNetworkTable from '../../components/dashboard/LiveNetworkTable';
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton';

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
  const isLoading = false;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Header Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Real-time executive view
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  August 2026
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Executive Dashboard
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Track network health, settlement performance, and operational capacity across the StellarLink control plane.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-right sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">Priority route</p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">Settlement queue normal</p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[14px] border border-[#D9E2E1] bg-white px-4 py-3 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#CBE9E3] hover:text-[#0F766E]"
              >
                Export snapshot
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* 4 Metric Overview Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <OverviewCards />
        </Container>
      </motion.section>

      {/* Charts Grid */}
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
