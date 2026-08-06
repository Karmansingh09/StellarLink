import { ShieldCheck, Server, Database, Globe, Wallet } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';

const healthItems = [
  { label: 'API Latency', value: '24 ms', detail: 'p99 threshold < 50ms', icon: Server, status: 'healthy' },
  { label: 'Database Health', value: '100% Operational', detail: 'Zero failover events', icon: Database, status: 'healthy' },
  { label: 'Blockchain Sync', value: 'Ledger #52894101', detail: 'Stellar Core synced', icon: Globe, status: 'healthy' },
  { label: 'Soroban RPC Status', value: 'Active', detail: 'Smart contracts live', icon: ShieldCheck, status: 'healthy' },
  { label: 'Wallet Services', value: 'Multisig Online', detail: 'Vault keys verified', icon: Wallet, status: 'healthy' },
];

export default function SystemHealthCards() {
  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">System Infrastructure Health</CardTitle>
          <Badge variant="success" dot size="sm">
            All Systems Operational
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm">Real-time status across API gateways, databases, and Stellar nodes</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {healthItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-[#0F766E]" />
                <Badge variant="success" size="sm">
                  {item.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">{item.label}</p>
                <p className="text-sm font-bold font-mono text-[#0F172A]">{item.value}</p>
              </div>
              <p className="text-[10px] text-[#64748B] border-t border-[#E2E8F0] pt-1">{item.detail}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
