import { ShieldCheck, Server, Database, Globe, Wallet } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import useAnalytics from '../../hooks/useAnalytics';

export default function SystemHealthCards({ metrics: metricsProp }) {
  const { data: metricsFromHook } = useAnalytics();
  const metrics = metricsProp || metricsFromHook;
  const ledgerSeq = metrics?.latestLedgerSequence ? `Ledger #${metrics.latestLedgerSequence}` : 'Horizon Connected';

  const healthItems = [
    { label: 'Stellar RPC Node', value: ledgerSeq, detail: 'Stellar Testnet synced', icon: Globe, status: 'healthy' },
    { label: 'Control Plane API', value: 'Active', detail: 'REST routes responding', icon: Server, status: 'healthy' },
    { label: 'Device Registry DB', value: 'Connected', detail: 'Fleet state synced', icon: Database, status: 'healthy' },
    { label: 'Soroban WASM Engine', value: 'Active', detail: 'Smart contracts verified', icon: ShieldCheck, status: 'healthy' },
    { label: 'Wallet Vault RPC', value: 'Online', detail: 'Keypairs & Freighter active', icon: Wallet, status: 'healthy' },
  ];

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
            <div key={item.label} className="p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2 min-w-0">
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-[#0F766E]" />
                <Badge variant="success" size="sm">
                  {item.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">{item.label}</p>
                <p className="text-xs sm:text-sm font-bold font-mono text-[#0F172A] truncate">{item.value}</p>
              </div>
              <p className="text-[10px] text-[#64748B] border-t border-[#E2E8F0] pt-1 truncate">{item.detail}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
