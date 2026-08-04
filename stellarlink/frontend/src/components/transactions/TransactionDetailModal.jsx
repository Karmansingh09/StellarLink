import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, ExternalLink, ShieldCheck, Zap, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import StatusBadge from '../dashboard/StatusBadge';

export default function TransactionDetailModal({ tx, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!tx) return null;

  const copyId = () => {
    navigator.clipboard.writeText(tx.hash || tx.txId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center border ${
                tx.amount.startsWith('+')
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'
              }`}
            >
              {tx.amount.startsWith('+') ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">Transaction Details</h3>
              <p className="text-xs font-mono text-[#0F766E]">{tx.txId}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Main Amount & Status */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Settlement Amount</p>
              <h2 className="text-2xl font-bold font-mono text-[#0F172A] mt-0.5">{tx.amount}</h2>
            </div>
            <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
          </div>

          {/* Key Value Details Grid */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Stellar Wallet Address</span>
              <span className="font-mono font-semibold text-[#0F172A]">{tx.wallet}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Connected Device</span>
              <span className="font-semibold text-[#0F172A]">{tx.device}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Asset / Token</span>
              <span className="font-semibold text-[#0F766E]">{tx.asset || 'Native XLM'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Network Environment</span>
              <span className="font-medium text-[#0F172A]">{tx.network || 'Stellar Mainnet'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Timestamp</span>
              <span className="text-[#0F172A]">{tx.timestamp}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Transaction Fee</span>
              <span className="font-mono text-[#0F172A]">{tx.fee || '0.00001 XLM'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Memo Payload</span>
              <span className="font-mono text-[#64748B]">{tx.memo || 'M2M-SETTLE-AUTOPAY'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Confirmation Status</span>
              <span className="font-semibold text-emerald-700">Consensus Achieved</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B]">Settlement Duration</span>
              <span className="font-mono font-semibold text-[#0F766E]">{tx.latency || '412 ms'}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-5 sm:p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" size="md" onClick={copyId} className="gap-2">
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied Hash' : 'Copy ID'}</span>
          </Button>

          <div className="flex items-center gap-2">
            <a
              href={`https://stellar.expert/explorer/public/search?term=${tx.hash || tx.txId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0F766E] text-white font-medium text-sm hover:bg-[#115E59] transition-colors"
            >
              <span>Open Explorer</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <Button variant="ghost" size="md" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
