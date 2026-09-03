const jwt = require('jsonwebtoken');

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user's role is permitted (allowedRoles is an array of role names)
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
      }

      // Attach user details to the request
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or Expired Token' });
    }
  };
};

module.exports = verifyRole;