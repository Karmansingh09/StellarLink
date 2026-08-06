import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from '../dashboard/StatusBadge';
import Badge from '../ui/Badge';
import { Cpu, Zap, Radio, BatteryCharging } from 'lucide-react';
import useDevices from '../../hooks/useDevices';

export default function ConnectedDeviceWallets() {
  const { data: devices = [] } = useDevices();

  const iconMap = { 'EV Charger': Zap, 'Autonomous Robot': Cpu, 'Microgrid Relay': Radio, 'Smart Sensor': BatteryCharging };

  const deviceWallets = devices.slice(0, 4).map((d) => ({
    name: d.name,
    type: d.type || 'Terminal',
    wallet: `${d.wallet.substring(0, 4)}...${d.wallet.substring(d.wallet.length - 4)}`,
    balance: d.balance || '1,000.00 XLM',
    status: d.status,
    lastSync: d.lastHeartbeat || '12s ago',
    icon: iconMap[d.type] || Zap,
  }));

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Connected Device Wallets</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Machine endpoint wallets authorized for Soroban micro-settlements</CardDescription>
          </div>
          <Badge variant="neutral" size="sm">
            Simulated Enterprise Fleet
          </Badge>
        </div>
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
