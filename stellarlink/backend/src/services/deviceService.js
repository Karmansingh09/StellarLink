const devicesData = [
  {
    id: 'DEV-9842-X1',
    name: 'EV Charging Node 04',
    type: 'EV Charger',
    region: 'Europe West',
    wallet: 'GD6WTVMWBX227SYP5T5GZ2H4P5V2K3L4M5N6P7Q8R9S0T1U2V3W4X5Y6',
    status: 'settled',
    battery: '94%',
    network: '5G LTE',
    lastHeartbeat: '12s ago',
    latency: '412 ms',
    volume: '128 tx',
    balance: '1,250.00 XLM',
    health: 98,
  },
  {
    id: 'DEV-8711-A2',
    name: 'Autonomous Fleet 11',
    type: 'Autonomous Robot',
    region: 'North America',
    wallet: 'GB7M2N3B4V5C6X7Z8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y3U4I5O6P7L8K9J0H1G',
    status: 'active',
    battery: '88%',
    network: 'WiFi 6E',
    lastHeartbeat: '45s ago',
    latency: '478 ms',
    volume: '96 tx',
    balance: '2,400.50 XLM',
    health: 92,
  },
  {
    id: 'DEV-6520-M3',
    name: 'Microgrid Relay 02',
    type: 'Microgrid Relay',
    region: 'Asia Pacific',
    wallet: 'GC984K12J34H56G78F90D12S34A56Q78W90E12R34T56Y78U90I12O34P56L78K90',
    status: 'monitoring',
    battery: '100%',
    network: 'Satellite IoT',
    lastHeartbeat: '2m ago',
    latency: '521 ms',
    volume: '84 tx',
    balance: '890.00 XLM',
    health: 85,
  },
  {
    id: 'DEV-4310-L7',
    name: 'Logistics Hub 07',
    type: 'Autonomous Robot',
    region: 'Middle East',
    wallet: 'GD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCD',
    status: 'pending',
    battery: '72%',
    network: '5G LTE',
    lastHeartbeat: '5m ago',
    latency: '603 ms',
    volume: '64 tx',
    balance: '150.00 XLM',
    health: 70,
  },
  {
    id: 'DEV-3209-S4',
    name: 'Smart Sensor Ring',
    type: 'Smart Sensor',
    region: 'North America',
    wallet: 'GE9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDC',
    status: 'settled',
    battery: '99%',
    network: 'LoRaWAN',
    lastHeartbeat: '1m ago',
    latency: '389 ms',
    volume: '142 tx',
    balance: '3,100.00 XLM',
    health: 99,
  },
  {
    id: 'DEV-1102-W8',
    name: 'Warehouse AI Cluster',
    type: 'Autonomous Robot',
    region: 'Europe West',
    wallet: 'GF11223344556677889900AABBCCDDEEFF11223344556677889900AABBCCDDEE',
    status: 'offline',
    battery: '0%',
    network: 'Disconnected',
    lastHeartbeat: '2h ago',
    latency: '—',
    volume: '0 tx',
    balance: '45.00 XLM',
    health: 0,
  },
];

export const getDevicesService = async (query = {}) => {
  let result = [...devicesData];

  if (query.search) {
    const s = query.search.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.id.toLowerCase().includes(s) ||
        d.wallet.toLowerCase().includes(s)
    );
  }

  if (query.status && query.status !== 'all') {
    result = result.filter((d) => d.status.toLowerCase() === query.status.toLowerCase());
  }

  if (query.region && query.region !== 'all') {
    result = result.filter((d) => d.region.toLowerCase() === query.region.toLowerCase());
  }

  return result;
};

export const registerDeviceService = async (deviceData) => {
  const mockWallet = 'G' + Math.random().toString(36).substring(2, 12).toUpperCase() + '8943FL';
  const mockId = 'DEV-' + Math.floor(1000 + Math.random() * 9000) + '-X1';

  const newDevice = {
    id: mockId,
    name: deviceData.name,
    type: deviceData.type || 'EV Charger',
    region: deviceData.region || 'Europe West',
    wallet: mockWallet,
    status: 'active',
    battery: '100%',
    network: '5G LTE',
    lastHeartbeat: '1s ago',
    latency: '390 ms',
    volume: '0 tx',
    balance: `${deviceData.initialFunding || 500}.00 XLM`,
    health: 100,
  };

  devicesData.unshift(newDevice);
  return newDevice;
};
