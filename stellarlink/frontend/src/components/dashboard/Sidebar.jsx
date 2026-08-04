import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Cpu,
  LayoutDashboard,
  Settings,
  Wallet,
  ShieldCheck,
  Wifi,
} from 'lucide-react';
import Logo from '../ui/Logo';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import clsx from 'clsx';

const iconMap = {
  LayoutDashboard,
  Cpu,
  Activity,
  BarChart3,
  Wallet,
  Settings,
};

const quickStats = [
  { label: 'Network uptime', value: '99.98%' },
  { label: 'Live endpoints', value: '128' },
  { label: 'Settlement SLA', value: '< 500ms' },
];

export default function Sidebar({ navItems }) {
  return (
    <>
      {/* Desktop Sidebar (lg:flex) */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-[#E2E8F0]/80 bg-white/90 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <Badge variant="success" dot size="sm">
              Live
            </Badge>
          </div>

          <div className="mt-8 space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Navigation
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.end}
                    className={({ isActive }) =>
                      clsx(
                        'group flex items-center gap-3 rounded-[16px] px-3 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[#EAF8F6] text-[#0F766E] shadow-[0_1px_2px_rgba(15,23,42,0.04)]'
                          : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="flex w-full items-center gap-3"
                      >
                        <span
                          className={clsx(
                            'flex h-9 w-9 items-center justify-center rounded-[12px] border transition-colors',
                            isActive
                              ? 'border-[#CBE9E3] bg-white text-[#0F766E]'
                              : 'border-[#E2E8F0] bg-white text-[#64748B]'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="flex-1">{item.label}</span>

                        {item.end !== true && <Wifi className="h-4 w-4 text-[#CBD5E1]" />}
                      </motion.div>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="space-y-4">
          <Card padding="compact" className="border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Operational status
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#0F172A]">
                  <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
                  Verified network health
                </div>
              </div>

              <Badge variant="primary" dot size="sm">
                Stable
              </Badge>
            </div>

            <div className="mt-4 space-y-3 border-t border-[#E2E8F0] pt-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">{stat.label}</span>
                  <span className="font-semibold text-[#0F172A]">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <p className="px-3 text-xs leading-5 text-[#64748B]">
            Executive controls for Stellar-powered settlement operations across devices, wallets, and real-time analytics.
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (lg:hidden) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2E8F0] bg-white/95 backdrop-blur-xl lg:hidden shadow-lg">
        <div className="grid grid-cols-6 gap-0.5 px-1 py-1.5 min-h-[56px] items-center">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  clsx(
                    'flex flex-col items-center justify-center gap-1 rounded-[12px] py-1.5 text-[10px] font-semibold transition-colors select-none',
                    isActive ? 'bg-[#EAF8F6] text-[#0F766E]' : 'text-[#64748B] hover:text-[#0F172A]'
                  )
                }
              >
                {({ isActive }) => (
                  <motion.div
                    whileTap={{ scale: 0.92 }}
                    className="flex flex-col items-center gap-1 w-full text-center"
                  >
                    <Icon className={clsx('h-4 w-4', isActive ? 'text-[#0F766E]' : 'text-[#64748B]')} />
                    <span className="truncate max-w-full px-0.5">{item.label}</span>
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}