import { CONTRACT_ADDRESSES } from './contractService.js';

const settlementsList = [];

export const createSettlementOnChain = async ({ deviceId, amount, asset = 'XLM' }) => {
  const newSettlement = {
    settlementId: `STL-${Date.now().toString().slice(-6)}`,
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
