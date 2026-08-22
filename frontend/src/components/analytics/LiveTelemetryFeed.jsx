import { motion } from 'framer-motion';
import { Zap, Activity } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import useTransactions from '../../hooks/useTransactions';

export default function LiveTelemetryFeed() {
  const { data: transactions = [], isLoading } = useTransactions();

  const liveEvents = transactions.slice(0, 4).map((tx) => ({
    id: tx.txId || tx.id,
    text: `Stellar Testnet transaction executed for ${tx.device || 'Wallet'}`,
    amount: tx.amount ? `${tx.amount} XLM` : '--',
    time: tx.timestamp || 'Recent',
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
            <CardTitle className="text-base font-semibold text-[#0F172A]">Real-Time Event Feed</CardTitle>
          </div>
          <Badge variant="success" dot size="sm">
            Live Stream
          </Badge>
        </div>
        <CardDescription className="text-xs">Real-time ledger events on Stellar Core</CardDescription>
      </CardHeader>

      {isLoading ? (
        <div className="py-8 text-center text-xs text-[#64748B]">Loading event feed...</div>
      ) : liveEvents.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No Live Events"
          description="No recent ledger events recorded for this wallet account."
        />
      ) : (
        <div className="space-y-3">
          {liveEvents.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="h-4 w-4 text-[#0F766E] shrink-0" />
                <div>
                  <p className="font-medium text-[#0F172A]">{ev.text}</p>
                  <p className="text-[10px] text-[#64748B]">{ev.time}</p>
                </div>
              </div>
              <span className="font-mono font-bold text-[#0F766E] shrink-0 ml-2">{ev.amount}</span>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
