import { motion } from 'framer-motion';
import { Bell, Search, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useLocation } from 'react-router-dom';

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
  const activeItem = navItems.find((item) =>
    item.end ? location.pathname === item.href : location.pathname.startsWith(item.href)
  );
  const title = activeItem ? pageLabels[activeItem.href] ?? activeItem.label : 'Executive Dashboard';

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0]/80 bg-white/90 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              StellarLink Control Plane
            </p>
            <Badge variant="success" dot size="sm">
              Live network
            </Badge>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <h1 className="font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-[#0F172A] sm:text-3xl">
              {title}
            </h1>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-[#CBD5E1] sm:block" />
            <p className="max-w-2xl text-sm leading-6 text-[#64748B]">
              Monitor settlement health, network throughput, and operational readiness across the StellarLink estate.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative hidden w-full min-w-65 items-center lg:flex">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-[#94A3B8]" />
            <input
              type="search"
              placeholder="Search devices, wallets, or transactions"
              className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
            />
          </label>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" className="hidden sm:inline-flex">
              Export report
              <ArrowUpRight className="h-4 w-4" />
            </Button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#D9E2E1] bg-white text-[#475569] transition-colors hover:border-[#CBE9E3] hover:text-[#0F766E]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#0F766E]" />
            </motion.button>

            <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-sm font-semibold text-white">
                SL
              </div>
              <div className="hidden sm:block">
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