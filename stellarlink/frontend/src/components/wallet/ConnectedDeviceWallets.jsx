import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from '../dashboard/StatusBadge';
import { Cpu, Zap, Radio, BatteryCharging } from 'lucide-react';

const deviceWallets = [
  { name: 'EV Charger Node #04', type: 'EV Charger', wallet: 'GAK8...39FL', balance: '1,250.00 XLM', status: 'active', lastSync: '12s ago', icon: Zap },
  { name: 'Autonomous Fleet 11', type: 'Robot', wallet: 'GB7M...0H1G', balance: '2,400.50 XLM', status: 'active', lastSync: '45s ago', icon: Cpu },
  { name: 'Microgrid Relay 02', type: 'Smart Meter', wallet: 'GC98...90K9', balance: '890.00 XLM', status: 'active', lastSync: '2m ago', icon: Radio },
  { name: 'Autonomous Drone 07', type: 'Drone', wallet: 'GE98...FEDC', balance: '3,100.00 XLM', status: 'active', lastSync: '5m ago', icon: BatteryCharging },
];

export default function ConnectedDeviceWallets() {
  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Connected Device Wallets</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Machine endpoint wallets authorized for Soroban micro-settlements</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {deviceWallets.map((dw) => {
          const Icon = dw.icon;
          return (
            <motion.div
              key={dw.name}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#0F766E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] truncate max-w-[130px]">{dw.name}</p>
                    <p className="text-[10px] text-[#64748B]">{dw.type}</p>
                  </div>
                </div>
                <StatusBadge status={dw.status}>{dw.status}</StatusBadge>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Wallet Address</span>
                  <span className="font-mono text-[#0F172A]">{dw.wallet}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Balance</span>
                  <span className="font-mono font-bold text-[#0F766E]">{dw.balance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Last Sync</span>
                  <span className="text-[#64748B]">{dw.lastSync}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
