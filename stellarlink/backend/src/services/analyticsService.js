export const getAnalyticsMetricsService = async () => {
  return {
    throughputTps: '8.2k tx/min',
    throughputGrowth: '+6.4%',
    successRate: '99.98%',
    averageFinalityMs: '482ms',
    connectedDevicesCount: 1284,
    performance: [
      { day: 'Mon', tps: 6200, burst: 7800 },
      { day: 'Tue', tps: 6800, burst: 8100 },
      { day: 'Wed', tps: 7400, burst: 8400 },
      { day: 'Thu', tps: 8200, burst: 9100 },
      { day: 'Fri', tps: 7900, burst: 8700 },
      { day: 'Sat', tps: 8500, burst: 9400 },
      { day: 'Sun', tps: 8200, burst: 9200 },
    ],
    settlementTrends: [
      { week: 'W1', volume: 8.4 },
      { week: 'W2', volume: 11.2 },
      { week: 'W3', volume: 15.8 },
      { week: 'W4', volume: 18.4 },
      { week: 'W5', volume: 22.1 },
      { week: 'W6', volume: 28.6 },
    ],
    paymentVolume: [
      { day: 'Mon', volume: 1.2 },
      { day: 'Tue', volume: 1.8 },
      { day: 'Wed', volume: 2.4 },
      { day: 'Thu', volume: 3.1 },
      { day: 'Fri', volume: 2.9 },
      { day: 'Sat', volume: 3.8 },
      { day: 'Sun', volume: 3.2 },
    ],
    deviceHealth: [
      { name: 'Healthy', value: 72, color: '#0F766E' },
      { name: 'Warning', value: 18, color: '#F59E0B' },
      { name: 'Offline', value: 7, color: '#EF4444' },
      { name: 'Maintenance', value: 3, color: '#64748B' },
    ],
  };
};
