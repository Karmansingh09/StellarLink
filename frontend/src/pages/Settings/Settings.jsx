import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Lock, ShieldCheck, Key, Globe, Cpu, Save, RotateCcw, AlertTriangle, Network } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card, { CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useToast } from '../../context/ToastContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const defaultState = {
  autoSettle: true,
  notifications: true,
  sorobanFailover: true,
  networkEnv: 'testnet',
  rpcEndpoint: 'https://horizon-testnet.stellar.org',
  explorerUrl: 'https://stellar.expert/explorer/testnet',
  networkPassphrase: 'Test SDF Network ; September 2015',
  maxFeeLimit: '0.00001',
  alertEmail: 'admin@stellarlink.io',
};

export default function Settings() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('stellarlink_settings');
    return saved ? JSON.parse(saved) : defaultState;
  });
  const [initialSettings, setInitialSettings] = useState(() => {
    const saved = localStorage.getItem('stellarlink_settings');
    return saved ? JSON.parse(saved) : defaultState;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if form is dirty (unsaved changes)
  const isDirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);

  const validate = () => {
    const errs = {};
    if (!settings.rpcEndpoint.trim()) {
      errs.rpcEndpoint = 'RPC Endpoint URL cannot be empty.';
    }
    if (!settings.alertEmail.includes('@')) {
      errs.alertEmail = 'Please enter a valid administrative email.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      addToast('Please correct validation errors before saving', 'error');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('stellarlink_settings', JSON.stringify(settings));
      setIsSaving(false);
      setInitialSettings(settings);
      addToast('Stellar RPC & Network configuration saved', 'success');
    }, 500);
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('stellarlink_settings');
    setSettings(defaultState);
    setInitialSettings(defaultState);
    setErrors({});
    setIsConfirmOpen(false);
    addToast('Configuration reset to Stellar Testnet default values', 'info');
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Unsaved Changes Banner */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-amber-900"
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <span>You have unsaved changes to Stellar RPC parameters.</span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSettings(initialSettings)}
                className="text-amber-800 hover:bg-amber-100"
              >
                Discard
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Stellar Horizon Connected
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Stellar SDK v12.4
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Platform & Stellar Settings
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Manage Stellar Horizon RPC endpoints, Testnet/Mainnet environments, block explorer selection, and settlement rules.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsConfirmOpen(true)}
                className="gap-2 min-h-[48px]"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset Defaults</span>
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                isLoading={isSaving}
                className="gap-2 min-h-[48px]"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
              </Button>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Settings Groups */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Group 1: Stellar RPC & Network Environment */}
            <Card padding="generous" className="space-y-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-[#0F172A]">Stellar Horizon RPC</CardTitle>
                    <CardDescription className="text-xs">Network selection & RPC endpoints</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <div className="space-y-4">
                {/* Network Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                    Network Selection
                  </label>
                  <select
                    value={settings.networkEnv}
                    onChange={(e) => setSettings({ ...settings, networkEnv: e.target.value })}
                    className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0F766E]"
                  >
                    <option value="testnet">Stellar Testnet (Active)</option>
                    <option value="mainnet">Stellar Public Mainnet</option>
                    <option value="soroban">Soroban Local Sandbox</option>
                  </select>
                </div>

                {/* RPC Endpoint */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                    Horizon RPC Endpoint
                  </label>
                  <input
                    type="text"
                    value={settings.rpcEndpoint}
                    onChange={(e) => setSettings({ ...settings, rpcEndpoint: e.target.value })}
                    className={`h-12 w-full rounded-2xl border bg-white px-4 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0F766E] ${errors.rpcEndpoint ? 'border-rose-500' : 'border-[#D9E2E1]'}`}
                  />
                  {errors.rpcEndpoint && <p className="mt-1 text-xs text-rose-600">{errors.rpcEndpoint}</p>}
                </div>

                {/* Explorer Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                    Block Explorer Provider
                  </label>
                  <select
                    value={settings.explorerUrl}
                    onChange={(e) => setSettings({ ...settings, explorerUrl: e.target.value })}
                    className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0F766E]"
                  >
                    <option value="https://stellar.expert/explorer/testnet">Stellar Expert (Testnet)</option>
                    <option value="https://laboratory.stellar.org">Stellar Laboratory</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Group 2: Autonomous Settlement Rules */}
            <Card padding="generous" className="space-y-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-[#0F172A]">Automated Settlement Rules</CardTitle>
                    <CardDescription className="text-xs">Soroban smart contract execution thresholds</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <div className="space-y-4">
                {/* Switch 1: Auto-settle */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Auto-settle Micro-payments</p>
                    <p className="text-xs text-[#64748B]">Execute M2M payments automatically upon telemetry trigger</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.autoSettle}
                    tabIndex={0}
                    onClick={() => toggleSetting('autoSettle')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSetting('autoSettle')}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/40 focus-visible:ring-offset-2 ${settings.autoSettle ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                  >
                    <motion.span
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`inline-block h-5 w-5 rounded-full bg-white shadow-md mt-1 ml-1 ${settings.autoSettle ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {/* Switch 2: Soroban Failover */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Soroban Failover Protection</p>
                    <p className="text-xs text-[#64748B]">Route settlements to backup nodes during network latency spikes</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.sorobanFailover}
                    tabIndex={0}
                    onClick={() => toggleSetting('sorobanFailover')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSetting('sorobanFailover')}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/40 focus-visible:ring-offset-2 ${settings.sorobanFailover ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                  >
                    <motion.span
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`inline-block h-5 w-5 rounded-full bg-white shadow-md mt-1 ml-1 ${settings.sorobanFailover ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </motion.section>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Reset Settings to Protocol Defaults?"
        description="This will restore all smart contract thresholds, network passphrases, and notification rules to factory defaults."
        confirmText="Reset Configuration"
        onConfirm={handleResetDefaults}
        onClose={() => setIsConfirmOpen(false)}
      />
    </motion.div>
  );
}
