import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from '../dashboard/StatusBadge';
import Badge from '../ui/Badge';
import { useStellarTransactions } from '../../hooks/useStellar';

export default function WalletTransactionsTable({ publicKey }) {
  const [copiedId, setCopiedId] = useState(null);

  const activeKey = publicKey || 'GD6WTVMWBX227SYP5T5GZ2H4P5V2K3L4M5N6P7Q8R9S0T1U2V3W4X5Y6';

  const { data: transactions = [] } = useStellarTransactions(activeKey);

  const walletTxs = transactions.length > 0
    ? transactions.map((tx) => ({
        txId: tx.id ? tx.id.substring(0, 10) : 'WTX-STLR',
        type: tx.operationCount > 1 ? 'Batch Payment' : 'XLM Payment',
        amount: tx.feePaid || '0.00001 XLM',
        asset: 'XLM Native',
        status: tx.successful ? 'settled' : 'failed',
        date: tx.createdAt ? new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
        wallet: tx.sourceAccount ? `${tx.sourceAccount.substring(0, 4)}...${tx.sourceAccount.substring(tx.sourceAccount.length - 4)}` : `${activeKey.substring(0, 4)}...${activeKey.substring(activeKey.length - 4)}`,
      }))
    : [
        { txId: 'WTX-9842', type: 'Incoming Deposit', amount: '+ 2,500.00 XLM', asset: 'XLM Native', status: 'settled', date: '10s ago', wallet: `${activeKey.substring(0, 4)}...${activeKey.substring(activeKey.length - 4)}` },
        { txId: 'WTX-8711', type: 'Micro-settlement', amount: '- 150.00 USDC', asset: 'USDC Anchored', status: 'settled', date: '45s ago', wallet: 'GB7M...0H1G' },
        { txId: 'WTX-6520', type: 'Soroban Vault Topup', amount: '- 50.00 XLM', asset: 'XLM Native', status: 'settled', date: '2m ago', wallet: 'GC98...90K9' },
        { txId: 'WTX-4310', type: 'Relay Yield Payment', amount: '+ 890.00 XLM', asset: 'XLM Native', status: 'settled', date: '12m ago', wallet: 'GD12...ABCD' },
      ];

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Recent Wallet Activity</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Ledger entries for primary vault account</CardDescription>
          </div>
          <Badge variant="primary" dot size="sm">
            Stellar Testnet Horizon
          </Badge>
        </div>
      </CardHeader>

      {/* Mobile Card Layout (< md) */}
      <div className="grid gap-3 md:hidden">
        {walletTxs.map((tx) => (
          <div key={tx.txId} className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center border ${tx.amount.startsWith('+') || !tx.amount.startsWith('-') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'}`}>
                  {tx.amount.startsWith('+') || !tx.amount.startsWith('-') ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">{tx.type}</p>
                  <p className="text-xs text-[#64748B] font-mono">{tx.txId}</p>
                </div>
              </div>
              <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
              <div>
                <span className="text-[#64748B]">Amount: </span>
                <span className={`font-mono font-bold ${tx.amount.startsWith('+') || !tx.amount.startsWith('-') ? 'text-emerald-700' : 'text-[#0F172A]'}`}>{tx.amount}</span>
              </div>
              <div>
                <span className="text-[#64748B]">Date: </span>
                <span className="text-[#0F172A]">{tx.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {['Transaction ID', 'Type', 'Amount', 'Asset', 'Status', 'Date', 'Wallet', 'Actions'].map((heading) => (
                  <th key={heading} className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] bg-white">
              {walletTxs.map((tx) => (
                <tr key={tx.txId} className="transition-colors hover:bg-[#FAF8FF]">
                  <td className="px-4 py-4 font-mono text-xs font-semibold text-[#0F766E] sm:px-6">{tx.txId}</td>
                  <td className="px-4 py-4 text-sm font-medium text-[#0F172A] sm:px-6">{tx.type}</td>
                  <td className="px-4 py-4 font-mono text-sm font-bold text-[#0F172A] sm:px-6">{tx.amount}</td>
                  <td className="px-4 py-4 text-xs text-[#475569] sm:px-6">{tx.asset}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <StatusBadge status={tx.status}>{tx.status}</StatusBadge>
                  </td>
                  <td className="px-4 py-4 text-xs text-[#64748B] sm:px-6">{tx.date}</td>
                  <td className="px-4 py-4 font-mono text-xs text-[#0F172A] sm:px-6">{tx.wallet}</td>
                  <td className="px-4 py-4 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => copyText(tx.txId, tx.txId)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
                    >
                      {copiedId === tx.txId ? 'Copied' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
