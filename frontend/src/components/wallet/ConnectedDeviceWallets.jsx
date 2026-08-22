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
    balance: d.balance || '0.00 XLM',
    status: d.status,
    lastSync: d.lastHeartbeat || '--',
    icon: iconMap[d.type] || Zap,
  }));

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Connected Device Wallets</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Machine endpoint wallets authorized for Soroban micro-settlements</CardDescription>
          </div>
          <Badge variant="neutral" size="sm" className="whitespace-nowrap shrink-0">
            Enterprise Fleet
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
              className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3 min-w-0"
            >
              {/* Header Row: Icon, Device Type, and Status Badge */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#0F766E] shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B] truncate">{dw.type}</span>
                </div>
                <StatusBadge status={dw.status} className="shrink-0 text-[10px] py-0.5 px-2">
                  {dw.status}
                </StatusBadge>
              </div>

              {/* Device Name Row: Dedicated line to prevent horizontal squeezing */}
              <div className="min-w-0 pt-0.5">
                <p className="text-xs sm:text-sm font-bold text-[#0F172A] truncate" title={dw.name}>
                  {dw.name}
                </p>
              </div>

              {/* Wallet Details Table */}
              <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#64748B] shrink-0">Wallet Address</span>
                  <span className="font-mono text-[#0F172A] truncate">{dw.wallet}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#64748B] shrink-0">Balance</span>
                  <span className="font-mono font-bold text-[#0F766E] shrink-0">{dw.balance}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#64748B] shrink-0">Last Sync</span>
                  <span className="text-[#64748B] shrink-0">{dw.lastSync}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
