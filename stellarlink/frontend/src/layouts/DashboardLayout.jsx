import { Outlet } from 'react-router-dom';
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
  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#0F172A]">
      <div className="mx-auto flex min-h-screen max-w-[1920px]">
        <Sidebar navItems={NAV_ITEMS} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar navItems={NAV_ITEMS} />

          <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
