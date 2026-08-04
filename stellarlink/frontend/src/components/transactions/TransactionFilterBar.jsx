import { useState, useEffect } from 'react';
import { Search, Filter, Download, RefreshCw, Calendar, Cpu } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export default function TransactionFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  deviceFilter,
  onDeviceChange,
  dateFilter,
  onDateChange,
  onRefresh,
}) {
  const { addToast } = useToast();
  const [internalQuery, setInternalQuery] = useState(searchQuery);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Debounce search input (250ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(internalQuery);
    }, 250);

    return () => clearTimeout(handler);
  }, [internalQuery, onSearchChange]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      addToast('Stellar transaction ledger exported to CSV', 'success');
    }, 800);
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    addToast('Transaction stream updated from Stellar Core', 'info');
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-[#E2E8F0] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input with Debounce */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="search"
          value={internalQuery}
          onChange={(e) => setInternalQuery(e.target.value)}
          placeholder="Search transaction ID, wallet, or device..."
          className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/15"
        />
      </div>

      {/* Dropdown Filters & Actions Group */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Status Dropdown */}
        <div className="relative flex items-center">
          <Filter className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-8 pr-7 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Device Dropdown */}
        <div className="relative flex items-center">
          <Cpu className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={deviceFilter}
            onChange={(e) => onDeviceChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-8 pr-7 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Devices</option>
            <option value="EV Charger #04">EV Charger #04</option>
            <option value="Autonomous Fleet 11">Autonomous Fleet 11</option>
            <option value="Microgrid Relay 02">Microgrid Relay 02</option>
            <option value="Logistics Hub 07">Logistics Hub 07</option>
            <option value="Smart Sensor Ring">Smart Sensor Ring</option>
          </select>
        </div>

        {/* Date Range Picker */}
        <div className="relative flex items-center">
          <Calendar className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#64748B]" />
          <select
            value={dateFilter}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-11 appearance-none rounded-[14px] border border-[#D9E2E1] bg-white pl-8 pr-7 text-xs font-semibold text-[#0F172A] outline-none cursor-pointer hover:border-[#CBE9E3] focus:border-[#0F766E]"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefreshClick}
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#D9E2E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F766E] transition-colors cursor-pointer"
          title="Reset Filters & Refresh"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-[#0F766E]' : ''}`} />
        </button>

        {/* Export Button */}
        <Button
          variant="outline"
          size="md"
          onClick={handleExport}
          isLoading={isExporting}
          className="gap-2 min-h-[44px]"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export CSV'}</span>
        </Button>
      </div>
    </div>
  );
}
