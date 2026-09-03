const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auditLogger = require('../middlewares/auditLogger');

// POST /api/auth/login
router.post('/login', auditLogger('LOGIN', 'Authentication'), authController.login);

// POST /api/auth/bootstrap (Only works if the database has 0 users)
router.post('/bootstrap', authController.createFirstAdmin);

module.exports = router;