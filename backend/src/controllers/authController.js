import { loginService, getSessionService } from '../services/authService.js';

export const login = async (req, res) => {
  try {
    const data = await loginService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const data = await getSessionService(token);
    res.json({ success: true, data });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};
