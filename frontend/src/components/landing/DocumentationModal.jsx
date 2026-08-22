import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Cpu, ShieldCheck, Zap, Globe, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SOROBAN_CONTRACTS } from '../../config/contracts';

export default function DocumentationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'contracts', label: 'Soroban Contracts' },
    { id: 'wallet', label: 'Wallet & Settlement' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-3 pr-10 border-b border-[#E2E8F0] pb-6">
            <div className="flex items-center gap-3">
              <Badge variant="primary" dot size="sm">
                StellarLink Protocol v1.0
              </Badge>
              <span className="text-xs font-mono font-semibold text-[#0F766E]">
                Stellar Testnet • Protocol v21
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Documentation & Protocol Specifications
            </h2>
            <p className="text-sm text-[#64748B]">
              Comprehensive technical guide to StellarLink machine-to-machine settlements, Soroban contracts, and device fleet administration.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#E2E8F0] py-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                  activeTab === t.id
                    ? 'bg-[#EAF8F6] text-[#0F766E] border border-[#CBE9E3]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-6 max-h-[60vh] overflow-y-auto space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-4 text-sm leading-6 text-[#475569]">
                <h3 className="text-base font-semibold text-[#0F172A]">1. Executive Summary</h3>
                <p>
                  StellarLink provides an enterprise-ready control plane and settlement engine built natively on the Stellar blockchain. It enables autonomous IoT equipment (EV charging stations, robotic rovers, industrial telemetry sensors) to process micro-settlements instantly with deterministic sub-second finality.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <Zap className="h-5 w-5 text-[#0F766E] mb-2" />
                    <p className="font-semibold text-[#0F172A]">Sub-second Finality</p>
                    <p className="text-xs text-[#64748B] mt-1">Leverages Stellar consensus for near-instant transaction settlement.</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <ShieldCheck className="h-5 w-5 text-[#0F766E] mb-2" />
                    <p className="font-semibold text-[#0F172A]">Soroban Verification</p>
                    <p className="text-xs text-[#64748B] mt-1">On-chain WASM smart contracts govern authorization & payment escrow.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4 text-sm leading-6 text-[#475569]">
                <h3 className="text-base font-semibold text-[#0F172A]">2. System Architecture</h3>
                <p>
                  The architecture comprises four core layers:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#0F172A]">Device Telemetry Layer:</strong> Edge devices sign telemetry payloads and send settlement requests.</li>
                  <li><strong className="text-[#0F172A]">Control Plane Frontend:</strong> Enterprise web surface managing keypairs, devices, transactions, and analytics.</li>
                  <li><strong className="text-[#0F172A]">Backend API Gateway:</strong> Node.js API orchestrating Stellar Horizon queries and Soroban contract calls.</li>
                  <li><strong className="text-[#0F172A]">Stellar Testnet Ledger:</strong> Soroban smart contracts enforcing device permissions, escrow holding, and automated payouts.</li>
                </ul>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-4 text-sm leading-6 text-[#475569]">
                <h3 className="text-base font-semibold text-[#0F172A]">3. Deployed Soroban Contracts (Testnet)</h3>
                <p className="text-xs text-[#64748B]">All contracts are deployed to Stellar Testnet and pass standard Cargo workspace unit tests.</p>
                
                <div className="space-y-3 pt-2">
                  {Object.entries(SOROBAN_CONTRACTS).map(([name, id]) => (
                    <div key={name} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold capitalize text-[#0F172A]">{name.replace('_', ' ')}</p>
                        <p className="text-[11px] font-mono text-[#0F766E] truncate max-w-md">{id}</p>
                      </div>
                      <a
                        href={`https://stellar.expert/explorer/testnet/contract/${id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#0F766E] hover:underline"
                      >
                        Explorer <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="space-y-4 text-sm leading-6 text-[#475569]">
                <h3 className="text-base font-semibold text-[#0F172A]">4. Wallet Integration & Payment Flow</h3>
                <p>
                  StellarLink supports dual signing methods:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong className="text-[#0F172A]">Freighter Extension:</strong> Browser wallet connection for enterprise operators to authorize transactions directly.</li>
                  <li><strong className="text-[#0F172A]">Development Keypairs:</strong> Client-side Stellar keypair generation for testing micro-payments instantly on Stellar Testnet.</li>
                </ol>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end border-t border-[#E2E8F0] pt-4">
            <Button variant="primary" size="md" onClick={onClose}>
              Got It
            </Button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
