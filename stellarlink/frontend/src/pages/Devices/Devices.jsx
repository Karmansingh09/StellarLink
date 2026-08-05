import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { TableSkeleton } from '../../components/ui/Skeleton';
import DeviceStatsCards from '../../components/devices/DeviceStatsCards';
import DeviceFilterToolbar from '../../components/devices/DeviceFilterToolbar';
import DeviceTable from '../../components/devices/DeviceTable';
import DeviceDetailDrawer from '../../components/devices/DeviceDetailDrawer';
import RegisterDeviceModal from '../../components/devices/RegisterDeviceModal';
import useDevices from '../../hooks/useDevices';
import useDocumentTitle from '../../hooks/useDocumentTitle';

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

export default function Devices() {
  useDocumentTitle('Device Fleet Management', 'Provision, monitor, and inspect autonomous IoT terminals and relay nodes connected to Soroban.');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { data: devices = [], isLoading, isError, error, refetch, registerDevice } = useDevices({
    search: searchQuery,
    status: statusFilter,
    region: regionFilter,
  });

  const handleRegisterDevice = async (newDeviceData) => {
    await registerDevice(newDeviceData);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setRegionFilter('all');
    refetch();
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Page Header Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Hardware Control Plane
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Stellar M2M Fleet
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Device Fleet Management
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Provision, monitor, and inspect autonomous IoT terminals, EV chargers, and relay nodes connected to Soroban smart contracts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-right sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Provisioning SLA
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0F766E]">Sub-second key creation</p>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Fleet Stats Overview */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <DeviceStatsCards />
        </Container>
      </motion.section>

      {/* Search & Filter Toolbar */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <DeviceFilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            regionFilter={regionFilter}
            onRegionChange={setRegionFilter}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            onRefresh={handleResetFilters}
          />
        </Container>
      </motion.section>

      {/* Devices Data Table / Skeletons / Error */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          {isLoading ? (
            <TableSkeleton rows={6} />
          ) : isError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-900 space-y-3">
              <p className="text-sm font-semibold">Failed to load device telemetry from API.</p>
              <p className="text-xs text-rose-700">{error?.message || 'Network error'}</p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry API Request
              </Button>
            </div>
          ) : (
            <DeviceTable
              devices={devices}
              onSelectDevice={setSelectedDevice}
              onResetFilters={handleResetFilters}
            />
          )}
        </Container>
      </motion.section>

      {/* Device Detail Slide-over Drawer */}
      <DeviceDetailDrawer device={selectedDevice} onClose={() => setSelectedDevice(null)} />

      {/* Register New Device Modal */}
      <RegisterDeviceModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterDevice}
      />
    </motion.div>
  );
}
