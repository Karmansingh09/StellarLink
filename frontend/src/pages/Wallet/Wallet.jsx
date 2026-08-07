import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, PlusCircle, RefreshCw, Wallet as WalletIcon, LogOut, ExternalLink } from 'lucide-react';
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
import { useCreateWallet, useFundWallet } from '../../hooks/useStellar';
import { useWalletContext } from '../../context/WalletContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';

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
  useDocumentTitle('Wallet Management', 'Manage Stellar wallets, balances, assets, and machine-to-machine payments securely.');
  const { addToast } = useToast();
  const [modalMode, setModalMode] = useState(null); // 'send' | 'receive' | 'qr' | null

  // Single Source of Truth WalletContext
  const {
    walletData,
    publicKey: activePublicKey,
    loading: isLoading,
    refreshWallet,
    connectWallet,
    disconnectWallet,
    isFreighterConnected,
    freighterAddress,
    isConnectingFreighter,
    activeSecretKey,
    showSecret,
    setShowSecret,
  } = useWalletContext();

  const createWalletMutation = useCreateWallet();
  const fundWalletMutation = useFundWallet();

  console.log('[Wallet Page Render] Props & Context:', {
    activePublicKey,
    balance: walletData?.balance,
    unfunded: walletData?.unfunded,
    isLoading,
  });

  const handleConnectFreighter = async () => {
    try {
      const result = await connectWallet();
      addToast(`Freighter connected: ${result.publicKey.substring(0, 6)}...${result.publicKey.substring(result.publicKey.length - 4)}`, 'success');
    } catch (err) {
      if (err.message?.includes('https://www.freighter.app/')) {
        addToast(
          <span>
            Freighter extension not found.{' '}
            <a
              href="https://www.freighter.app/"
              target="_blank"
              rel="noreferrer"
              className="underline font-bold text-teal-700"
            >
              Install Freighter
            </a>
          </span>,
          'warning'
        );
      } else {
        addToast(err.message || 'Failed to connect to Freighter Wallet', 'error');
      }
    }
  };

  const handleDisconnectFreighter = async () => {
    await disconnectWallet();
    addToast('Disconnected from Freighter Wallet. Switched to default Testnet account.', 'info');
  };

  const handleGenerateWallet = async () => {
    try {
      await createWalletMutation.mutateAsync();
      addToast('New Stellar Testnet keypair generated!', 'success');
    } catch (err) {
      addToast(err.message || 'Keypair generation failed', 'error');
    }
  };

  const handleFundFriendbot = async () => {
    try {
      await fundWalletMutation.mutateAsync(activePublicKey);
      addToast('Account funded with 10,000 Testnet XLM via Friendbot!', 'success');
      refreshWallet();
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
                {isFreighterConnected ? (
                  <Badge variant="success" dot size="sm">
                    Connected via Freighter
                  </Badge>
                ) : (
                  <Badge variant="primary" dot size="sm">
                    Stellar Vault Infrastructure
                  </Badge>
                )}
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Testnet Horizon RPC
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                  Wallet Management
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Manage Stellar wallets, balances, assets, and machine-to-machine payments securely via Freighter or Testnet Keypairs.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
              <Button
                variant="outline"
                size="md"
                onClick={() => refreshWallet()}
                className="gap-2 min-h-[44px]"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>

              {isFreighterConnected ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleDisconnectFreighter}
                  className="gap-2 min-h-[44px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect Freighter</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleConnectFreighter}
                  isLoading={isConnectingFreighter}
                  className="gap-2 min-h-[44px] bg-[#0F766E] hover:bg-[#115E59]"
                >
                  <WalletIcon className="h-4 w-4" />
                  <span>Connect Freighter</span>
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                onClick={handleGenerateWallet}
                isLoading={createWalletMutation.isPending}
                className="gap-2 min-h-[44px]"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Generate Keypair</span>
              </Button>
            </div>
          </div>

          {/* Freighter Connected Info Banner */}
          {isFreighterConnected && (
            <div className="mt-3 p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-xs font-mono text-emerald-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs min-w-0">
              <div className="space-y-1 min-w-0 flex-1">
                <p className="font-bold flex items-center gap-1.5 text-emerald-800 text-sm font-sans">
                  <WalletIcon className="h-4 w-4 text-emerald-600 shrink-0" /> Connected via Freighter Browser Extension
                </p>
                <p className="break-all font-mono text-xs text-emerald-950">
                  <strong className="text-[#0F172A] font-sans font-semibold">Active Address:</strong> {freighterAddress}
                </p>
              </div>
              <a
                href={`https://stellar.expert/explorer/testnet/account/${freighterAddress}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline shrink-0 self-start sm:self-auto"
              >
                View on Stellar Expert <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Dev Mode Keypair Info Banner if generated */}
          {!isFreighterConnected && activeSecretKey && (
            <div className="mt-3 p-4 rounded-2xl border border-[#CBE9E3] bg-[#EAF8F6] text-xs font-mono text-[#0F766E] space-y-1 min-w-0">
              <p className="font-semibold flex items-center gap-1.5 font-sans">
                <Key className="h-4 w-4 shrink-0" /> Dev Mode Stellar Testnet Keypair Generated:
              </p>
              <p className="break-all"><strong className="text-[#0F172A] font-sans">Public:</strong> {activePublicKey}</p>
              <p className="flex flex-wrap items-center gap-2 break-all">
                <strong className="text-[#0F172A] font-sans">Secret:</strong>
                <span>{showSecret ? activeSecretKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}</span>
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="underline cursor-pointer text-[#0F766E] font-sans font-semibold"
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
          <WalletKPICards walletData={walletData} />
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
                  activePublicKey={activePublicKey}
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
              <WalletRightSidebar walletData={walletData} />
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Asset Holdings Section */}
      <motion.section variants={itemVariants}>
        <Container size="full" className="px-0">
          <AssetHoldings walletData={walletData} />
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
          <WalletAnalytics walletData={walletData} />
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
