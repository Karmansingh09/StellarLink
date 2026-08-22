import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, ShieldCheck, Zap, Globe, Layers, ArrowRight, ExternalLink, Database, Key } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SOROBAN_CONTRACTS } from '../../config/contracts';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const flowSteps = [
    { title: '1. IoT Device Telemetry', desc: 'Edge hardware signs usage payloads with device keypair', icon: Cpu },
    { title: '2. Backend API Gateway', desc: 'Node.js Express service validates signatures & authorization', icon: Database },
    { title: '3. Soroban Smart Contracts', desc: 'WASM contract verifies permissions & holds payment escrow', icon: ShieldCheck },
    { title: '4. Stellar Testnet Settlement', desc: 'Consensus engine finalizes transaction in < 500ms', icon: Zap },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-3 pr-10 border-b border-[#E2E8F0] pb-5">
            <div className="flex items-center gap-3">
              <Badge variant="primary" dot size="sm">
                Soroban WASM Architecture
              </Badge>
              <span className="text-xs font-mono font-semibold text-[#0F766E]">
                Protocol v21 • 4 Deployed Contracts
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#0F172A]">
              StellarLink Protocol Architecture & Smart Contracts
            </h2>
            <p className="text-xs text-[#64748B]">
              Visual breakdown of the autonomous settlement lifecycle from machine telemetry to Soroban contract state transitions.
            </p>
          </div>

          <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* End-to-End Flow Diagram Cards */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                End-to-End Settlement Flow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flowSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2">
                      <div className="flex items-center gap-2 text-[#0F766E]">
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-bold font-['Space_Grotesk'] text-[#0F172A]">{step.title}</span>
                      </div>
                      <p className="text-xs text-[#64748B] leading-5">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soroban Contracts List */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                Deployed Soroban Smart Contracts
              </h3>
              <div className="space-y-3">
                {Object.entries(SOROBAN_CONTRACTS).map(([name, id]) => (
                  <div key={name} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
                        <p className="text-xs font-bold capitalize text-[#0F172A]">{name.replace(/([A-Z])/g, ' $1')}</p>
                      </div>
                      <p className="text-[11px] font-mono text-[#0F766E] truncate max-w-sm sm:max-w-md">{id}</p>
                    </div>
                    <a
                      href={`https://stellar.expert/explorer/testnet/contract/${id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#0F766E] hover:underline shrink-0"
                    >
                      Stellar Expert <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-[#E2E8F0] pt-4">
            <Button variant="primary" size="md" onClick={onClose}>
              Close Architecture View
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
