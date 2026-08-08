import { useState, useMemo } from 'react';
import { Copy, Check, ExternalLink, ArrowUpDown, ChevronLeft, ChevronRight, FileCode } from 'lucide-react';
import StatusBadge from '../dashboard/StatusBadge';
import TransactionCard from './TransactionCard';
import EmptyState from '../ui/EmptyState';
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
      <EmptyState
        title="No transactions found"
        description="No financial ledger entries match your filter or search criteria."
        onAction={onRefresh}
        actionText="Reset Filters"
      />
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
                    className="cursor-pointer transition-colors hover:bg-[#FAF8FF]"
                  >
                    {/* Transaction ID */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0F766E]">
                        <span>{tx.txId}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyText(tx.txId, `tx-${tx.txId}`, 'Transaction ID');
                          }}
                          className="text-[#64748B] hover:text-[#0F766E] p-1"
                          title="Copy Transaction ID"
                        >
                          {copiedKey === `tx-${tx.txId}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
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
                        <span className="font-mono text-xs text-[#0F172A] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
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
                      {tx.amount}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 sm:px-6">
                      <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
                    </td>

                    {/* Settlement Time */}
                    <td className="px-4 py-4 text-xs text-[#64748B] sm:px-6">
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
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-xl transition-colors"
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
