export const getDashboardMetricsService = async () => {
  return {
    totalSettlement: 48200000,
    activeDevices: 1284,
    successRate: 99.98,
    averageFinality: 482,
    networkVolume: '$48.2M',
    settlementGrowth: '+8.4%',
    overview: {
      volumeChange: '+8.4%',
      finalityStatus: 'Optimal',
      devicesStatus: 'Active',
      successStatus: 'Stable',
    },
    liveTransactions: [
      { id: 'TX-938472', amount: '125.40 XLM', asset: 'XLM Native', status: 'completed', device: 'EV Charger #04', wallet: 'GB7M...P2L', timestamp: '2 min ago' },
      { id: 'TX-871144', amount: '45.00 USDC', asset: 'USDC Anchored', status: 'processing', device: 'Autonomous Fleet 11', wallet: 'GB7M...0H1G', timestamp: '45s ago' },
      { id: 'TX-652022', amount: '890.00 XLM', asset: 'XLM Native', status: 'completed', device: 'Microgrid Relay 02', wallet: 'GC98...90K9', timestamp: '12 min ago' },
      { id: 'TX-431099', amount: '12.00 XLM', asset: 'XLM Native', status: 'pending', device: 'Logistics Hub 07', wallet: 'GD12...ABCD', timestamp: '25 min ago' },
    ],
  };
};
