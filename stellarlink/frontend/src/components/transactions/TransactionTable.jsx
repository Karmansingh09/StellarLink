import { useState } from 'react';
import { Copy, Check, ExternalLink, MoreVertical, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import StatusBadge from '../dashboard/StatusBadge';
import TransactionCard from './TransactionCard';
import Button from '../ui/Button';

export default function TransactionTable({ transactions, onViewDetails, onRefresh }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = (text, keyId) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-[#E2E8F0] rounded-2xl bg-white space-y-4">
        <div className="h-16 w-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E]">
          <ExternalLink className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0F172A]">No transactions found</h3>
          <p className="text-sm text-[#64748B] mt-1">Try resetting your search query or filters.</p>
        </div>
        <Button variant="outline" size="md" onClick={onRefresh}>
          Refresh Ledger
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout (< md) */}
      <div className="grid gap-3 md:hidden">
        {transactions.map((tx) => (
          <TransactionCard key={tx.txId} tx={tx} onViewDetails={onViewDetails} />
        ))}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {[
                  'Transaction ID',
                  'Device',
                  'Wallet',
                  'Amount',
                  'Asset',
                  'Status',
                  'Settlement Time',
                  'Network',
                  'Actions',
                ].map((heading) => (
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
              {transactions.map((tx) => (
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
                          copyText(tx.txId, `tx-${tx.txId}`);
                        }}
                        className="text-[#64748B] hover:text-[#0F766E] p-1"
                        title="Copy Transaction ID"
                      >
                        {copiedKey === `tx-${tx.txId}` ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Device */}
                  <td className="px-4 py-4 text-sm font-semibold text-[#0F172A] sm:px-6">
                    {tx.device}
                  </td>

                  {/* Wallet */}
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-[#0F172A] bg-slate-50 border border-[#E2E8F0] px-2 py-0.5 rounded">
                        {tx.wallet}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyText(tx.fullWallet || tx.wallet, `w-${tx.txId}`);
                        }}
                        className="text-[#64748B] hover:text-[#0F766E] p-1"
                        title="Copy Wallet Address"
                      >
                        {copiedKey === `w-${tx.txId}` ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4 font-mono text-sm font-bold text-[#0F172A] sm:px-6">
                    {tx.amount}
                  </td>

                  {/* Asset */}
                  <td className="px-4 py-4 text-xs font-semibold text-[#475569] sm:px-6">
                    {tx.asset}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 sm:px-6">
                    <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
                  </td>

                  {/* Settlement Time */}
                  <td className="px-4 py-4 text-xs text-[#64748B] sm:px-6">
                    {tx.timestamp}
                  </td>

                  {/* Network */}
                  <td className="px-4 py-4 text-xs font-medium text-[#0F172A] sm:px-6">
                    {tx.network}
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
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-[#64748B] hover:text-[#0F172A]"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
