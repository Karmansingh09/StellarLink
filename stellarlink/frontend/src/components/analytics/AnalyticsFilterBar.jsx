import { useState } from 'react';
import { Calendar, Cpu, Globe, Download, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export default function AnalyticsFilterBar({
  dateRange,
  onDateChange,
  deviceType,
  onDeviceChange,
  network,
  onNetworkChange,
  onRefresh,
}) {
  const { addToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      addToast('Executive Analytics report exported (PDF & CSV)', 'success');
    }, 800);
  };

  const handleRefreshClick = () => {
    setIsSpinning(true);
    onRefresh();
    addToast('Analytics telemetry dataset refreshed', 'info');
    setTimeout(() => setIsSpinning(false), 600);
  };

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-[#E2E8F0] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
        {/* Date Range Picker */}
        <div className="relative flex items-center">
          <Calendar className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={dateRange}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-8 pr-7 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        {/* Device Type Filter */}
        <div className="relative flex items-center">
          <Cpu className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={deviceType}
            onChange={(e) => onDeviceChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-8 pr-7 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Device Types</option>
            <option value="EV Charger">EV Charger</option>
            <option value="Autonomous Robot">Autonomous Robot</option>
            <option value="Microgrid Relay">Microgrid Relay</option>
            <option value="Smart Sensor">Smart Sensor</option>
          </select>
        </div>

        {/* Network Environment */}
        <div className="relative flex items-center">
          <Globe className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={network}
            onChange={(e) => onNetworkChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-8 pr-7 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Networks</option>
            <option value="mainnet">Stellar Mainnet</option>
            <option value="testnet">Testnet</option>
            <option value="soroban">Soroban RPC</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-end lg:self-auto">
        <button
          type="button"
          onClick={handleRefreshClick}
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#D9E2E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F766E] transition-colors cursor-pointer"
          title="Refresh Analytics"
        >
          <RefreshCw className={`h-4 w-4 ${isSpinning ? 'animate-spin text-[#0F766E]' : ''}`} />
        </button>

        <Button
          variant="outline"
          size="md"
          onClick={handleExport}
          isLoading={isExporting}
          className="gap-2 min-h-[44px]"
        >
          <Download className="h-4 w-4" />
          <span>{isExporting ? 'Exporting...' : 'Export Analytics'}</span>
        </Button>
      </div>
    </div>
  );
}
