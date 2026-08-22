import { getAnalyticsMetricsService } from '../services/analyticsService.js';

export const getAnalyticsMetrics = async (req, res) => {
  try {
    const data = await getAnalyticsMetricsService(req.query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
