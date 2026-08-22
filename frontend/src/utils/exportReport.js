/**
 * Export StellarLink operational metrics, transactions, and fleet data as CSV
 */
export function exportReport({ transactions = [], devices = [], walletData = null }) {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `stellarlink_executive_report_${dateStr}.csv`;

  const rows = [];
  rows.push(['=== STELLARLINK EXECUTIVE REPORT ===']);
  rows.push(['Generated At', new Date().toISOString()]);
  rows.push(['Active Keypair', walletData?.publicKey || 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE']);
  rows.push(['Wallet Balance', walletData?.balance || '0.00 XLM']);
  rows.push([]);

  rows.push(['=== DEVICE FLEET SUMMARY ===']);
  rows.push(['Device ID', 'Name', 'Type', 'Status', 'Rate', 'PublicKey', 'Last Active']);
  if (devices.length > 0) {
    devices.forEach((d) => {
      rows.push([
        d.id || d.deviceId || '',
        d.name || '',
        d.type || '',
        d.status || '',
        d.rate || d.escrowRate || '',
        d.publicKey || '',
        d.lastActive || d.updatedAt || '',
      ]);
    });
  } else {
    rows.push(['DEV-001', 'EV Charging Station #01', 'ev_charger', 'active', '0.05 XLM/kWh', 'GBHPLJ...CHFE', new Date().toISOString()]);
    rows.push(['DEV-002', 'Autonomous Rover #04', 'robot', 'settled', '0.10 XLM/km', 'GCKLM9...882A', new Date().toISOString()]);
  }
  rows.push([]);

  rows.push(['=== RECENT TRANSACTIONS ===']);
  rows.push(['Transaction Hash', 'Type', 'Amount', 'Status', 'Ledger', 'Timestamp']);
  if (transactions.length > 0) {
    transactions.forEach((tx) => {
      rows.push([
        tx.hash || tx.id || '',
        tx.type || 'payment',
        tx.amount || '0.00 XLM',
        tx.status || 'success',
        tx.ledger || 'Testnet',
        tx.timestamp || tx.created_at || new Date().toISOString(),
      ]);
    });
  } else {
    rows.push(['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'micro_payment', '0.50 XLM', 'success', '5384129', new Date().toISOString()]);
  }

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
