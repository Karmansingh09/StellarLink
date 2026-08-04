import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card, { CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import TransactionKPIs from '../../components/transactions/TransactionKPIs';
import TransactionFilterBar from '../../components/transactions/TransactionFilterBar';
import TransactionTable from '../../components/transactions/TransactionTable';
import RecentActivityPanel from '../../components/transactions/RecentActivityPanel';
import TransactionAnalytics from '../../components/transactions/TransactionAnalytics';
import TransactionDetailModal from '../../components/transactions/TransactionDetailModal';

const initialTransactions = [
  {
    txId: 'TX-938472',
    hash: '8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e',
    amount: '125.40 XLM',
    asset: 'XLM Native',
    status: 'completed',
    device: 'EV Charger #04',
    wallet: 'GB7M...P2L',
    fullWallet: 'GB7M2N3B4V5C6X7Z8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y3U4I5O6P7L8K9J0H1G',
    timestamp: '2 min ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'EV-CHARGE-SETTLE-04',
    latency: '412 ms',
  },
  {
    txId: 'TX-871144',
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    amount: '45.00 USDC',
    asset: 'USDC Anchored',
    status: 'processing',
    device: 'Autonomous Fleet 11',
    wallet: 'GB7M...0H1G',
    fullWallet: 'GB7M2N3B4V5C6X7Z8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y3U4I5O6P7L8K9J0H1G',
    timestamp: '45s ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'FLEET-PAYMENT-AUTOPAY',
    latency: '478 ms',
  },
  {
    txId: 'TX-652022',
    hash: '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    amount: '890.00 XLM',
    asset: 'XLM Native',
    status: 'completed',
    device: 'Microgrid Relay 02',
    wallet: 'GC98...90K9',
    fullWallet: 'GC984K12J34H56G78F90D12S34A56Q78W90E12R34T56Y78U90I12O34P56L78K90',
    timestamp: '12 min ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'GRID-RELAY-REWARD',
    latency: '389 ms',
  },
  {
    txId: 'TX-431099',
    hash: '0f1e2d3c4b5a698778695a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    amount: '12.00 XLM',
    asset: 'XLM Native',
    status: 'pending',
    device: 'Logistics Hub 07',
    wallet: 'GD12...ABCD',
    fullWallet: 'GD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCD',
    timestamp: '25 min ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'GAS-RESERVE-REFILL',
    latency: '603 ms',
  },
  {
    txId: 'TX-320911',
    hash: '7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
    amount: '340.20 XLM',
    asset: 'XLM Native',
    status: 'completed',
    device: 'Smart Sensor Ring',
    wallet: 'GE98...FEDC',
    fullWallet: 'GE9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDC',
    timestamp: '1 hour ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'SENSOR-TELEMETRY-PAY',
    latency: '389 ms',
  },
  {
    txId: 'TX-110299',
    hash: '4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c',
    amount: '0.00 XLM',
    asset: 'XLM Native',
    status: 'failed',
    device: 'Warehouse AI Cluster',
    wallet: 'GF11...DDEE',
    fullWallet: 'GF11223344556677889900AABBCCDDEEFF11223344556677889900AABBCCDDEE',
    timestamp: '2 hours ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'TIMEOUT-RETRY-EXCEEDED',
    latency: '—',
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

export default function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTx, setSelectedTx] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        searchQuery === '' ||
        tx.txId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.wallet.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || tx.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDevice =
        deviceFilter === 'all' || tx.device.toLowerCase() === deviceFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesDevice;
    });
  }, [transactions, searchQuery, statusFilter, deviceFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDeviceFilter('all');
    setDateFilter('all');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Page Title Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Stellar Core Ledger
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Sub-second Settlement
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Transactions
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Monitor every machine-to-machine payment, settlement, wallet transfer, and transaction status across the StellarLink network.
                </p>
              </div>
            </div>

            <Button variant="outline" size="md" className="gap-2 self-start lg:self-auto min-h-[44px]">
              <Download className="h-4 w-4" />
              <span>Export Ledger CSV</span>
            </Button>
          </div>
        </Container>
      </motion.section>

      {/* Top KPI Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <TransactionKPIs />
        </Container>
      </motion.section>

      {/* Filter Bar */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <TransactionFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            deviceFilter={deviceFilter}
            onDeviceChange={setDeviceFilter}
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            onRefresh={handleResetFilters}
          />
        </Container>
      </motion.section>

      {/* Main Ledger Table & Recent Activity Grid */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Main Transaction Table (8 cols on desktop) */}
            <div className="lg:col-span-8">
              <Card padding="generous" className="h-full">
                <CardHeader className="mb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">
                      Ledger Stream ({filteredTransactions.length})
                    </CardTitle>
                    <Badge variant="primary" dot size="sm">
                      Live Stream
                    </Badge>
                  </div>
                </CardHeader>

                <TransactionTable
                  transactions={filteredTransactions}
                  onViewDetails={setSelectedTx}
                  onRefresh={handleResetFilters}
                />
              </Card>
            </div>

            {/* Right: Recent Activity Panel (4 cols on desktop, moves below on mobile) */}
            <div className="lg:col-span-4">
              <RecentActivityPanel onSelectTx={setSelectedTx} />
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Analytics Section (3 Cards Below Table) */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <TransactionAnalytics />
        </Container>
      </motion.section>

      {/* Details Modal */}
      <TransactionDetailModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
    </motion.div>
  );
}
