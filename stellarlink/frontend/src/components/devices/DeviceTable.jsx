import { useState, useMemo } from 'react';
import { Copy, Check, ExternalLink, Zap, ArrowUpDown } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from '../dashboard/StatusBadge';
import Badge from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export default function DeviceTable({ devices, onSelectDevice }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const { addToast } = useToast();

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDevices = useMemo(() => {
    return [...devices].sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [devices, sortField, sortDirection]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    addToast('Stellar public key copied to clipboard', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <Card padding="generous" className="h-full">
      <CardHeader className="mb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">
              Connected Endpoints ({sortedDevices.length})
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Autonomous hardware terminals and IoT relay nodes connected to Soroban smart contracts. Click column headers to sort.
            </CardDescription>
          </div>
          <div className="self-start sm:self-auto">
            <Badge variant="primary" dot size="sm">
              Live Feed
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Mobile Card View (< md) */}
      <div className="grid gap-3 md:hidden">
        {sortedDevices.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64748B]">
            No devices match the selected filters.
          </div>
        ) : (
          sortedDevices.map((device) => (
            <div
              key={device.id}
              onClick={() => onSelectDevice(device)}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3 transition-colors active:bg-[#EAF8F6] cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-teal-100 text-[#0F766E]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{device.name}</p>
                    <p className="text-xs font-mono text-[#64748B]">{device.id}</p>
                  </div>
                </div>
                <StatusBadge status={device.status}>{device.status}</StatusBadge>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-xs">
                <span className="text-[#64748B]">Stellar Wallet</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#0F172A]">
                    {device.wallet.substring(0, 6)}...{device.wallet.substring(device.wallet.length - 4)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(device.wallet, device.id);
                    }}
                    className="text-[#64748B] hover:text-[#0F766E] p-1"
                  >
                    {copiedKey === device.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs pt-1 text-center">
                <div className="bg-white p-2 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] uppercase text-[#64748B]">Type</p>
                  <p className="font-medium text-[#0F172A] truncate">{device.type}</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] uppercase text-[#64748B]">Latency</p>
                  <p className="font-medium text-[#0F172A]">{device.latency}</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] uppercase text-[#64748B]">Balance</p>
                  <p className="font-mono font-semibold text-[#0F766E]">{device.balance}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDevice(device);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#0F766E] bg-white border border-teal-200 rounded-xl transition-colors active:bg-teal-50"
              >
                Inspect Telemetry & Keys
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View (>= md) with Sticky Headers & Sorting */}
      <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0] max-h-[600px] overflow-y-auto">
        <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
          <thead className="bg-[#F8FAFC] sticky top-0 z-10 shadow-xs">
            <tr>
              {[
                { label: 'Device & ID', field: 'name' },
                { label: 'Stellar Wallet', field: 'wallet' },
                { label: 'Type / Region', field: 'type' },
                { label: 'Status', field: 'status' },
                { label: 'Latency / Volume', field: 'latency' },
                { label: 'Balance', field: 'balance' },
              ].map((col) => (
                <th
                  key={col.field}
                  onClick={() => handleSort(col.field)}
                  className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6 cursor-pointer hover:text-[#0F172A] transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </th>
              ))}
              <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B] sm:px-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] bg-white">
            {sortedDevices.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-[#64748B]">
                  No devices match the selected filters.
                </td>
              </tr>
            ) : (
              sortedDevices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => onSelectDevice(device)}
                  className="cursor-pointer transition-colors hover:bg-[#FAF8FF]"
                >
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E]">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A] hover:text-[#0F766E]">
                          {device.name}
                        </p>
                        <p className="text-xs font-mono text-[#64748B]">{device.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#0F172A] bg-slate-50 border border-[#E2E8F0] px-2.5 py-1 rounded-lg">
                        {device.wallet.substring(0, 6)}...{device.wallet.substring(device.wallet.length - 4)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(device.wallet, device.id);
                        }}
                        className="text-[#64748B] hover:text-[#0F766E] transition-colors p-1"
                        title="Copy Stellar Public Key"
                      >
                        {copiedKey === device.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-[#475569] sm:px-6">
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{device.type}</p>
                      <p className="text-xs text-[#64748B]">{device.region}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <StatusBadge status={device.status}>{device.status}</StatusBadge>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{device.latency}</p>
                      <p className="text-xs text-[#64748B]">{device.volume}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <p className="font-mono text-sm font-semibold text-[#0F766E]">
                      {device.balance}
                    </p>
                  </td>

                  <td className="px-4 py-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDevice(device);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] bg-teal-50 border border-teal-200/60 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      Inspect
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
