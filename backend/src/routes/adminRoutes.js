const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyRole = require('../middlewares/rbac');
const auditLogger = require('../middlewares/auditLogger');

// Apply RBAC: Only 'Admin' role can access these routes
router.use(verifyRole(['Admin']));

// User Management Routes
router.get('/users', adminController.getUsers);
router.post('/users', auditLogger('CREATE_USER', 'Admin Panel'), adminController.createUser);
router.put('/users/:id', auditLogger('UPDATE_USER', 'Admin Panel'), adminController.updateUser);
router.delete('/users/:id', auditLogger('DELETE_USER', 'Admin Panel'), adminController.deleteUser);

// Role Management Routes
router.get('/roles', adminController.getRoles);

// Audit Logs Route
router.get('/audit-logs', adminController.getAuditLogs);

module.exports = router;