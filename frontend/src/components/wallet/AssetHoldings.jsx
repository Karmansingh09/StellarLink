import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import { DollarSign, Coins, Zap, Shield, Layers } from 'lucide-react';

export default function AssetHoldings({ walletData }) {
  const iconMap = { XLM: Zap, USDC: DollarSign, AQUA: Coins, SLK: Shield };

  const isUnfunded = Boolean(walletData?.unfunded);
  const assetsList = isUnfunded || !walletData?.assets || walletData.assets.length === 0 ? [] : walletData.assets;

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Asset Holdings</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Tokens and anchored assets held in primary vault</CardDescription>
          </div>
          <Badge variant={isUnfunded ? 'warning' : 'primary'} dot size="sm">
            {assetsList.length} Trustlines Active
          </Badge>
        </div>
      </CardHeader>

      {assetsList.length === 0 ? (
        <div className="py-8 text-center space-y-2 border border-dashed border-[#E2E8F0] rounded-2xl bg-[#F8FAFC]">
          <Layers className="h-8 w-8 text-[#64748B] mx-auto" />
          <p className="text-sm font-semibold text-[#0F172A]">No Assets Held</p>
          <p className="text-xs text-[#64748B]">
            {isUnfunded
              ? 'This account is unfunded on Stellar Testnet. Fund the wallet to activate XLM Native asset.'
              : 'No trustlines or token holdings detected for this account.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {assetsList.map((asset) => {
            const Icon = iconMap[asset.symbol] || Zap;
            return (
              <motion.div
                key={asset.symbol}
                whileHover={{ y: -2 }}
                className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#0F766E]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">{asset.symbol}</p>
                      <p className="text-[10px] text-[#64748B]">{asset.name || asset.asset}</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    {asset.change || 'Active'}
                  </Badge>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono font-bold text-[#0F172A]">{asset.balance}</p>
                    <p className="text-[10px] text-[#64748B]">{asset.usdValue || '$0.00 USD'}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
