import { ArrowDownLeft, ArrowUpRight, QrCode, Copy, Download, RefreshCw } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';

export default function PaymentQuickActions({ onOpenReceive, onOpenSend, onToggleQR, onCopyAddress }) {
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

        <Button variant="outline" size="md" className="min-h-[48px] gap-2">
          <Download className="h-4 w-4" />
          Export Wallet Keys
        </Button>
      </div>
    </Card>
  );
}
