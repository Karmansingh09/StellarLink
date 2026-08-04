import { useState } from 'react';
import { Search, Filter, Plus, Download, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export default function DeviceFilterToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  regionFilter,
  onRegionChange,
  onOpenRegisterModal,
  onRefresh,
}) {
  const { addToast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefreshClick = () => {
    setIsSpinning(true);
    onRefresh();
    addToast('Device telemetry stream refreshed', 'info');
    setTimeout(() => setIsSpinning(false), 600);
  };

  const handleExportCSV = () => {
    addToast('Exported 6 device endpoints to CSV', 'success');
  };

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[260px]">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Device Name, ID, or Stellar Address..."
          className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/15"
        />
      </div>

      {/* Filters & Actions Group */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Select */}
        <div className="relative flex items-center">
          <Filter className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-9 pr-8 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="monitoring">Monitoring</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Region Select */}
        <select
          value={regionFilter}
          onChange={(e) => onRegionChange(e.target.value)}
          className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
        >
          <option value="all">All Regions</option>
          <option value="Europe West">Europe West</option>
          <option value="North America">North America</option>
          <option value="Asia Pacific">Asia Pacific</option>
          <option value="Middle East">Middle East</option>
        </select>

        {/* Refresh button */}
        <button
          type="button"
          onClick={handleRefreshClick}
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#D9E2E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F766E] transition-colors cursor-pointer"
          title="Refresh Device Telemetry"
        >
          <RefreshCw className={`h-4 w-4 ${isSpinning ? 'animate-spin text-[#0F766E]' : ''}`} />
        </button>

        {/* Export CSV button */}
        <Button variant="outline" size="md" onClick={handleExportCSV} className="gap-2 min-h-[44px]">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </Button>

        {/* Register Device Button */}
        <Button
          variant="primary"
          size="md"
          onClick={onOpenRegisterModal}
          className="gap-2 min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          <span>Register Device</span>
        </Button>
      </div>
    </div>
  );
}
