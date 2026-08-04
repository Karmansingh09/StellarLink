import { registerDeviceOnChain, getOnChainDevice, updateDeviceStatusOnChain } from '../services/soroban/deviceRegistryService.js';
import { createSettlementOnChain, executePaymentOnChain, getSettlementsOnChain } from '../services/soroban/paymentService.js';
import { getSorobanRPCHealth } from '../services/soroban/sorobanService.js';

export const registerDevice = async (req, res) => {
  try {
    const data = await registerDeviceOnChain(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createSettlement = async (req, res) => {
  try {
    const data = await createSettlementOnChain(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const executePayment = async (req, res) => {
  try {
    const { settlementId } = req.body;
    const data = await executePaymentOnChain(settlementId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSettlements = async (req, res) => {
  try {
    const data = await getSettlementsOnChain();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getDeviceOnChain = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOnChainDevice(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getHealth = async (req, res) => {
  try {
    const data = await getSorobanRPCHealth();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
