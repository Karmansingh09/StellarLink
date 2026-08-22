import { useState, useMemo } from 'react';
import { Copy, Check, ExternalLink, ArrowUpDown, ChevronLeft, ChevronRight, FileCode, Layers, Activity, Sparkles } from 'lucide-react';
import StatusBadge from '../dashboard/StatusBadge';
import TransactionCard from './TransactionCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { SOROBAN_CONTRACTS } from '../../config/contracts';

export default function TransactionTable({ transactions, onViewDetails, onRefresh }) {
  const { addToast } = useToast();
  const [copiedKey, setCopiedKey] = useState(null);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(sortedTransactions.length / pageSize) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedTransactions.slice(start, start + pageSize);
  }, [sortedTransactions, currentPage, pageSize]);

  const copyText = (text, keyId, label = 'Transaction ID') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    addToast(`${label} copied to clipboard`, 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-14 text-center border border-[#E2E8F0] rounded-[20px] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-teal-100/60 animate-ping" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200/80 text-[#0F766E] shadow-2xs">
            <Layers className="h-7 w-7" />
          </div>
        </div>

        <div className="max-w-md space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="primary" dot size="sm">
              Live Horizon RPC Channel
            </Badge>
          </div>
          <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-[#0F172A]">
            No Transactions Found
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            No financial settlement entries match your current search or filter criteria. The Stellar Testnet ledger stream is active and listening for incoming payments.
          </p>
        </div>

        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh} className="rounded-xl font-semibold shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-[#0F766E]" />
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card Layout (< md) */}
      <div className="grid gap-3 md:hidden">
        {paginatedTransactions.map((tx) => (
          <TransactionCard key={tx.txId} tx={tx} onViewDetails={onViewDetails} />
        ))}
      </div>

      {/* Desktop Table View (>= md) with Sticky Headers & Sorting */}
      <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
            <thead className="bg-[#F8FAFC] sticky top-0 z-10 shadow-xs">
              <tr>
                {[
                  { label: 'Transaction ID', field: 'txId' },
                  { label: 'Soroban Contract ID', field: 'contractId' },
                  { label: 'Device', field: 'device' },
                  { label: 'Amount', field: 'amount' },
                  { label: 'Status', field: 'status' },
                  { label: 'Settlement Time', field: 'timestamp' },
                ].map((col) => (
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6 cursor-pointer hover:text-[#0F172A] transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      <ArrowUpDown className="h-3 w-3 opacity-60" />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] bg-white">
              {paginatedTransactions.map((tx) => {
                const contractId = tx.contractId || SOROBAN_CONTRACTS.deviceRegistry;
                return (
                  <tr
                    key={tx.txId}
                    onClick={() => onViewDetails(tx)}
                    className="group cursor-pointer transition-all duration-150 hover:bg-[#F0FDF4]/60"
                  >
                    {/* Transaction ID */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0F766E] group-hover:text-[#115E59]">
                        <span>{tx.txId}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyText(tx.txId, `tx-${tx.txId}`, 'Transaction ID');
                          }}
                          className="text-[#64748B] hover:text-[#0F766E] p-1 transition-colors"
                          title="Copy Transaction ID"
                        >
                          {copiedKey === `tx-${tx.txId}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 animate-in fade-in" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Soroban Contract ID */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-1.5">
                        <FileCode className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                        <span className="font-mono text-xs text-[#0F172A] bg-teal-50/80 border border-teal-200/60 px-2 py-0.5 rounded-lg shadow-2xs">
                          {contractId.substring(0, 8)}...{contractId.substring(contractId.length - 4)}
                        </span>
                      </div>
                    </td>

                    {/* Device */}
                    <td className="px-4 py-4 text-sm font-semibold text-[#0F172A] sm:px-6">
                      {tx.device}
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 font-mono text-sm font-bold text-[#0F172A] sm:px-6">
                      <span className={tx.amount.startsWith('+') ? 'text-emerald-700' : 'text-[#0F172A]'}>
                        {tx.amount}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 sm:px-6">
                      <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
                    </td>

                    {/* Settlement Time */}
                    <td className="px-4 py-4 text-xs font-mono text-[#64748B] sm:px-6">
                      {tx.timestamp}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(tx);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 px-2.5 py-1 rounded-xl transition-all shadow-2xs"
                        >
                          View
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-[#E2E8F0]">
        <p className="text-xs text-[#64748B]">
          Showing <span className="font-semibold text-[#0F172A]">{(currentPage - 1) * pageSize + 1}</span> to{' '}
          <span className="font-semibold text-[#0F172A]">
            {Math.min(currentPage * pageSize, sortedTransactions.length)}
          </span>{' '}
          of <span className="font-semibold text-[#0F172A]">{sortedTransactions.length}</span> transactions
        </p>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-9 items-center justify-center gap-1 px-3 rounded-xl border border-[#D9E2E1] bg-white text-xs font-semibold text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <span className="text-xs font-semibold text-[#0F766E] px-2 py-1 bg-teal-50 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-9 items-center justify-center gap-1 px-3 rounded-xl border border-[#D9E2E1] bg-white text-xs font-semibold text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
