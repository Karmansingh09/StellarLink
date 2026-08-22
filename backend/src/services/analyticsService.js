import { server } from './stellar/stellarService.js';
import { getDevicesService } from './deviceService.js';

export const getAnalyticsMetricsService = async () => {
  let devices = [];
  try {
    devices = await getDevicesService();
  } catch (err) {
    console.warn('[AnalyticsService] Error fetching devices:', err.message);
  }

  // Calculate real device status health breakdown
  const statusCounts = {
    active: 0,
    settled: 0,
    monitoring: 0,
    pending: 0,
    warning: 0,
    offline: 0,
  };

  devices.forEach((d) => {
    const st = (d.status || 'active').toLowerCase();
    if (statusCounts[st] !== undefined) {
      statusCounts[st]++;
    } else {
      statusCounts.active++;
    }
  });

  const healthyCount = statusCounts.active + statusCounts.settled + statusCounts.monitoring;
  const warningCount = statusCounts.pending + statusCounts.warning;
  const offlineCount = statusCounts.offline;

  const deviceHealth = [
    { name: 'Healthy', value: healthyCount, color: '#0F766E' },
    { name: 'Warning', value: warningCount, color: '#F59E0B' },
    { name: 'Offline', value: offlineCount, color: '#EF4444' },
  ];

  // Calculate real average ledger close finality from Stellar Testnet Horizon RPC
  let avgFinalityMs = 480;
  let ledgerSeq = 0;
  try {
    const latestLedgers = await server.ledgers().order('desc').limit(10).call();
    if (latestLedgers.records && latestLedgers.records.length > 1) {
      ledgerSeq = latestLedgers.records[0].sequence;
      let totalDiff = 0;
      let count = 0;
      for (let i = 0; i < latestLedgers.records.length - 1; i++) {
        const t1 = new Date(latestLedgers.records[i].closed_at).getTime();
        const t2 = new Date(latestLedgers.records[i + 1].closed_at).getTime();
        const diff = t1 - t2;
        if (diff > 0 && diff < 60000) {
          totalDiff += diff;
          count++;
        }
      }
      if (count > 0) {
        avgFinalityMs = Math.round(totalDiff / count);
      }
    }
  } catch (horizonError) {
    console.warn('[AnalyticsService] Horizon ledger finality query fallback:', horizonError.message);
  }

  return {
    throughputTps: '0 tx/min',
    throughputGrowth: '0.0%',
    successRate: '100.0%',
    averageFinalityMs: `${avgFinalityMs}ms`,
    connectedDevicesCount: devices.length,
    latestLedgerSequence: ledgerSeq,
    deviceHealth,
    performance: [],
    settlementTrends: [],
    paymentVolume: [],
  };
};

export default {
  getAnalyticsMetricsService,
};
