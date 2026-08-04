import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Copy, Check, ExternalLink } from 'lucide-react';
import StatusBadge from '../dashboard/StatusBadge';

export default function TransactionCard({ tx, onViewDetails }) {
  const [copiedKey, setCopiedKey] = useState(false);

  const copyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tx.txId);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div
      onClick={() => onViewDetails(tx)}
      className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3 transition-colors active:bg-[#EAF8F6] cursor-pointer"
    >
      {/* Header: Amount, Direction & Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
              tx.amount.startsWith('+')
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'
            }`}
          >
            {tx.amount.startsWith('+') ? (
              <ArrowDownLeft className="h-5 w-5" />
            ) : (
              <ArrowUpRight className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-base font-bold font-mono text-[#0F172A]">{tx.amount}</p>
            <p className="text-xs text-[#64748B]">{tx.asset}</p>
          </div>
        </div>
        <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
      </div>

      {/* Details Grid */}
      <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0] text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Transaction ID</span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[#0F766E] font-semibold">{tx.txId}</span>
            <button
              type="button"
              onClick={copyId}
              className="text-[#64748B] hover:text-[#0F766E] p-1"
            >
              {copiedKey ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Device</span>
          <span className="font-semibold text-[#0F172A]">{tx.device}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Wallet</span>
          <span className="font-mono text-[#0F172A]">{tx.wallet}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Settlement Time</span>
          <span className="text-[#64748B]">{tx.timestamp}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Network</span>
          <span className="font-medium text-[#0F172A]">{tx.network}</span>
        </div>
      </div>

      {/* Footer Action */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(tx);
        }}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#0F766E] bg-white border border-teal-200 rounded-xl transition-colors active:bg-teal-50"
      >
        View Details
        <ExternalLink className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
