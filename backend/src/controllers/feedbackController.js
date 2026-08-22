import feedbackService from '../services/feedbackService.js';

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, walletAddress, rating, feedback } = req.body;
    if (!name || !email || !feedback) {
      return res.status(400).json({ success: false, error: 'Name, email, and feedback are required fields.' });
    }
    const data = await feedbackService.addFeedback({ name, email, walletAddress, rating, feedback });
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const listFeedbacks = async (req, res) => {
  try {
    const data = await feedbackService.getFeedbacks();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const exportFeedbackCSV = async (req, res) => {
  try {
    const csv = await feedbackService.exportCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="stellarlink_user_feedback.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
