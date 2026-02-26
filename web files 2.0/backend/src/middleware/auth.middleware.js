const { verifyAccessToken } = require('../utils/jwt');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = verifyAccessToken(token);
            req.user = decoded;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token expired', code: 'TOKEN_EXPIRED' });
            }
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error in auth middleware' });
    }
};

const requireRole = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden: insufficient permissions' });
    }
    next();
};

module.exports = { protect, requireRole };
