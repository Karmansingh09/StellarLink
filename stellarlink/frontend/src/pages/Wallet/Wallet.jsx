import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, QrCode, Copy, Check, ShieldCheck, Zap, CreditCard } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card, { CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const mockWalletHistory = [
  { id: 'W-001', type: 'Received', amount: '+ 2,500.00 XLM', from: 'GAK8...39FL', time: '12m ago', status: 'settled' },
  { id: 'W-002', type: 'Sent', amount: '- 150.00 USDC', to: 'GB7M...0H1G', time: '1h ago', status: 'settled' },
  { id: 'W-003', type: 'Gas Reserve', amount: '- 50.00 XLM', to: 'Soroban Vault', time: '3h ago', status: 'settled' },
];

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

export default function Wallet() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const stellarPublicKey = 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7';

  const copyKey = () => {
    navigator.clipboard.writeText(stellarPublicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Page Header Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Stellar Vault Account
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Hot & Cold Storage
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Enterprise Settlement Wallet
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Manage operational balances, automated Soroban contract gas reserves, and device funding pools.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Main Balance Card (Mobile Optimized Hero Card) */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="rounded-3xl border border-[#CBE9E3] bg-gradient-to-br from-[#0F766E] to-[#115E59] p-6 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WalletIcon className="h-5 w-5 text-teal-200" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">Primary Master Pool</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-300" /> Multisig Secured
              </span>
            </div>

            <div>
              <p className="text-xs text-teal-200 font-medium">Total Liquidity Balance</p>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk'] tracking-tight mt-1">
                482,910.00 <span className="text-xl sm:text-3xl font-medium text-teal-200">XLM</span>
              </h1>
              <p className="text-xs text-teal-200/80 mt-1">≈ $57,949.20 USD • 12,500.00 USDC held in reserve</p>
            </div>

            {/* Large Mobile Touch Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 pt-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white text-[#0F766E] font-bold text-sm hover:bg-teal-50 transition-colors shadow-sm"
              >
                <ArrowDownLeft className="h-4 w-4" />
                Receive
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-teal-800/60 border border-teal-400/30 text-white font-bold text-sm hover:bg-teal-800 transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
                Send Funds
              </button>
              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-teal-800/40 border border-teal-400/20 text-white font-semibold text-sm hover:bg-teal-800/60 transition-colors"
              >
                <QrCode className="h-4 w-4" />
                {showQR ? 'Hide QR' : 'Show QR Code'}
              </button>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* QR Code Section (Collapsible / Modal) */}
      {showQR && (
        <motion.section initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Container size="full" className="px-0">
            <Card padding="generous" className="text-center space-y-4">
              <CardTitle className="text-base font-semibold">Stellar Mainnet Public Address</CardTitle>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl inline-block shadow-xs">
                <div className="w-48 h-48 bg-slate-900 rounded-xl flex items-center justify-center text-white font-mono text-xs text-center p-4">
                  [ QR CODE DISPLAY ]
                  <br />
                  {stellarPublicKey.substring(0, 12)}...
                </div>
              </div>
              <div className="max-w-md mx-auto flex items-center justify-center gap-2 bg-slate-50 border border-[#E2E8F0] p-2.5 rounded-xl font-mono text-xs text-[#0F172A]">
                <span className="truncate">{stellarPublicKey}</span>
                <button type="button" onClick={copyKey} className="text-[#0F766E] p-1 shrink-0">
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </Card>
          </Container>
        </motion.section>
      )}

      {/* Wallet History */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <Card padding="generous">
            <CardHeader className="mb-4">
              <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Recent Wallet Activity</CardTitle>
            </CardHeader>
            <div className="grid gap-3">
              {mockWalletHistory.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${item.amount.startsWith('+') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0]'}`}>
                      {item.amount.startsWith('+') ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">{item.type}</p>
                      <p className="text-xs text-[#64748B] font-mono">{item.from || item.to} • {item.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold font-mono ${item.amount.startsWith('+') ? 'text-emerald-700' : 'text-[#0F172A]'}`}>{item.amount}</p>
                    <Badge variant="primary" dot size="sm">{item.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </motion.section>
    </motion.div>
  );
}
