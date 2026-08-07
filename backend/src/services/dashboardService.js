export const getDashboardMetricsService = async () => {
  return {
    totalSettlement: 0,
    activeDevices: 6,
    successRate: 100.0,
    averageFinality: 482,
    networkVolume: '$0.00 USD',
    settlementGrowth: '0.0%',
    overview: {
      volumeChange: '0.0%',
      finalityStatus: 'Optimal',
      devicesStatus: 'Active',
      successStatus: 'Stable',
    },
    liveTransactions: [],
  };
};
