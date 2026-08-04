import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, ArrowDownLeft, QrCode, Copy, Check, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { useSendStellarPayment } from '../../hooks/useStellar';

export default function SendReceiveModal({ mode, onClose, walletData }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memoText, setMemoText] = useState('');
  const [senderSecret, setSenderSecret] = useState('');

  const sendPaymentMutation = useSendStellarPayment();

  if (!mode) return null;

  const walletAddress = walletData?.publicKey || 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7';

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    addToast('Vault Address copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await sendPaymentMutation.mutateAsync({
        senderSecret: senderSecret || 'SD4Z...MOCK_SECRET',
        destinationPublic: recipient,
        amount,
        memoText,
      });

      addToast(`Payment submitted! Hash: ${res.hash?.substring(0, 10)}...`, 'success');
      onClose();
    } catch (err) {
      addToast(err.message || 'Payment submission failed', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
              {mode === 'send' ? <ArrowUpRight className="h-5 w-5" /> : mode === 'receive' ? <ArrowDownLeft className="h-5 w-5" /> : <QrCode className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                {mode === 'send' ? 'Send XLM Payment' : mode === 'receive' ? 'Receive XLM' : 'Stellar QR Address'}
              </h3>
              <p className="text-xs text-[#64748B]">Stellar Testnet Network</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {mode === 'send' ? (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                  Destination Public Key (G...)
                </label>
                <input
                  type="text"
                  required
                  placeholder="GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                    Amount (XLM)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0.1"
                    placeholder="10.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-sm font-mono text-[#0F172A] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                    Memo (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="M2M-SETTLE-01"
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-3 text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                  Sender Secret Key (S...) - Dev Mode
                </label>
                <input
                  type="password"
                  placeholder="S..."
                  value={senderSecret}
                  onChange={(e) => setSenderSecret(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between text-xs text-[#0F766E]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Fee: 0.00001 XLM • Testnet Instant Consensus</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                <Button variant="outline" size="md" type="button" onClick={onClose} disabled={sendPaymentMutation.isPending}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" isLoading={sendPaymentMutation.isPending}>
                  {sendPaymentMutation.isPending ? 'Signing on Stellar...' : 'Confirm Stellar Payment'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl inline-block shadow-xs">
                <div className="w-48 h-48 bg-slate-900 rounded-xl flex items-center justify-center text-white font-mono text-xs text-center p-4">
                  [ STELLAR TESTNET QR ]
                  <br />
                  {walletAddress.substring(0, 12)}...
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
                <span className="truncate pr-2">{walletAddress}</span>
                <button type="button" onClick={copyAddress} className="text-[#0F766E] shrink-0 p-1 cursor-pointer">
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <Button variant="outline" size="md" onClick={onClose} className="w-full">
                Close Dialog
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
