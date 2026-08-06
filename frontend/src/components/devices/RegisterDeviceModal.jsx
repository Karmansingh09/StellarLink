import { useState } from 'react';
import { X, Cpu, Key, Shield, Globe } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export default function RegisterDeviceModal({ isOpen, onClose, onRegister }) {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'EV Charger',
    region: 'Europe West',
    initialFunding: '500',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate mock Stellar key
      const mockWallet = 'G' + Math.random().toString(36).substring(2, 12).toUpperCase() + '8943FL';
      const mockId = 'DEV-' + Math.floor(1000 + Math.random() * 9000) + '-X1';

      onRegister({
        id: mockId,
        name: formData.name,
        type: formData.type,
        region: formData.region,
        wallet: mockWallet,
        status: 'active',
        latency: '390 ms',
        volume: '0 tx',
        balance: `${formData.initialFunding}.00 XLM`,
      });

      addToast(`Device "${formData.name}" successfully provisioned on Stellar`, 'success');
      setFormData({ name: '', type: 'EV Charger', region: 'Europe West', initialFunding: '500' });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Provision New M2M Endpoint</h3>
              <p className="text-xs text-[#64748B]">Register hardware terminal and auto-create Stellar wallet.</p>
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
              Device Name / Identifier
            </label>
            <input
              type="text"
              required
              placeholder="e.g. EV Charging Station #42"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-white px-4 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                Hardware Category
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-white px-3 text-sm text-[#0F172A] outline-none focus:border-[#0F766E]"
              >
                <option value="EV Charger">EV Charger</option>
                <option value="Autonomous Robot">Autonomous Robot</option>
                <option value="Microgrid Relay">Microgrid Relay</option>
                <option value="Smart Sensor">Smart Sensor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                Deployment Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-white px-3 text-sm text-[#0F172A] outline-none focus:border-[#0F766E]"
              >
                <option value="Europe West">Europe West</option>
                <option value="North America">North America</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="Middle East">Middle East</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
              Initial Stellar Wallet Funding (XLM)
            </label>
            <input
              type="number"
              min="10"
              value={formData.initialFunding}
              onChange={(e) => setFormData({ ...formData, initialFunding: e.target.value })}
              className="h-11 w-full rounded-[14px] border border-[#D9E2E1] bg-white px-4 text-sm font-mono text-[#0F172A] outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-3 text-xs text-[#0F766E]">
            <Key className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              StellarLink HSM will automatically generate a cryptographic keypair and sign Soroban contract authorization for this endpoint.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <Button variant="outline" size="md" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" isLoading={isSubmitting}>
              {isSubmitting ? 'Provisioning...' : 'Provision Device'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
