import { getSettingsService, updateSettingsService } from '../services/settingsService.js';

export const getSettings = async (req, res) => {
  try {
    const data = await getSettingsService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const data = await updateSettingsService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
