import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard', end: true },
  { label: 'Devices', href: '/devices', icon: 'Cpu' },
  { label: 'Transactions', href: '/transactions', icon: 'Activity' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { label: 'Wallet', href: '/wallet', icon: 'Wallet' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#0F172A] selection:bg-[#0F766E]/15 selection:text-[#0F766E]">
      <div className="mx-auto flex min-h-screen max-w-[1920px]">
        <Sidebar navItems={NAV_ITEMS} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar navItems={NAV_ITEMS} />

          <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
