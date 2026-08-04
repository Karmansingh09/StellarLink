import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';
import WalletKPICards from '../../components/wallet/WalletKPICards';
import MainBalanceCard from '../../components/wallet/MainBalanceCard';
import AssetHoldings from '../../components/wallet/AssetHoldings';
import PaymentQuickActions from '../../components/wallet/PaymentQuickActions';
import WalletTransactionsTable from '../../components/wallet/WalletTransactionsTable';
import ConnectedDeviceWallets from '../../components/wallet/ConnectedDeviceWallets';
import WalletAnalytics from '../../components/wallet/WalletAnalytics';
import WalletRightSidebar from '../../components/wallet/WalletRightSidebar';
import SendReceiveModal from '../../components/wallet/SendReceiveModal';

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
  const [modalMode, setModalMode] = useState(null); // 'send' | 'receive' | 'qr' | null

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7');
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
                  Soroban Key Manager
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
          </div>
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
              <MainBalanceCard
                onOpenSend={() => setModalMode('send')}
                onOpenReceive={() => setModalMode('receive')}
                onToggleQR={() => setModalMode('qr')}
              />
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
          <WalletTransactionsTable />
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
      <SendReceiveModal mode={modalMode} onClose={() => setModalMode(null)} />
    </motion.div>
  );
}
