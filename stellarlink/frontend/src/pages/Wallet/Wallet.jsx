import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, PlusCircle, RefreshCw } from 'lucide-react';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import WalletKPICards from '../../components/wallet/WalletKPICards';
import MainBalanceCard from '../../components/wallet/MainBalanceCard';
import AssetHoldings from '../../components/wallet/AssetHoldings';
import PaymentQuickActions from '../../components/wallet/PaymentQuickActions';
import WalletTransactionsTable from '../../components/wallet/WalletTransactionsTable';
import ConnectedDeviceWallets from '../../components/wallet/ConnectedDeviceWallets';
import WalletAnalytics from '../../components/wallet/WalletAnalytics';
import WalletRightSidebar from '../../components/wallet/WalletRightSidebar';
import SendReceiveModal from '../../components/wallet/SendReceiveModal';
import { CardSkeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../context/ToastContext';
import { useStellarWallet, useCreateWallet, useFundWallet } from '../../hooks/useStellar';

const defaultTestnetPublicKey = 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7';

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
  const { addToast } = useToast();
  const [modalMode, setModalMode] = useState(null); // 'send' | 'receive' | 'qr' | null
  const [activePublicKey, setActivePublicKey] = useState(defaultTestnetPublicKey);
  const [activeSecretKey, setActiveSecretKey] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  const { data: walletData, isLoading, refetch } = useStellarWallet(activePublicKey);
  const createWalletMutation = useCreateWallet();
  const fundWalletMutation = useFundWallet();

  const handleGenerateWallet = async () => {
    try {
      const newWallet = await createWalletMutation.mutateAsync();
      setActivePublicKey(newWallet.publicKey);
      setActiveSecretKey(newWallet.secretKey);
      addToast('New Stellar Testnet keypair generated!', 'success');
    } catch (err) {
      addToast(err.message || 'Keypair generation failed', 'error');
    }
  };

  const handleFundFriendbot = async () => {
    try {
      await fundWalletMutation.mutateAsync(activePublicKey);
      addToast('Account funded with 10,000 Testnet XLM via Friendbot!', 'success');
      refetch();
    } catch (err) {
      addToast(err.message || 'Friendbot funding failed', 'error');
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activePublicKey);
    addToast('Vault address copied to clipboard', 'success');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Page Title Banner */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot size="sm">
                  Stellar Vault Infrastructure
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Testnet SDK v12.4
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Wallet Management
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Manage Stellar wallets, balances, assets, and machine-to-machine payments securely.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto">
              <Button
                variant="outline"
                size="md"
                onClick={() => refetch()}
                className="gap-2 min-h-[44px]"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh Balance</span>
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleGenerateWallet}
                isLoading={createWalletMutation.isPending}
                className="gap-2 min-h-[44px]"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Generate Testnet Keypair</span>
              </Button>
            </div>
          </div>

          {/* Dev Mode Keypair Info Banner if generated */}
          {activeSecretKey && (
            <div className="mt-3 p-4 rounded-2xl border border-[#CBE9E3] bg-[#EAF8F6] text-xs font-mono text-[#0F766E] space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <Key className="h-4 w-4" /> Dev Mode Stellar Testnet Keypair Generated:
              </p>
              <p><strong className="text-[#0F172A]">Public:</strong> {activePublicKey}</p>
              <p className="flex items-center gap-2">
                <strong className="text-[#0F172A]">Secret:</strong>
                {showSecret ? activeSecretKey : '•••••••••••••••••••••••••••••••••••••••••••••••••••••••• font-mono'}
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="underline cursor-pointer text-[#0F766E] font-sans font-semibold ml-2"
                >
                  {showSecret ? 'Hide Secret' : 'Reveal Secret'}
                </button>
              </p>
            </div>
          )}
        </Container>
      </motion.section>

      {/* Top 4 KPI Summary Cards */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <WalletKPICards />
        </Container>
      </motion.section>

      {/* Main Balance Card & Right Audit Sidebar Grid */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Balance Hero Card (8 cols) */}
            <div className="lg:col-span-8">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <MainBalanceCard
                  walletData={walletData}
                  onOpenSend={() => setModalMode('send')}
                  onOpenReceive={() => setModalMode('receive')}
                  onToggleQR={() => setModalMode('qr')}
                  onFundFriendbot={handleFundFriendbot}
                  isFunding={fundWalletMutation.isPending}
                />
              )}
            </div>

            {/* Right Audit Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <WalletRightSidebar />
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Asset Holdings Section */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <AssetHoldings />
        </Container>
      </motion.section>

      {/* Payment Quick Actions */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <PaymentQuickActions
            onOpenReceive={() => setModalMode('receive')}
            onOpenSend={() => setModalMode('send')}
            onToggleQR={() => setModalMode('qr')}
            onCopyAddress={handleCopyAddress}
          />
        </Container>
      </motion.section>

      {/* Recent Transactions Table */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <WalletTransactionsTable publicKey={activePublicKey} />
        </Container>
      </motion.section>

      {/* Connected Device Wallets */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <ConnectedDeviceWallets />
        </Container>
      </motion.section>

      {/* Analytics Charts Grid */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <WalletAnalytics />
        </Container>
      </motion.section>

      {/* Send / Receive / QR Modal */}
      <SendReceiveModal
        mode={modalMode}
        onClose={() => setModalMode(null)}
        walletData={walletData}
      />
    </motion.div>
  );
}
