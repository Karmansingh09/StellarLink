import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownLeft, ArrowUpRight, Copy, Check, QrCode, ExternalLink, ShieldCheck, Coins, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function MainBalanceCard({
  activePublicKey,
  walletData,
  onOpenSend,
  onOpenReceive,
  onToggleQR,
  onFundFriendbot,
  isFunding,
}) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const walletAddress = activePublicKey || walletData?.publicKey || 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE';
  const totalXLM = walletData?.unfunded ? '0.00' : (walletData?.totalXLM || walletData?.balance || '0.00');
  const usdVal = walletData?.unfunded ? '$0.00 USD' : (walletData?.usdEquivalent || walletData?.usdValue || '$0.00 USD');

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    addToast('Vault address copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="rounded-3xl border border-[#CBE9E3] bg-gradient-to-br from-[#0F766E] to-[#115E59] p-5 sm:p-8 text-white shadow-xl space-y-6 overflow-hidden"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-teal-200 backdrop-blur-xs">
            <Wallet className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-teal-200 truncate">
              Primary Stellar Vault Address
            </p>
            <div className="flex items-center gap-2 mt-0.5 min-w-0">
              <span className="font-mono text-xs text-white/90 font-medium truncate max-w-[180px] sm:max-w-none">
                {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 8)}
              </span>
              <button
                type="button"
                onClick={copyAddress}
                className="text-teal-200 hover:text-white transition-colors p-1 shrink-0 cursor-pointer"
                title="Copy Address"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs text-teal-100 border border-teal-400/20">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-300 shrink-0" /> Stellar Testnet Active
          </span>
        </div>
      </div>

      {/* Main Balance Display */}
      <div className="min-w-0">
        <p className="text-xs text-teal-200 font-medium">Total XLM Balance</p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl xs:text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk'] tracking-tight mt-1 break-all sm:break-normal"
        >
          {totalXLM.includes('XLM') ? totalXLM : `${totalXLM} XLM`}
        </motion.h1>
        <p className="text-xs sm:text-sm text-teal-200/90 mt-1.5">
          ≈ {usdVal} • Reserve Base: 1.00 XLM
        </p>
      </div>

      {/* Unfunded Warning Alert Banner */}
      {walletData?.unfunded && (
        <div className="p-4 rounded-2xl bg-teal-900/60 border border-teal-300/30 text-teal-100 flex items-start gap-3 my-2 min-w-0">
          <AlertCircle className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0">
            <p className="font-bold text-sm text-white">
              Connected wallet is not funded on Stellar Testnet.
            </p>
            <p className="text-xs text-teal-200 leading-relaxed">
              Click &quot;Fund Friendbot&quot; below to receive 10,000 Testnet XLM and activate ledger telemetry.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onOpenReceive}
          className="flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white text-[#0F766E] font-bold text-sm hover:bg-teal-50 transition-colors shadow-xs cursor-pointer w-full sm:w-auto"
        >
          <ArrowDownLeft className="h-4 w-4 shrink-0" />
          Receive
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onOpenSend}
          className="flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-teal-800/80 border border-teal-400/40 text-white font-bold text-sm hover:bg-teal-800 transition-colors cursor-pointer w-full sm:w-auto"
        >
          <ArrowUpRight className="h-4 w-4 shrink-0" />
          Send XLM
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onFundFriendbot}
          disabled={isFunding}
          className="flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 text-white font-bold text-sm hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50 w-full sm:w-auto"
        >
          <Coins className="h-4 w-4 text-emerald-200 shrink-0" />
          {isFunding ? 'Funding...' : 'Fund Friendbot'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onToggleQR}
          className="flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-teal-800/40 border border-teal-400/20 text-white font-semibold text-sm hover:bg-teal-800/60 transition-colors cursor-pointer w-full sm:w-auto"
        >
          <QrCode className="h-4 w-4 shrink-0" />
          QR Code
        </motion.button>

        <a
          href={`https://stellar.expert/explorer/testnet/account/${walletAddress}`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-teal-900/40 border border-teal-400/20 text-teal-100 font-medium text-sm hover:bg-teal-900/60 transition-colors w-full sm:w-auto"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Stellar Expert
        </a>
      </div>
    </motion.div>
  );
}
