import { getDevicesService, registerDeviceService } from '../services/deviceService.js';

export const getDevices = async (req, res) => {
  try {
    const data = await getDevicesService(req.query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const registerDevice = async (req, res) => {
  try {
    const data = await registerDeviceService(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
