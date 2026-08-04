import { ShieldCheck, Lock, HardDrive, Cpu, Globe, FileCode } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';

const sidebarItems = [
  { label: 'Connected Contracts', value: '4 Soroban Contracts', icon: FileCode, status: 'Deployed' },
  { label: 'Contract Escrow Locked', value: '12,500.00 XLM', icon: Lock, status: 'Escrow Safe' },
  { label: 'Security Status', value: 'HSM Key Enclave', icon: ShieldCheck, status: 'Verified' },
  { label: 'Connected Devices', value: '1,284 Endpoints', icon: Cpu, status: 'Active' },
  { label: 'Network Environment', value: 'Stellar Testnet', icon: Globe, status: 'Connected' },
];

export default function WalletRightSidebar() {
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
            <div key={item.label} className="p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#64748B]">
                  <Icon className="h-3.5 w-3.5 text-[#0F766E]" />
                  <span>{item.label}</span>
                </div>
                <Badge variant="success" size="sm">
                  {item.status}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-[#0F172A] font-mono pl-5">{item.value}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
