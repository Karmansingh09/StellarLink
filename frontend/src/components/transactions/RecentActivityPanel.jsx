import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Activity, Radio, Layers } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import useTransactions from '../../hooks/useTransactions';

export default function RecentActivityPanel({ transactions: transactionsProp, onSelectTx }) {
  const { data: transactionsFromHook = [] } = useTransactions();
  const transactions = transactionsProp || transactionsFromHook;

  const items = (transactions || []).slice(0, 5).map((tx) => ({
    id: tx.txId || tx.id,
    device: tx.device || 'Stellar Terminal',
    amount: tx.amount || '0.00 XLM',
    type: tx.asset || 'Stellar Payment',
    time: tx.timestamp || 'Just now',
    status: tx.status || 'settled',
    rawTx: tx,
  }));

  const hasActivity = items.length > 0;

  return (
    <Card padding="generous" className="h-full">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F766E]" />
            </span>
            <CardTitle className="text-base font-semibold text-[#0F172A]">Recent Activity</CardTitle>
          </div>
          <Badge variant={hasActivity ? 'success' : 'primary'} dot size="sm">
            {hasActivity ? 'Live Stream' : 'Listening'}
          </Badge>
        </div>
        <CardDescription className="text-xs">Real-time telemetry & Horizon ledger events</CardDescription>
      </CardHeader>

      <div className="space-y-3">
        {!hasActivity ? (
          <div className="p-5 text-center border border-dashed border-[#E2E8F0] rounded-2xl bg-[#F8FAFC] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] mx-auto shadow-2xs">
              <Radio className="h-5 w-5 animate-pulse text-[#0F766E]" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#0F172A]">Horizon Telemetry Stream Active</p>
              <p className="text-[11px] text-[#64748B] leading-relaxed max-w-xs mx-auto">
                No recent payment events recorded. Real-time transaction activities will appear here automatically when payments are settled.
              </p>
            </div>
          </div>
        ) : (
          items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => onSelectTx && onSelectTx(item.rawTx)}
              className="group flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F0FDF4]/70 hover:border-teal-200 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center border text-xs font-bold shrink-0 ${
                    item.amount.startsWith('+') || !item.amount.startsWith('-')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                      : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'
                  }`}
                >
                  {item.amount.startsWith('+') || !item.amount.startsWith('-') ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#0F766E] transition-colors">
                    {item.device}
                  </p>
                  <p className="text-[10px] text-[#64748B] truncate flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {item.type}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p
                  className={`text-xs font-mono font-bold ${
                    item.amount.startsWith('+') || !item.amount.startsWith('-') ? 'text-emerald-700' : 'text-[#0F172A]'
                  }`}
                >
                  {item.amount}
                </p>
                <p className="text-[10px] font-mono text-[#64748B]">{item.time}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}
