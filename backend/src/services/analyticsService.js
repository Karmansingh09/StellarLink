import { server } from './stellar/stellarService.js';
import { getDevicesService } from './deviceService.js';

export const getAnalyticsMetricsService = async (params = {}) => {
  const { publicKey, dateRange = '30d', deviceType } = params;

  let devices = [];
  try {
    devices = await getDevicesService();
  } catch (err) {
    console.warn('[AnalyticsService] Error fetching devices:', err.message);
  }

  // Filter devices by hardware category if filter provided
  if (deviceType && deviceType !== 'all') {
    devices = devices.filter((d) => d.type === deviceType);
  }

  // Calculate real device status health breakdown from registered device fleet
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
  let avgFinalityMs = 'N/A';
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
        avgFinalityMs = `${Math.round(totalDiff / count)}ms`;
      }
    }
  } catch (horizonError) {
    console.warn('[AnalyticsService] Horizon ledger finality query error:', horizonError.message);
  }

  // Query Horizon RPC payment operations strictly for target connected account & device wallets
  let rawPayments = [];
  const targetAccounts = [];
  if (publicKey && typeof publicKey === 'string' && publicKey.startsWith('G')) {
    targetAccounts.push(publicKey);
  }
  devices.forEach((d) => {
    if (d.wallet && d.wallet.startsWith('G') && !targetAccounts.includes(d.wallet)) {
      targetAccounts.push(d.wallet);
    }
  });

  if (targetAccounts.length === 0) {
    targetAccounts.push('GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE');
  }

  for (const acc of targetAccounts) {
    try {
      const pRes = await server.payments().forAccount(acc).order('desc').limit(50).call();
      if (pRes.records) {
        rawPayments.push(...pRes.records);
      }
    } catch (err) {
      // Unfunded accounts return 404 on Horizon; catch silently
    }
  }

  // Deduplicate payment operations by id
  const paymentMapById = new Map();
  rawPayments.forEach((p) => {
    if (p.id && !paymentMapById.has(p.id)) {
      paymentMapById.set(p.id, p);
    }
  });

  const uniquePayments = Array.from(paymentMapById.values());

  // Filter by date range window if specified
  const now = Date.now();
  let msLimit = 30 * 24 * 60 * 60 * 1000;
  if (dateRange === 'today') msLimit = 24 * 60 * 60 * 1000;
  else if (dateRange === '7d') msLimit = 7 * 24 * 60 * 60 * 1000;
  else if (dateRange === '30d') msLimit = 30 * 24 * 60 * 60 * 1000;
  else if (dateRange === '90d') msLimit = 90 * 24 * 60 * 60 * 1000;

  // Filter out non-payment types and Friendbot initial funding operations
  const userM2MPayments = uniquePayments.filter((p) => {
    if (!p.created_at) return false;
    const t = new Date(p.created_at).getTime();
    if (now - t > msLimit) return false;

    const isPaymentOp = ['payment', 'path_payment_strict_send', 'path_payment_strict_receive'].includes(p.type);
    if (!isPaymentOp) return false;

    const amt = parseFloat(p.amount || 0);
    return amt > 0;
  });

  // Calculate Success Rate from actual Horizon operation success indicators
  const totalHorizonOps = userM2MPayments.length;
  const successfulOpsCount = userM2MPayments.filter((p) => p.transaction_successful !== false).length;
  const successRate = totalHorizonOps > 0 ? `${((successfulOpsCount / totalHorizonOps) * 100).toFixed(1)}%` : 'N/A';

  // Calculate Period Growth by comparing current window vs previous window of equal duration
  const prevPeriodPayments = uniquePayments.filter((p) => {
    if (!p.created_at) return false;
    const t = new Date(p.created_at).getTime();
    const age = now - t;
    return age > msLimit && age <= msLimit * 2;
  });

  const currCount = userM2MPayments.length;
  const prevCount = prevPeriodPayments.length;
  let throughputGrowth = 'N/A';
  if (prevCount > 0) {
    const growthVal = ((currCount - prevCount) / prevCount) * 100;
    throughputGrowth = `${growthVal >= 0 ? '+' : ''}${growthVal.toFixed(1)}%`;
  } else if (currCount === 0) {
    throughputGrowth = '0.0%';
  }

  // Generate 7-day chronological day names ending today
  const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSeriesDays = [];
  const todayDate = new Date();

  const numDaysInSeries = dateRange === 'today' ? 1 : 7;
  for (let i = numDaysInSeries - 1; i >= 0; i--) {
    const d = new Date(todayDate);
    d.setDate(todayDate.getDate() - i);
    timeSeriesDays.push(dayNamesShort[d.getDay()]);
  }

  // Aggregate Payment Volume per day in timeSeriesDays
  const dayVolumeMap = {};
  timeSeriesDays.forEach((day) => {
    dayVolumeMap[day] = 0;
  });

  userM2MPayments.forEach((p) => {
    const amt = parseFloat(p.amount || 0);
    const dt = new Date(p.created_at);
    const dayName = dayNamesShort[dt.getDay()];
    if (dayVolumeMap[dayName] !== undefined) {
      dayVolumeMap[dayName] += amt;
    }
  });

  const paymentVolume = currCount === 0 ? [] : timeSeriesDays.map((day) => ({
    day,
    volume: parseFloat(dayVolumeMap[day].toFixed(2)),
  }));

  // Aggregate Settlement Trends per week (W1, W2, W3, W4)
  const weekSeries = ['W1', 'W2', 'W3', 'W4'];
  const weekVolumeMap = { W1: 0, W2: 0, W3: 0, W4: 0 };

  userM2MPayments.forEach((p) => {
    const amt = parseFloat(p.amount || 0);
    const dt = new Date(p.created_at);
    const weekNum = `W${Math.min(4, Math.ceil(dt.getDate() / 7))}`;
    if (weekVolumeMap[weekNum] !== undefined) {
      weekVolumeMap[weekNum] += amt;
    }
  });

  const settlementTrends = currCount === 0 ? [] : weekSeries.map((week) => ({
    week,
    volume: parseFloat(weekVolumeMap[week].toFixed(2)),
  }));

  // Aggregate Daily Transaction Volume per day without artificial multipliers
  const dayPerfMap = {};
  timeSeriesDays.forEach((day) => {
    dayPerfMap[day] = 0;
  });

  userM2MPayments.forEach((p) => {
    const dt = new Date(p.created_at);
    const dayName = dayNamesShort[dt.getDay()];
    if (dayPerfMap[dayName] !== undefined) {
      dayPerfMap[dayName] += 1;
    }
  });

  const performance = currCount === 0 ? [] : timeSeriesDays.map((day) => ({
    day,
    txCount: dayPerfMap[day],
  }));

  const throughputTps = currCount > 0 ? `${currCount} tx` : '0 tx';

  return {
    throughputTps,
    throughputGrowth,
    successRate,
    averageFinalityMs: avgFinalityMs,
    connectedDevicesCount: devices.length,
    latestLedgerSequence: ledgerSeq,
    deviceHealth,
    performance,
    settlementTrends,
    paymentVolume,
  };
};

export default {
  getAnalyticsMetricsService,
};
