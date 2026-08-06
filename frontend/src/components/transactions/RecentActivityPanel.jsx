import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import useTransactions from '../../hooks/useTransactions';

export default function RecentActivityPanel({ onSelectTx }) {
  const { data: transactions = [] } = useTransactions();

  const items = transactions.slice(0, 5).map((tx) => ({
    id: tx.txId || tx.id,
    device: tx.device || 'Stellar Terminal',
    amount: tx.amount || '0.00 XLM',
    type: tx.asset || 'Stellar Payment',
    time: tx.timestamp || 'Just now',
    rawTx: tx,
  }));

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
          <Badge variant="success" dot size="sm">
            Live Stream
          </Badge>
        </div>
        <CardDescription className="text-xs">Real-time ledger events on Stellar Core</CardDescription>
      </CardHeader>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelectTx && onSelectTx(item.rawTx)}
            className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center border text-xs font-bold ${
                  item.amount.startsWith('+') || !item.amount.startsWith('-')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'
                }`}
              >
                {item.amount.startsWith('+') || !item.amount.startsWith('-') ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">{item.device}</p>
                <p className="text-[10px] text-[#64748B]">{item.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-xs font-mono font-bold ${
                  item.amount.startsWith('+') || !item.amount.startsWith('-') ? 'text-emerald-700' : 'text-[#0F172A]'
                }`}
              >
                {item.amount}
              </p>
              <p className="text-[10px] text-[#64748B]">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
