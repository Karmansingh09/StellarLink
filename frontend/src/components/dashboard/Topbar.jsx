import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, ArrowUpRight, Cpu, Wallet, Activity } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Logo from '../ui/Logo';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { exportReport } from '../../utils/exportReport';
import { useToast } from '../../context/ToastContext';
import { useWalletContext } from '../../context/WalletContext';

const pageLabels = {
  '/dashboard': 'Executive Dashboard',
  '/devices': 'Device Fleet',
  '/transactions': 'Transactions',
  '/analytics': 'Analytics',
  '/wallet': 'Wallets',
  '/settings': 'Settings',
};

export default function Topbar({ navItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { walletData } = useWalletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const activeItem = navItems.find((item) =>
    item.end ? location.pathname === item.href : location.pathname.startsWith(item.href)
  );
  const title = activeItem ? pageLabels[activeItem.href] ?? activeItem.label : 'Executive Dashboard';

  const handleExportReport = () => {
    try {
      exportReport({ walletData });
      addToast('StellarLink executive CSV report downloaded successfully', 'success');
    } catch (err) {
      addToast('Failed to export CSV report: ' + err.message, 'error');
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      setSearchOpen(false);
      if (q.includes('dev') || q.includes('charger') || q.includes('robot')) {
        navigate('/devices');
      } else if (q.includes('tx') || q.includes('hash') || q.includes('pay')) {
        navigate('/transactions');
      } else if (q.includes('wall') || q.includes('xlm') || q.includes('key')) {
        navigate('/wallet');
      } else {
        navigate('/dashboard');
      }
      addToast(`Navigated to results for "${searchQuery}"`, 'info');
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white shadow-xs">
      {/* Mobile Top Header Bar with Brand Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0]/60 lg:hidden bg-white">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-2.5 shrink-0">
          <Badge variant="success" dot size="sm">
            Live
          </Badge>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9E2E1] bg-white text-[#475569] shrink-0"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#0F766E]" />
          </motion.button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E] text-xs font-semibold text-white">
            SL
          </div>
        </div>
      </div>

      {/* Main Topbar Content (Desktop & Tablet) */}
      <div className="hidden lg:flex flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8 lg:py-4 xl:flex-row xl:items-center xl:justify-between bg-white">
        <div className="space-y-1 sm:space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              StellarLink Control Plane
            </p>
            <Badge variant="success" dot size="sm">
              Live network
            </Badge>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-['Space_Grotesk'] text-xl font-semibold tracking-tight text-[#0F172A] sm:text-3xl truncate">
              {title}
            </h1>
            <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1] shrink-0" />
            <p className="max-w-2xl text-xs sm:text-sm leading-6 text-[#64748B] truncate">
              Monitor settlement health, network throughput, and operational readiness across the StellarLink estate.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 min-w-0">
          <div className="relative hidden w-full min-w-0 max-w-xs items-center xl:flex">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-[#94A3B8]" />
            <input
              type="search"
              placeholder="Search devices, wallets, or txs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(Boolean(e.target.value.trim()));
              }}
              onKeyDown={handleSearchSubmit}
              onFocus={() => setSearchOpen(Boolean(searchQuery.trim()))}
              className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
            />
            {searchOpen && (
              <div className="absolute top-12 left-0 right-0 z-50 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-xl space-y-1">
                <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Quick Jump</p>
                <button
                  type="button"
                  onClick={() => { navigate('/devices'); setSearchOpen(false); }}
                  className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  <Cpu className="h-4 w-4 text-[#0F766E]" />
                  <span>View Device Fleet</span>
                </button>
                <button
                  type="button"
                  onClick={() => { navigate('/transactions'); setSearchOpen(false); }}
                  className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  <Activity className="h-4 w-4 text-[#0F766E]" />
                  <span>View Transactions</span>
                </button>
                <button
                  type="button"
                  onClick={() => { navigate('/wallet'); setSearchOpen(false); }}
                  className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  <Wallet className="h-4 w-4 text-[#0F766E]" />
                  <span>View Connected Wallets</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button variant="outline" size="md" className="hidden sm:inline-flex" onClick={handleExportReport}>
              Export report
              <ArrowUpRight className="h-4 w-4" />
            </Button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[14px] border border-[#D9E2E1] bg-white text-[#475569] transition-colors hover:border-[#CBE9E3] hover:text-[#0F766E] shrink-0"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#0F766E]" />
            </motion.button>

            <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-sm font-semibold text-white shrink-0">
                SL
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">StellarLink Ops</p>
                <p className="text-xs text-[#64748B]">Executive workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}