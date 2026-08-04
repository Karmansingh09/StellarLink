import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import DeviceStatsCards from '../../components/devices/DeviceStatsCards';
import DeviceFilterToolbar from '../../components/devices/DeviceFilterToolbar';
import DeviceTable from '../../components/devices/DeviceTable';
import DeviceDetailDrawer from '../../components/devices/DeviceDetailDrawer';
import RegisterDeviceModal from '../../components/devices/RegisterDeviceModal';

const initialDevices = [
  {
    id: 'DEV-9842-X1',
    name: 'EV Charging Node 04',
    type: 'EV Charger',
    region: 'Europe West',
    wallet: 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7J6H5F3S21Q',
    status: 'settled',
    latency: '412 ms',
    volume: '128 tx',
    balance: '1,250.00 XLM',
  },
  {
    id: 'DEV-8711-A2',
    name: 'Autonomous Fleet 11',
    type: 'Autonomous Robot',
    region: 'North America',
    wallet: 'GB7M2N3B4V5C6X7Z8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y3U4I5O6P7L8K9J0H1G',
    status: 'active',
    latency: '478 ms',
    volume: '96 tx',
    balance: '2,400.50 XLM',
  },
  {
    id: 'DEV-6520-M3',
    name: 'Microgrid Relay 02',
    type: 'Microgrid Relay',
    region: 'Asia Pacific',
    wallet: 'GC984K12J34H56G78F90D12S34A56Q78W90E12R34T56Y78U90I12O34P56L78K90',
    status: 'monitoring',
    latency: '521 ms',
    volume: '84 tx',
    balance: '890.00 XLM',
  },
  {
    id: 'DEV-4310-L7',
    name: 'Logistics Hub 07',
    type: 'Autonomous Robot',
    region: 'Middle East',
    wallet: 'GD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCD',
    status: 'pending',
    latency: '603 ms',
    volume: '64 tx',
    balance: '150.00 XLM',
  },
  {
    id: 'DEV-3209-S4',
    name: 'Smart Sensor Ring',
    type: 'Smart Sensor',
    region: 'North America',
    wallet: 'GE9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDC',
    status: 'settled',
    latency: '389 ms',
    volume: '142 tx',
    balance: '3,100.00 XLM',
  },
  {
    id: 'DEV-1102-W8',
    name: 'Warehouse AI Cluster',
    type: 'Autonomous Robot',
    region: 'Europe West',
    wallet: 'GF11223344556677889900AABBCCDDEEFF11223344556677889900AABBCCDDEE',
    status: 'offline',
    latency: '—',
    volume: '0 tx',
    balance: '45.00 XLM',
  },
];

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
  const [deviceList, setDeviceList] = useState(initialDevices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const filteredDevices = useMemo(() => {
    return deviceList.filter((device) => {
      const matchesSearch =
        searchQuery === '' ||
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.wallet.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || device.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesRegion =
        regionFilter === 'all' || device.region.toLowerCase() === regionFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [deviceList, searchQuery, statusFilter, regionFilter]);

  const handleRegisterDevice = (newDevice) => {
    setDeviceList((prev) => [newDevice, ...prev]);
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
            onRefresh={() => setSearchQuery('')}
          />
        </Container>
      </motion.section>

      {/* Devices Data Table */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <DeviceTable devices={filteredDevices} onSelectDevice={setSelectedDevice} />
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
