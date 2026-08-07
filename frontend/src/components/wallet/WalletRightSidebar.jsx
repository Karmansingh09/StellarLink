import { ShieldCheck, Lock, Cpu, Globe, FileCode } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import useDevices from '../../hooks/useDevices';

export default function WalletRightSidebar({ walletData }) {
  const { data: devices = [] } = useDevices();

  const sidebarItems = [
    { label: 'Connected Contracts', value: '0 Soroban Contracts', icon: FileCode, status: 'Active', badgeVariant: 'primary' },
    { label: 'Contract Escrow Locked', value: walletData?.escrowLocked || '0.00 XLM', icon: Lock, status: 'Stellar Vault', badgeVariant: 'neutral' },
    { label: 'Security Status', value: 'Ed25519 Enclave', icon: ShieldCheck, status: 'Verified', badgeVariant: 'success' },
    { label: 'Connected Devices', value: `${devices.length} Endpoints`, icon: Cpu, status: 'Live RPC', badgeVariant: 'success' },
    { label: 'Network Environment', value: 'Stellar Testnet', icon: Globe, status: 'Live RPC', badgeVariant: 'success' },
  ];

  return (
    <Card padding="generous" className="h-full space-y-4">
      <CardHeader className="mb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-[#0F172A]">Soroban Contract Audit</CardTitle>
          <Badge variant="primary" dot size="sm">
            Live Guard
          </Badge>
        </div>
      </CardHeader>

      <div className="space-y-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2 text-xs min-w-0">
                <div className="flex items-center gap-2 text-[#64748B] min-w-0 flex-1 truncate">
                  <Icon className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                <Badge variant={item.badgeVariant || 'success'} size="sm" className="shrink-0">
                  {item.status}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-[#0F172A] font-mono pl-5 truncate">{item.value}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
