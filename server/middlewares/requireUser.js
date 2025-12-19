import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token missing.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded?.userId).select('_id role status');
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }
    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Account suspended. Contact support.' });
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    console.error('requireUser middleware error:', error.message);
    const status = error.name === 'JsonWebTokenError' ? 401 : 500;
    res.status(status).json({ message: 'Authentication failed.' });
  }
};

export default requireUser;
