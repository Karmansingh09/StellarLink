import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Lock, ShieldCheck, Key, Globe, Cpu, Save, RotateCcw } from 'lucide-react';
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

export default function Settings() {
  const { addToast } = useToast();
  const [autoSettle, setAutoSettle] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sorobanFailover, setSorobanFailover] = useState(true);
  const [networkPassphrase, setNetworkPassphrase] = useState('Public Global Stellar Network ; September 2015');
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast('StellarLink configuration saved successfully', 'success');
    }, 700);
  };

  const handleResetDefaults = () => {
    setAutoSettle(true);
    setNotifications(true);
    setSorobanFailover(true);
    setNetworkPassphrase('Public Global Stellar Network ; September 2015');
    setIsConfirmOpen(false);
    addToast('Configuration reset to default enterprise protocol values', 'info');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Header Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  System Configuration
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  StellarLink Protocol v2.4
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Platform Settings
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Manage Soroban smart contract parameters, device authorization policies, and automated settlement rules.
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
            {/* Group 1: Autonomous Settlement Settings */}
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
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Auto-settle Micro-payments</p>
                    <p className="text-xs text-[#64748B]">Execute M2M payments automatically upon telemetry trigger</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Toggle Auto-settle Micro-payments"
                    onClick={() => setAutoSettle(!autoSettle)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/30 ${autoSettle ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out mt-1 ml-1 ${autoSettle ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Soroban Failover Protection</p>
                    <p className="text-xs text-[#64748B]">Route settlements to backup nodes during network latency spikes</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Toggle Soroban Failover Protection"
                    onClick={() => setSorobanFailover(!sorobanFailover)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/30 ${sorobanFailover ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out mt-1 ml-1 ${sorobanFailover ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Group 2: Security & Network Credentials */}
            <Card padding="generous" className="space-y-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-[#0F172A]">Stellar Network Standard</CardTitle>
                    <CardDescription className="text-xs">Ledger network passphrase & cryptographic keys</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                    Network Passphrase
                  </label>
                  <input
                    type="text"
                    value={networkPassphrase}
                    onChange={(e) => setNetworkPassphrase(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Hardware Alerts</p>
                    <p className="text-xs text-[#64748B]">Send immediate mobile push when device balance drops below 50 XLM</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Toggle Hardware Alerts"
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/30 ${notifications ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out mt-1 ml-1 ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
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
