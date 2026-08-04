import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, ArrowDownLeft, Search, Filter, Download, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card, { CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/dashboard/StatusBadge';

const initialTransactions = [
  {
    txId: 'TX-9842-8812',
    hash: '8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e',
    amount: '+ 128.50 XLM',
    type: 'Incoming',
    status: 'settled',
    device: 'EV Charging Node 04',
    wallet: 'GAK8...39FL',
    timestamp: '10s ago (14:28:02)',
    fee: '0.00001 XLM',
  },
  {
    txId: 'TX-8711-4431',
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    amount: '- 45.00 USDC',
    type: 'Micro-settlement',
    status: 'active',
    device: 'Autonomous Fleet 11',
    wallet: 'GB7M...0H1G',
    timestamp: '45s ago (14:27:27)',
    fee: '0.00001 XLM',
  },
  {
    txId: 'TX-6520-2219',
    hash: '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    amount: '+ 890.00 XLM',
    type: 'Relay Payout',
    status: 'settled',
    latency: '389 ms',
    device: 'Microgrid Relay 02',
    wallet: 'GC98...90K9',
    timestamp: '2m ago (14:26:00)',
    fee: '0.00001 XLM',
  },
  {
    txId: 'TX-4310-9901',
    hash: '0f1e2d3c4b5a698778695a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    amount: '- 12.00 XLM',
    type: 'Device Gas Reserve',
    status: 'pending',
    device: 'Logistics Hub 07',
    wallet: 'GD12...ABCD',
    timestamp: '5m ago (14:23:12)',
    fee: '0.00001 XLM',
  },
  {
    txId: 'TX-3209-1142',
    hash: '7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
    amount: '+ 340.20 XLM',
    type: 'Telemetry Payment',
    status: 'settled',
    device: 'Smart Sensor Ring',
    wallet: 'GE98...FEDC',
    timestamp: '12m ago (14:16:40)',
    fee: '0.00001 XLM',
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedTx, setCopiedTx] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(id);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const filteredTxs = initialTransactions.filter((tx) => {
    const matchesSearch =
      searchQuery === '' ||
      tx.txId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.wallet.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || tx.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Header Banner */}
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
                  M2M Transactions
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Real-time cryptographic audit trail of machine-to-machine settlements, automated gas funding, and Soroban contract executions.
                </p>
              </div>
            </div>

            <Button variant="outline" size="md" className="gap-2 self-start lg:self-auto">
              <Download className="h-4 w-4" />
              <span>Export Ledger</span>
            </Button>
          </div>
        </Container>
      </motion.section>

      {/* Filter Toolbar */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-[20px] border border-[#E2E8F0] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search TX ID, Device, or Wallet..."
                className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white px-4 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3]"
              >
                <option value="all">All Statuses</option>
                <option value="settled">Settled</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>

              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#D9E2E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Transactions Container */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <Card padding="generous">
            <CardHeader className="mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">
                  Ledger Transactions ({filteredTxs.length})
                </CardTitle>
                <Badge variant="primary" dot size="sm">
                  Live Stream
                </Badge>
              </div>
            </CardHeader>

            {/* Mobile View: Cards (< md) */}
            <div className="grid gap-3 md:hidden">
              {filteredTxs.map((tx) => (
                <div
                  key={tx.txId}
                  className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${tx.amount.startsWith('+') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'}`}>
                        {tx.amount.startsWith('+') ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-base font-bold font-mono text-[#0F172A]">{tx.amount}</p>
                        <p className="text-xs text-[#64748B]">{tx.type}</p>
                      </div>
                    </div>
                    <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Device</span>
                      <span className="font-semibold text-[#0F172A]">{tx.device}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Wallet</span>
                      <span className="font-mono text-[#0F172A]">{tx.wallet}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Timestamp</span>
                      <span className="text-[#64748B]">{tx.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">TX Hash</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[#0F766E]">{tx.txId}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(tx.hash, tx.txId)}
                          className="text-[#64748B] hover:text-[#0F766E] p-1"
                        >
                          {copiedTx === tx.txId ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table (>= md) */}
            <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0]">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
                  <thead className="bg-[#F8FAFC]">
                    <tr>
                      {['Amount & Type', 'Device', 'Wallet', 'Status', 'Timestamp', 'TX ID'].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] bg-white">
                    {filteredTxs.map((tx) => (
                      <tr key={tx.txId} className="transition-colors hover:bg-[#FAF8FF]">
                        <td className="px-4 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tx.amount.startsWith('+') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'}`}>
                              {tx.amount.startsWith('+') ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold font-mono text-[#0F172A]">{tx.amount}</p>
                              <p className="text-xs text-[#64748B]">{tx.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-[#0F172A] sm:px-6">{tx.device}</td>
                        <td className="px-4 py-4 text-xs font-mono text-[#475569] sm:px-6">{tx.wallet}</td>
                        <td className="px-4 py-4 sm:px-6">
                          <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
                        </td>
                        <td className="px-4 py-4 text-xs text-[#64748B] sm:px-6">{tx.timestamp}</td>
                        <td className="px-4 py-4 text-xs font-mono text-[#0F766E] sm:px-6">{tx.txId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Container>
      </motion.section>
    </motion.div>
  );
}
