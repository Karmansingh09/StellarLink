export const getAnalyticsMetricsService = async () => {
  return {
    throughputTps: '0 tx/min',
    throughputGrowth: '0.0%',
    successRate: '100.0%',
    averageFinalityMs: '482ms',
    connectedDevicesCount: 6,
    performance: [
      { day: 'Mon', tps: 0, burst: 0 },
      { day: 'Tue', tps: 0, burst: 0 },
      { day: 'Wed', tps: 0, burst: 0 },
      { day: 'Thu', tps: 0, burst: 0 },
      { day: 'Fri', tps: 0, burst: 0 },
      { day: 'Sat', tps: 0, burst: 0 },
      { day: 'Sun', tps: 0, burst: 0 },
    ],
    settlementTrends: [
      { week: 'W1', volume: 0 },
      { week: 'W2', volume: 0 },
      { week: 'W3', volume: 0 },
      { week: 'W4', volume: 0 },
      { week: 'W5', volume: 0 },
      { week: 'W6', volume: 0 },
    ],
    paymentVolume: [
      { day: 'Mon', volume: 0 },
      { day: 'Tue', volume: 0 },
      { day: 'Wed', volume: 0 },
      { day: 'Thu', volume: 0 },
      { day: 'Fri', volume: 0 },
      { day: 'Sat', volume: 0 },
      { day: 'Sun', volume: 0 },
    ],
    deviceHealth: [
      { name: 'Healthy', value: 6, color: '#0F766E' },
      { name: 'Warning', value: 0, color: '#F59E0B' },
      { name: 'Offline', value: 0, color: '#EF4444' },
      { name: 'Maintenance', value: 0, color: '#64748B' },
    ],
  };
};
