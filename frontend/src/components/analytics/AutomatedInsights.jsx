import { Sparkles, Cpu, ShieldCheck, Globe } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import useDevices from '../../hooks/useDevices';
import useAnalytics from '../../hooks/useAnalytics';

export default function AutomatedInsights() {
  const { data: devices = [] } = useDevices();
  const { data: metrics } = useAnalytics();

  const totalCount = devices.length;
  const activeCount = devices.filter((d) => ['active', 'settled', 'monitoring'].includes((d.status || '').toLowerCase())).length;

  const insights = [
    {
      title: 'Registered Fleet Size',
      text: `${totalCount} total device endpoints registered (${activeCount} currently active & healthy).`,
      icon: Cpu,
      highlight: `${totalCount} Devices`,
    },
    {
      title: 'Stellar Testnet Sync',
      text: `Ledger sequence ${metrics?.latestLedgerSequence ? `#${metrics.latestLedgerSequence}` : 'active'} connected via Horizon RPC (Ledger close cadence: ${metrics?.ledgerCloseCadenceMs || 'N/A'}).`,
      icon: Globe,
      highlight: 'Testnet Horizon',
    },
    {
      title: 'Soroban Smart Contracts',
      text: 'Payment escrow, device permissions, and settlement contracts compiled & verified on Soroban WASM.',
      icon: ShieldCheck,
      highlight: 'Protocol 21',
    },
  ];

  return (
    <Card padding="generous" className="bg-gradient-to-br from-white to-[#F8FAFC]">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0F766E]" />
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Automated Network Insights</CardTitle>
          </div>
          <Badge variant="primary" dot size="sm">
            Operational Telemetry
          </Badge>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.title} className="p-4 rounded-2xl border border-[#E2E8F0] bg-white space-y-2 shadow-xs min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A] truncate">
                  <Icon className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <span className="truncate">{insight.title}</span>
                </div>
                <Badge variant="success" size="sm" className="shrink-0">
                  {insight.highlight}
                </Badge>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">{insight.text}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
