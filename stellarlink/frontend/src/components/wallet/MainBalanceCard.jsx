import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownLeft, ArrowUpRight, Copy, Check, QrCode, ExternalLink, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function MainBalanceCard({ onOpenSend, onOpenReceive, onToggleQR }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const walletAddress = 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7';

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    addToast('Master Vault address copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="rounded-3xl border border-[#CBE9E3] bg-gradient-to-br from-[#0F766E] to-[#115E59] p-6 sm:p-8 text-white shadow-xl space-y-6"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-teal-200 backdrop-blur-xs">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
              Primary Master Vault
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xs text-white/90 font-medium">
                {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 8)}
              </span>
              <button
                type="button"
                onClick={copyAddress}
                className="text-teal-200 hover:text-white transition-colors p-1 cursor-pointer"
                title="Copy Address"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs text-teal-100 border border-teal-400/20">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-300" /> Multisig 3/5 Active
          </span>
        </div>
      </div>

      {/* Main Balance Display */}
      <div>
        <p className="text-xs text-teal-200 font-medium">Total XLM Balance</p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk'] tracking-tight mt-1"
        >
          482,910.00 <span className="text-xl sm:text-3xl font-medium text-teal-200">XLM</span>
        </motion.h1>
        <p className="text-xs sm:text-sm text-teal-200/90 mt-1.5">
          ≈ $57,949.20 USD • Reserve Locked: 12,500.00 XLM
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:flex sm:items-center gap-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onOpenReceive}
          className="flex min-h-[48px] items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-white text-[#0F766E] font-bold text-sm hover:bg-teal-50 transition-colors shadow-xs cursor-pointer"
        >
          <ArrowDownLeft className="h-4 w-4" />
          Receive
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onOpenSend}
          className="flex min-h-[48px] items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-teal-800/80 border border-teal-400/40 text-white font-bold text-sm hover:bg-teal-800 transition-colors cursor-pointer"
        >
          <ArrowUpRight className="h-4 w-4" />
          Send
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onToggleQR}
          className="flex min-h-[48px] items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-teal-800/40 border border-teal-400/20 text-white font-semibold text-sm hover:bg-teal-800/60 transition-colors cursor-pointer"
        >
          <QrCode className="h-4 w-4" />
          QR Code
        </motion.button>

        <a
          href={`https://stellar.expert/explorer/public/account/${walletAddress}`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[48px] items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-teal-900/40 border border-teal-400/20 text-teal-100 font-medium text-sm hover:bg-teal-900/60 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Stellar Explorer
        </a>
      </div>
    </motion.div>
  );
}
