import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { TableSkeleton } from '../../components/ui/Skeleton';
import TransactionKPIs from '../../components/transactions/TransactionKPIs';
import TransactionFilterBar from '../../components/transactions/TransactionFilterBar';
import TransactionTable from '../../components/transactions/TransactionTable';
import RecentActivityPanel from '../../components/transactions/RecentActivityPanel';
import TransactionAnalytics from '../../components/transactions/TransactionAnalytics';
import TransactionDetailModal from '../../components/transactions/TransactionDetailModal';
import useTransactions from '../../hooks/useTransactions';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTx, setSelectedTx] = useState(null);

  const { data: transactions = [], isLoading, isError, error, refetch } = useTransactions({
    search: searchQuery,
    status: statusFilter,
    device: deviceFilter,
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDeviceFilter('all');
    setDateFilter('all');
    refetch();
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
                      Ledger Stream ({transactions.length})
                    </CardTitle>
                    <Badge variant="primary" dot size="sm">
                      Live Stream
                    </Badge>
                  </div>
                </CardHeader>

                {isLoading ? (
                  <TableSkeleton rows={5} />
                ) : isError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-900 space-y-3">
                    <p className="text-sm font-semibold">Failed to fetch ledger transactions from API.</p>
                    <p className="text-xs text-rose-700">{error?.message || 'Network error'}</p>
                    <Button variant="outline" size="sm" onClick={() => refetch()}>
                      Retry API Request
                    </Button>
                  </div>
                ) : (
                  <TransactionTable
                    transactions={transactions}
                    onViewDetails={setSelectedTx}
                    onRefresh={handleResetFilters}
                  />
                )}
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
