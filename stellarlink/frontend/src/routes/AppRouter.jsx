import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ToastProvider } from '../context/ToastContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Landing = lazy(() => import('../pages/Landing/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Devices = lazy(() => import('../pages/Devices/Devices'));
const Transactions = lazy(() => import('../pages/Transactions/Transactions'));
const Analytics = lazy(() => import('../pages/Analytics/Analytics'));
const Wallet = lazy(() => import('../pages/Wallet/Wallet'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Suspense
            fallback={(
              <div className="flex min-h-screen items-center justify-center bg-white">
                <LoadingSpinner size="lg" />
              </div>
            )}
          >
            <Routes>
              <Route element={<LandingLayout />}>
                <Route path="/" element={<Landing />} />
              </Route>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}
