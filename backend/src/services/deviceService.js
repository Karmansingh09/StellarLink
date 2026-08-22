import * as StellarSdk from '@stellar/stellar-sdk';

const devicesData = [
  {
    id: 'DEV-9842-X1',
    name: 'EV Charging Node 04',
    type: 'EV Charger',
    region: 'Europe West',
    wallet: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    status: 'settled',
    battery: '94%',
    network: '5G LTE',
    lastHeartbeat: '12s ago',
    latency: '412 ms',
    volume: '0 tx',
    balance: '0.00 XLM',
    health: 98,
  },
  {
    id: 'DEV-8711-A2',
    name: 'Autonomous Fleet 11',
    type: 'Autonomous Robot',
    region: 'North America',
    wallet: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    status: 'active',
    battery: '88%',
    network: 'WiFi 6E',
    lastHeartbeat: '45s ago',
    latency: '478 ms',
    volume: '0 tx',
    balance: '0.00 XLM',
    health: 92,
  },
  {
    id: 'DEV-6520-M3',
    name: 'Microgrid Relay 02',
    type: 'Microgrid Relay',
    region: 'Asia Pacific',
    wallet: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    status: 'monitoring',
    battery: '100%',
    network: 'Satellite IoT',
    lastHeartbeat: '2m ago',
    latency: '521 ms',
    volume: '0 tx',
    balance: '0.00 XLM',
    health: 85,
  },
  {
    id: 'DEV-4310-L7',
    name: 'Logistics Hub 07',
    type: 'Autonomous Robot',
    region: 'Middle East',
    wallet: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    status: 'pending',
    battery: '72%',
    network: '5G LTE',
    lastHeartbeat: '5m ago',
    latency: '603 ms',
    volume: '0 tx',
    balance: '0.00 XLM',
    health: 70,
  },
  {
    id: 'DEV-3209-S4',
    name: 'Smart Sensor Ring',
    type: 'Smart Sensor',
    region: 'North America',
    wallet: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    status: 'settled',
    battery: '99%',
    network: 'LoRaWAN',
    lastHeartbeat: '1m ago',
    latency: '389 ms',
    volume: '0 tx',
    balance: '0.00 XLM',
    health: 99,
  },
  {
    id: 'DEV-1102-W8',
    name: 'Warehouse AI Cluster',
    type: 'Autonomous Robot',
    region: 'Europe West',
    wallet: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    status: 'offline',
    battery: '0%',
    network: 'Disconnected',
    lastHeartbeat: '2h ago',
    latency: '—',
    volume: '0 tx',
    balance: '0.00 XLM',
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
  const generatedKeypair = StellarSdk.Keypair.random();
  const validWallet = generatedKeypair.publicKey();
  const deviceId = `DEV-${Date.now().toString().slice(-6)}-X1`;

  const newDevice = {
    id: deviceId,
    name: deviceData.name,
    type: deviceData.type || 'EV Charger',
    region: deviceData.region || 'Europe West',
    wallet: validWallet,
    status: 'active',
    battery: '100%',
    network: '5G LTE',
    lastHeartbeat: 'Just now',
    latency: '390 ms',
    volume: '0 tx',
    balance: '0.00 XLM',
    health: 100,
  };

  devicesData.unshift(newDevice);
  return newDevice;
};
