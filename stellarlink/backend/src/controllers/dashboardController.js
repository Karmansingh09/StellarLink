import { getDashboardMetricsService } from '../services/dashboardService.js';

export const getDashboardMetrics = async (req, res) => {
  try {
    const data = await getDashboardMetricsService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
