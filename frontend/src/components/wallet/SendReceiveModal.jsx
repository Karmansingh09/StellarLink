import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cpu,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { useSendStellarPayment } from '../../hooks/useStellar';
import { useWalletContext } from '../../context/WalletContext';
import freighterService from '../../services/wallet/freighterService';
import { useQueryClient } from '@tanstack/react-query';
import stellarService from '../../services/api/stellarService';

export default function SendReceiveModal({ mode, onClose }) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { walletData, publicKey, refreshWallet, isFreighterConnected, setDevKeypair } = useWalletContext();
  const [copied, setCopied] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memoText, setMemoText] = useState('');
  const [senderSecret, setSenderSecret] = useState('');

  // Transaction Lifecycle Stages: 'idle' | 'preparing' | 'signing' | 'submitting' | 'waiting' | 'confirmed' | 'error'
  const [stage, setStage] = useState('idle');
  const [txDetails, setTxDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationTime, setConfirmationTime] = useState('');

  const sendPaymentMutation = useSendStellarPayment();

  useEffect(() => {
    if (!mode) {
      setStage('idle');
      setTxDetails(null);
      setErrorMessage('');
    }
  }, [mode]);

  if (!mode) return null;

  const walletAddress = walletData?.publicKey || publicKey;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    addToast('Vault Address copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const copyTxHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    addToast('Transaction hash copied to clipboard', 'success');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const stagesList = [
    { key: 'preparing', label: 'Preparing Transaction...' },
    { key: 'signing', label: 'Signing via Freighter...' },
    { key: 'submitting', label: 'Submitting to Stellar Horizon...' },
    { key: 'waiting', label: 'Waiting for Consensus...' },
    { key: 'confirmed', label: 'Transaction Confirmed' },
  ];

  const handleSendSubmit = async (e) => {
    e.preventDefault();
    const cleanRecipient = recipient.trim();
    const numAmount = parseFloat(amount);

    if (!cleanRecipient || !cleanRecipient.startsWith('G') || cleanRecipient.length !== 56) {
      addToast('Destination must be a valid 56-character Stellar public key starting with G', 'error');
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      addToast('Amount must be greater than 0 XLM', 'error');
      return;
    }

    if (!isFreighterConnected && !senderSecret.trim()) {
      addToast('Please enter your Stellar Secret Key (S...) or connect Freighter Wallet', 'error');
      return;
    }

    setStage('preparing');
    const startMs = Date.now();

    try {
      let res;
      if (isFreighterConnected) {
        // 1. Build Unsigned Transaction XDR
        const buildRes = await stellarService.buildPaymentXdr({
          sourcePublicKey: walletAddress,
          destinationPublic: cleanRecipient,
          amount: String(amount),
          memoText,
        });

        const { xdr, networkPassphrase } = buildRes.data || buildRes;

        // 2. Prompt Freighter Extension to Sign
        setStage('signing');
        const signedXdr = await freighterService.signTransaction(xdr, networkPassphrase);

        // 3. Submit Signed XDR to Horizon RPC
        setStage('submitting');
        const submitRes = await stellarService.submitSignedXdr({ signedXdr });
        res = submitRes.data || submitRes;
      } else {
        // Dev Secret Key Mode
        setStage('signing');
        setStage('submitting');
        const submitRes = await sendPaymentMutation.mutateAsync({
          senderSecret: senderSecret.trim(),
          destinationPublic: cleanRecipient,
          amount: String(amount),
          memoText,
        });
        res = submitRes.data || submitRes;
      }

      setStage('waiting');
      const durationSec = ((Date.now() - startMs) / 1000).toFixed(2);
      setConfirmationTime(`${durationSec}s`);

      setTxDetails({
        hash: res?.hash || res?.txHash || 'Pending consensus',
        ledger: res?.ledger || 'Latest',
        fee: '0.00001 XLM',
        amount: `${amount} XLM`,
        recipient: cleanRecipient,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });

      setStage('confirmed');
      if (senderSecret.trim()) {
        const secret = senderSecret.trim();
        if (secret.startsWith('S')) {
          const senderPubKey = res?.sourcePublicKey || res?.publicKey || res?.data?.sourcePublicKey || res?.data?.publicKey;
          if (senderPubKey && senderPubKey.startsWith('G')) {
            setDevKeypair(senderPubKey, secret);
          }
        }
      }
      refreshWallet();
      queryClient.invalidateQueries({ queryKey: ['analyticsMetrics'] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
      addToast('XLM payment confirmed on Stellar Testnet!', 'success');
    } catch (err) {
      console.error('[SendReceiveModal] Payment execution error:', err);
      const friendlyMsg = err.message || 'Stellar transaction execution failed.';
      setErrorMessage(friendlyMsg);
      setStage('error');
      addToast(friendlyMsg, 'error');
    }
  };

  const getStageIndex = (s) => {
    const map = { preparing: 0, signing: 1, submitting: 2, waiting: 3, confirmed: 4 };
    return map[s] ?? 0;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC] shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center">
              {mode === 'send' ? <ArrowUpRight className="h-5 w-5" /> : mode === 'receive' ? <ArrowDownLeft className="h-5 w-5" /> : <QrCode className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                {mode === 'send' ? 'Stellar Payment Console' : mode === 'receive' ? 'Receive XLM' : 'Stellar QR Address'}
              </h3>
              <p className="text-xs text-[#64748B]">Stellar Testnet Horizon Consensus</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {mode === 'send' ? (
            <AnimatePresence mode="wait">
              {stage === 'idle' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSendSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B] mb-1.5">
                      Destination Public Key (G...)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF..."
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
                      {isFreighterConnected ? 'Signing Authority' : 'Sender Secret Key (S...) - Dev Mode'}
                    </label>
                    {isFreighterConnected ? (
                      <div className="h-12 w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Connected via Freighter Browser Extension</span>
                      </div>
                    ) : (
                      <input
                        type="password"
                        placeholder="S..."
                        value={senderSecret}
                        onChange={(e) => setSenderSecret(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-[#D9E2E1] bg-white px-4 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
                      />
                    )}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-100 space-y-1 text-xs text-[#0F766E]">
                    <div className="flex items-center gap-2 font-semibold">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>Network Fee: 0.00001 XLM • Stellar Testnet Horizon RPC</span>
                    </div>
                    <p className="text-[11px] text-[#0F766E]/80 pl-6 leading-tight">
                      Standard XLM payments execute via Horizon RPC. Soroban contract RPC status warnings in Freighter do not block native transactions.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <Button variant="outline" size="md" type="button" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="md" type="submit">
                      Initiate Payment Flow
                    </Button>
                  </div>
                </motion.form>
              )}

              {/* Animated Stages View */}
              {['preparing', 'signing', 'submitting', 'waiting'].includes(stage) && (
                <motion.div
                  key="animated-stages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-6 space-y-6 text-center"
                >
                  <div className="relative flex items-center justify-center h-20">
                    <div className="absolute h-16 w-16 rounded-full bg-teal-100/60 animate-ping" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-lg">
                      <Loader2 className="h-7 w-7 animate-spin" />
                    </div>
                  </div>

                  <div>
                    <motion.h4
                      key={stage}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg font-bold font-['Space_Grotesk'] text-[#0F172A]"
                    >
                      {stagesList.find((s) => s.key === stage)?.label}
                    </motion.h4>
                    <p className="text-xs text-[#64748B] mt-1">
                      Sending <strong className="text-[#0F172A] font-mono">{amount} XLM</strong> to{' '}
                      <span className="font-mono">{recipient.substring(0, 6)}...{recipient.substring(recipient.length - 4)}</span>
                    </p>
                  </div>

                  {/* Step Progress Dots */}
                  <div className="space-y-3 px-4 pt-2">
                    <div className="flex items-center justify-between gap-2">
                      {stagesList.slice(0, 4).map((s, idx) => {
                        const currentIdx = getStageIndex(stage);
                        const isDone = idx < currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={s.key} className="flex-1 flex flex-col items-center gap-1.5">
                            <div
                              className={`h-2.5 w-full rounded-full transition-all duration-500 ${
                                isDone
                                  ? 'bg-[#0F766E]'
                                  : isCurrent
                                  ? 'bg-[#0F766E] animate-pulse shadow-[0_0_12px_rgba(15,118,110,0.5)]'
                                  : 'bg-slate-200'
                              }`}
                            />
                            <span className="text-[10px] font-semibold text-[#64748B]">
                              Step {idx + 1}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 5: Confirmed Success View */}
              {stage === 'confirmed' && txDetails && (
                <motion.div
                  key="confirmed-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mx-auto border border-emerald-200">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Sparkles className="h-3.5 w-3.5" /> Transaction Confirmed
                    </span>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#0F172A] mt-2">
                      {txDetails.amount} Sent
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1 font-mono">
                      To: {txDetails.recipient.substring(0, 10)}...{txDetails.recipient.substring(txDetails.recipient.length - 6)}
                    </p>
                  </div>

                  {/* Transaction Details Card */}
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <Cpu className="h-3.5 w-3.5 text-[#0F766E]" /> Transaction Hash
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[#0F766E]">
                        <span>{txDetails.hash.substring(0, 8)}...{txDetails.hash.substring(txDetails.hash.length - 6)}</span>
                        <button
                          type="button"
                          onClick={() => copyTxHash(txDetails.hash)}
                          className="p-1 text-[#64748B] hover:text-[#0F766E] cursor-pointer"
                        >
                          {copiedHash ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-[#0F766E]" /> Ledger Number
                      </span>
                      <span className="font-mono font-bold text-[#0F172A]">#{txDetails.ledger}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#0F766E]" /> Confirmation Time
                      </span>
                      <span className="font-mono font-semibold text-emerald-700">{confirmationTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0F766E]" /> Network Fee
                      </span>
                      <span className="font-mono text-[#0F172A]">{txDetails.fee}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${txDetails.hash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-50 text-[#0F766E] border border-teal-200/80 font-semibold text-xs hover:bg-teal-100 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" /> View on Stellar Expert
                    </a>
                    <Button variant="primary" size="md" onClick={onClose} className="w-full sm:w-auto">
                      Done
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Error Stage View */}
              {stage === 'error' && (
                <motion.div
                  key="error-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 text-center py-2"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mx-auto border border-rose-200">
                    <AlertCircle className="h-9 w-9" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#0F172A]">
                      Transaction Failed
                    </h3>
                    <p className="text-xs text-rose-600 mt-2 bg-rose-50 p-3 rounded-xl border border-rose-200 font-mono text-left break-words">
                      {errorMessage}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <Button variant="outline" size="md" onClick={() => setStage('idle')}>
                      Back to Form
                    </Button>
                    <Button variant="primary" size="md" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
