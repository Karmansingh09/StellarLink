import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, QrCode, Copy, Download } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export default function PaymentQuickActions({ onOpenReceive, onOpenSend, onToggleQR, onCopyAddress }) {
  const { addToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportKeys = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const data = {
        app: 'StellarLink Enterprise Control Plane',
        environment: 'Stellar Testnet',
        exportDate: new Date().toISOString(),
        networkPassphrase: 'Test SDF Network ; September 2015',
        horizonUrl: 'https://horizon-testnet.stellar.org',
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stellarlink_vault_config_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('StellarLink public vault configuration JSON exported', 'success');
    }, 500);
  };

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Payment Quick Actions</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Instant execution controls for master vault and device funding</CardDescription>
      </CardHeader>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onOpenReceive}
          className="flex min-h-[48px] items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0F766E] text-white font-bold text-sm hover:bg-[#115E59] transition-colors shadow-xs cursor-pointer"
        >
          <ArrowDownLeft className="h-4 w-4" />
          Receive Funds
        </button>

        <button
          type="button"
          onClick={onOpenSend}
          className="flex min-h-[48px] items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-[#D9E2E1] text-[#0F172A] font-bold text-sm hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <ArrowUpRight className="h-4 w-4" />
          Send Payment
        </button>

        <Button variant="outline" size="md" onClick={onToggleQR} className="min-h-[48px] gap-2">
          <QrCode className="h-4 w-4" />
          Generate QR
        </Button>

        <Button variant="outline" size="md" onClick={onCopyAddress} className="min-h-[48px] gap-2">
          <Copy className="h-4 w-4" />
          Copy Address
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={handleExportKeys}
          isLoading={isExporting}
          className="min-h-[48px] gap-2"
        >
          <Download className="h-4 w-4" />
          <span>{isExporting ? 'Exporting...' : 'Export Wallet Keys'}</span>
        </Button>
      </div>
    </Card>
  );
}
