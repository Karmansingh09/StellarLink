const transactionsData = [
  {
    id: 'TX-938472',
    txId: 'TX-938472',
    hash: '8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e',
    amount: '125.40 XLM',
    asset: 'XLM Native',
    status: 'completed',
    device: 'EV Charger #04',
    wallet: 'GB7M...P2L',
    fullWallet: 'GB7M2N3B4V5C6X7Z8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y3U4I5O6P7L8K9J0H1G',
    timestamp: '2 min ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'EV-CHARGE-SETTLE-04',
    latency: '412 ms',
  },
  {
    id: 'TX-871144',
    txId: 'TX-871144',
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    amount: '45.00 USDC',
    asset: 'USDC Anchored',
    status: 'processing',
    device: 'Autonomous Fleet 11',
    wallet: 'GB7M...0H1G',
    fullWallet: 'GB7M2N3B4V5C6X7Z8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y3U4I5O6P7L8K9J0H1G',
    timestamp: '45s ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'FLEET-PAYMENT-AUTOPAY',
    latency: '478 ms',
  },
  {
    id: 'TX-652022',
    txId: 'TX-652022',
    hash: '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    amount: '890.00 XLM',
    asset: 'XLM Native',
    status: 'completed',
    device: 'Microgrid Relay 02',
    wallet: 'GC98...90K9',
    fullWallet: 'GC984K12J34H56G78F90D12S34A56Q78W90E12R34T56Y78U90I12O34P56L78K90',
    timestamp: '12 min ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'GRID-RELAY-REWARD',
    latency: '389 ms',
  },
  {
    id: 'TX-431099',
    txId: 'TX-431099',
    hash: '0f1e2d3c4b5a698778695a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    amount: '12.00 XLM',
    asset: 'XLM Native',
    status: 'pending',
    device: 'Logistics Hub 07',
    wallet: 'GD12...ABCD',
    fullWallet: 'GD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCD',
    timestamp: '25 min ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'GAS-RESERVE-REFILL',
    latency: '603 ms',
  },
  {
    id: 'TX-320911',
    txId: 'TX-320911',
    hash: '7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
    amount: '340.20 XLM',
    asset: 'XLM Native',
    status: 'completed',
    device: 'Smart Sensor Ring',
    wallet: 'GE98...FEDC',
    fullWallet: 'GE9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDC',
    timestamp: '1 hour ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'SENSOR-TELEMETRY-PAY',
    latency: '389 ms',
  },
  {
    id: 'TX-110299',
    txId: 'TX-110299',
    hash: '4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c',
    amount: '0.00 XLM',
    asset: 'XLM Native',
    status: 'failed',
    device: 'Warehouse AI Cluster',
    wallet: 'GF11...DDEE',
    fullWallet: 'GF11223344556677889900AABBCCDDEEFF11223344556677889900AABBCCDDEE',
    timestamp: '2 hours ago',
    network: 'Mainnet',
    fee: '0.00001 XLM',
    memo: 'TIMEOUT-RETRY-EXCEEDED',
    latency: '—',
  },
];

export const getTransactionsService = async (query = {}) => {
  let result = [...transactionsData];

  if (query.search) {
    const s = query.search.toLowerCase();
    result = result.filter(
      (tx) =>
        tx.txId.toLowerCase().includes(s) ||
        tx.device.toLowerCase().includes(s) ||
        tx.wallet.toLowerCase().includes(s)
    );
  }

  if (query.status && query.status !== 'all') {
    result = result.filter((tx) => tx.status.toLowerCase() === query.status.toLowerCase());
  }

  if (query.device && query.device !== 'all') {
    result = result.filter((tx) => tx.device.toLowerCase() === query.device.toLowerCase());
  }

  return result;
};
