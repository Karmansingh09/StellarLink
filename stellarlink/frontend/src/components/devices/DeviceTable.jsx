import { useState, useMemo } from 'react';
import { Copy, Check, ExternalLink, Zap, ArrowUpDown, Battery, Wifi, ChevronLeft, ChevronRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import StatusBadge from '../dashboard/StatusBadge';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { useToast } from '../../context/ToastContext';

export default function DeviceTable({ devices, onSelectDevice, onResetFilters }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
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

  // Pagination logic
  const totalPages = Math.ceil(sortedDevices.length / pageSize) || 1;
  const paginatedDevices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedDevices.slice(start, start + pageSize);
  }, [sortedDevices, currentPage, pageSize]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    addToast('Stellar public key copied to clipboard', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <Card padding="generous" className="h-full space-y-4">
      <CardHeader className="mb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">
              Connected Endpoints ({devices.length})
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Autonomous hardware terminals and IoT relay nodes connected to Soroban smart contracts.
            </CardDescription>
          </div>
          <div className="self-start sm:self-auto">
            <Badge variant="primary" dot size="sm">
              Live Fleet Stream
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Empty State Handling */}
      {devices.length === 0 ? (
        <EmptyState
          title="No device endpoints found"
          description="No hardware terminals match your search or filter parameters."
          onAction={onResetFilters}
        />
      ) : (
        <>
          {/* Mobile Card View (< md) */}
          <div className="grid gap-3 md:hidden">
            {paginatedDevices.map((device) => {
              const healthScore = device.health || (device.status === 'active' ? 98 : device.status === 'monitoring' ? 85 : device.status === 'pending' ? 70 : 0);
              const heartbeat = device.heartbeat || '12s ago';
              const battery = device.battery || '94%';
              const signal = device.signal || '92 dBm';

              return (
                <div
                  key={device.id}
                  onClick={() => onSelectDevice(device)}
                  className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3 transition-all hover:border-[#CBE9E3] hover:bg-white active:bg-[#EAF8F6] cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-teal-100 text-[#0F766E]">
                        <Zap className="h-5 w-5" />
                        {device.status === 'active' && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{device.name}</p>
                        <p className="text-xs font-mono text-[#64748B]">{device.id}</p>
                      </div>
                    </div>
                    <StatusBadge status={device.status}>{device.status}</StatusBadge>
                  </div>

                  {/* Health Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#64748B]">Node Health</span>
                      <span className="font-semibold text-[#0F766E]">{healthScore}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${healthScore > 80 ? 'bg-[#0F766E]' : healthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${healthScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-xs">
                    <span className="text-[#64748B]">Stellar Public Key</span>
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
                      <p className="text-[10px] uppercase text-[#64748B]">Heartbeat</p>
                      <p className="font-medium text-[#0F172A]">{heartbeat}</p>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-[#E2E8F0]">
                      <p className="text-[10px] uppercase text-[#64748B]">Battery</p>
                      <p className="font-medium text-[#0F172A]">{battery}</p>
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
              );
            })}
          </div>

          {/* Desktop Table View (>= md) with Sticky Headers & Sorting */}
          <div className="hidden md:block overflow-hidden rounded-[16px] border border-[#E2E8F0]">
            <table className="min-w-full divide-y divide-[#E2E8F0] text-left">
              <thead className="bg-[#F8FAFC] sticky top-0 z-10 shadow-xs">
                <tr>
                  {[
                    { label: 'Device & ID', field: 'name' },
                    { label: 'Stellar Wallet', field: 'wallet' },
                    { label: 'Health & Status', field: 'status' },
                    { label: 'Telemetry & Latency', field: 'latency' },
                    { label: 'Power & Signal', field: 'battery' },
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
                {paginatedDevices.map((device) => {
                  const healthScore = device.health || (device.status === 'active' ? 98 : device.status === 'monitoring' ? 85 : device.status === 'pending' ? 70 : 0);
                  const heartbeat = device.heartbeat || '12s ago';
                  const battery = device.battery || '94%';

                  return (
                    <tr
                      key={device.id}
                      onClick={() => onSelectDevice(device)}
                      className="cursor-pointer transition-colors hover:bg-[#FAF8FF]"
                    >
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E]">
                            <Zap className="h-5 w-5" />
                            {device.status === 'active' && (
                              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                              </span>
                            )}
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

                      <td className="px-4 py-4 sm:px-6">
                        <div className="space-y-1 min-w-[130px]">
                          <div className="flex items-center justify-between gap-2">
                            <StatusBadge status={device.status}>{device.status}</StatusBadge>
                            <span className="text-[10px] font-bold text-[#0F766E]">{healthScore}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${healthScore > 80 ? 'bg-[#0F766E]' : healthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${healthScore}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 sm:px-6">
                        <div>
                          <p className="text-sm font-semibold text-[#0F172A]">{device.latency}</p>
                          <p className="text-xs text-[#64748B]">Sync: {heartbeat}</p>
                        </div>
                      </td>

                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3 text-xs text-[#475569]">
                          <div className="flex items-center gap-1" title="Battery Level">
                            <Battery className="h-3.5 w-3.5 text-[#0F766E]" />
                            <span>{battery}</span>
                          </div>
                          <div className="flex items-center gap-1" title="Cellular/IoT Signal">
                            <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                            <span>5G</span>
                          </div>
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
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              Showing <span className="font-semibold text-[#0F172A]">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-semibold text-[#0F172A]">
                {Math.min(currentPage * pageSize, sortedDevices.length)}
              </span>{' '}
              of <span className="font-semibold text-[#0F172A]">{sortedDevices.length}</span> endpoints
            </p>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex h-9 items-center justify-center gap-1 px-3 rounded-xl border border-[#D9E2E1] bg-white text-xs font-semibold text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-xs font-semibold text-[#0F766E] px-2 py-1 bg-teal-50 rounded-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-9 items-center justify-center gap-1 px-3 rounded-xl border border-[#D9E2E1] bg-white text-xs font-semibold text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
