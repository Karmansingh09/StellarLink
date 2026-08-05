import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import { DollarSign, Coins, Zap, Shield } from 'lucide-react';

export default function AssetHoldings({ walletData }) {
  const iconMap = { XLM: Zap, USDC: DollarSign, AQUA: Coins, SLK: Shield };

  const assetsList = walletData?.assets?.length > 0
    ? walletData.assets
    : [
        { symbol: 'XLM', name: 'Stellar Lumens', balance: walletData?.balance || '0.00 XLM', usdValue: walletData?.usdValue || '$0.00', change: walletData?.unfunded ? 'Unfunded' : 'Active' }
      ];

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Asset Holdings</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Tokens and anchored assets held in primary vault</CardDescription>
          </div>
          <Badge variant="primary" dot size="sm">
            {assetsList.length} Trustlines Active
          </Badge>
        </div>
      </CardHeader>

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
                    <p className="text-[10px] text-[#64748B]">{asset.name}</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  {asset.change || 'Active'}
                </Badge>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-[#0F172A]">{asset.balance}</p>
                  <p className="text-[10px] text-[#64748B]">{asset.usdValue} USD</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
