let currentSettings = {
  autoSettle: true,
  notifications: true,
  sorobanFailover: true,
  networkPassphrase: 'Public Global Stellar Network ; September 2015',
  maxFeeLimit: '0.00001',
  alertEmail: 'admin@stellarlink.io',
};

export const getSettingsService = async () => {
  return currentSettings;
};

export const updateSettingsService = async (newSettings) => {
  currentSettings = { ...currentSettings, ...newSettings };
  return currentSettings;
};
