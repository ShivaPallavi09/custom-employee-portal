const { AuditLog } = require('../models');

// Middleware to log specific actions to the database
const auditLogger = (action, resource) => {
  return async (req, res, next) => {
    // We capture the original send function to log AFTER the response is sent
    const originalSend = res.send;
    
    res.send = function (data) {
      res.send = originalSend;
      res.send(data);
      
      // Only log if the request was successful
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          AuditLog.create({
            action: action,
            resource: resource || req.originalUrl,
            details: `Status: ${res.statusCode} | Method: ${req.method}`,
            userId: req.user ? req.user.id : null // req.user is populated by rbac.js
          });
        } catch (error) {
          console.error('Failed to create audit log:', error);
        }
      }
    };
    next();
  };
};

module.exports = auditLogger;