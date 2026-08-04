import { CONTRACT_ADDRESSES } from './contractService.js';

const settlementsList = [
  {
    settlementId: 'STL-904128',
    contractId: CONTRACT_ADDRESSES.paymentEscrow,
    deviceId: 'DEV-9842-X1',
    deviceName: 'EV Charging Node 04',
    amount: '125.40 XLM',
    status: 'Settled',
    escrowStatus: 'Released',
    txHash: '8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e',
    executedAt: '2 min ago',
    ledger: 52894101,
  },
  {
    settlementId: 'STL-871144',
    contractId: CONTRACT_ADDRESSES.settlementManager,
    deviceId: 'DEV-8711-A2',
    deviceName: 'Autonomous Fleet 11',
    amount: '45.00 USDC',
    status: 'Escrow Locked',
    escrowStatus: 'Locked',
    txHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    executedAt: '45s ago',
    ledger: 52894098,
  },
  {
    settlementId: 'STL-652022',
    contractId: CONTRACT_ADDRESSES.paymentEscrow,
    deviceId: 'DEV-6520-M3',
    deviceName: 'Microgrid Relay 02',
    amount: '890.00 XLM',
    status: 'Settled',
    escrowStatus: 'Released',
    txHash: '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    executedAt: '12 min ago',
    ledger: 52894050,
  },
];

export const createSettlementOnChain = async ({ deviceId, amount, asset = 'XLM' }) => {
  const newSettlement = {
    settlementId: `STL-${Math.floor(100000 + Math.random() * 900000)}`,
    contractId: CONTRACT_ADDRESSES.settlementManager,
    deviceId: deviceId || 'DEV-9842-X1',
    deviceName: 'EV Charging Node 04',
    amount: `${amount} ${asset}`,
    status: 'Escrow Locked',
    escrowStatus: 'Locked',
    txHash: '3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    executedAt: 'Just now',
    ledger: 52894105,
  };

  settlementsList.unshift(newSettlement);
  return newSettlement;
};

export const executePaymentOnChain = async (settlementId) => {
  const settlement = settlementsList.find((s) => s.settlementId === settlementId);
  if (settlement) {
    settlement.status = 'Settled';
    settlement.escrowStatus = 'Released';
    return settlement;
  }

  return {
    settlementId: settlementId || 'STL-904128',
    contractId: CONTRACT_ADDRESSES.paymentEscrow,
    status: 'Settled',
    escrowStatus: 'Released',
    txHash: '8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e8f7a9d3e4b1c0a9e',
    executedAt: new Date().toISOString(),
  };
};

export const getSettlementsOnChain = async () => {
  return settlementsList;
};
