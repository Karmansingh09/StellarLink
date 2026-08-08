import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Cpu, Wallet, Activity, Zap, RefreshCw, CheckCircle2, Copy, Check, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import StatusBadge from '../dashboard/StatusBadge';
import ConfirmModal from '../ui/ConfirmModal';
import { useToast } from '../../context/ToastContext';
import { SOROBAN_CONTRACTS } from '../../config/contracts';

export default function DeviceDetailDrawer({ device, onClose }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isConfirmRekeyOpen, setIsConfirmRekeyOpen] = useState(false);

  if (!device) return null;

  const registryId = device.contractId || SOROBAN_CONTRACTS.deviceRegistry;

  const copyKey = () => {
    navigator.clipboard.writeText(device.wallet);
    setCopied(true);
    addToast('Stellar Public Key copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRekey = () => {
    setIsConfirmRekeyOpen(false);
    addToast(`Cryptographic keypair re-keyed for ${device.name}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">{device.name}</h3>
                <p className="text-xs font-mono text-[#64748B]">{device.id}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Status & Quick Info */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Operational State</p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status={device.status}>{device.status}</StatusBadge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Latency</p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">{device.latency}</p>
              </div>
            </div>

            {/* Stellar Wallet Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                Stellar M2M Wallet
              </h4>
              <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Public Key</span>
                  <button type="button" onClick={copyKey} className="text-[#0F766E] font-semibold flex items-center gap-1 hover:text-[#115E59]">
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Key'}</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E2E8F0] font-mono text-xs text-[#0F172A] break-all">
                  {device.wallet}
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Current Balance</span>
                  <span className="font-mono font-bold text-[#0F766E]">{device.balance}</span>
                </div>
              </div>
            </div>

            {/* Soroban Contract Authorization */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                Soroban Smart Contract
              </h4>
              <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
                    <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
                    <span>Cryptographic Verification</span>
                  </div>
                  <Badge variant="success" dot size="sm">
                    Verified
                  </Badge>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Authorized for autonomous micro-settlements on contract ID <span className="font-mono text-[#0F766E] font-semibold">{registryId.substring(0, 8)}...{registryId.substring(registryId.length - 4)}</span> with zero human intervention.
                </p>
              </div>
            </div>

            {/* Telemetry Stream */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                Live Telemetry Log
              </h4>
              <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[#0F766E]">
                  <span>[14:28:02] SETTLE_SUCCESS</span>
                  <span>+12.50 XLM</span>
                </div>
                <div className="flex items-center justify-between text-[#475569]">
                  <span>[14:27:18] PING_HEARTBEAT</span>
                  <span>412ms OK</span>
                </div>
                <div className="flex items-center justify-between text-[#475569]">
                  <span>[14:26:40] SOROBAN_AUTH_CHECK</span>
                  <span>PASSED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-3">
          <Button variant="outline" size="md" onClick={onClose} className="w-full">
            Close Panel
          </Button>
          <Button variant="primary" size="md" onClick={() => setIsConfirmRekeyOpen(true)} className="w-full">
            Re-key Device
          </Button>
        </div>
      </motion.div>

      {/* Confirmation Modal for Re-keying */}
      <ConfirmModal
        isOpen={isConfirmRekeyOpen}
        title={`Re-key Cryptographic Credentials for ${device.name}?`}
        description="This will revoke the existing Stellar secret seed and sign a new Soroban keypair authorization on mainnet."
        confirmText="Confirm Re-key"
        onConfirm={handleRekey}
        onClose={() => setIsConfirmRekeyOpen(false)}
      />
    </div>
  );
}
