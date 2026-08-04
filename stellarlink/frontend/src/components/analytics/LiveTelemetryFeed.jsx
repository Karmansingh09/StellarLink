import { motion } from 'framer-motion';
import { Activity, Zap, CheckCircle2 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';

const liveEvents = [
  { id: 'EV-8842', text: 'Soroban contract executed settlement for EV-Charging-Node-04', amount: '125.40 XLM', time: '5s ago' },
  { id: 'EV-8841', text: 'Telemetry pulse received from Autonomous-Fleet-11', amount: '412ms', time: '18s ago' },
  { id: 'EV-8840', text: 'Stellar Core validated consensus on Ledger #52894101', amount: 'Mainnet', time: '35s ago' },
  { id: 'EV-8839', text: 'Gas reserve top-up completed for Logistics-Hub-07', amount: '50.00 XLM', time: '1m ago' },
];

export default function LiveTelemetryFeed() {
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
    </Card>
  );
}
