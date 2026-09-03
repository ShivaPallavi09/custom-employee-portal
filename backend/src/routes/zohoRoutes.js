const express = require('express');
const router = express.Router();
const zohoController = require('../controllers/zohoController');
const verifyRole = require('../middlewares/rbac');
const auditLogger = require('../middlewares/auditLogger');

// 1. Sales -> Zoho CRM (Allowed: Admin, Sales)
router.get(
  '/crm',
  verifyRole(['Admin', 'Sales']),
  auditLogger('ZOHO_ACCESS', 'Zoho CRM'),
  zohoController.getCRMData
);

// 2. Support -> Zoho Desk (Allowed: Admin, Support)
router.get(
  '/desk',
  verifyRole(['Admin', 'Support']),
  auditLogger('ZOHO_ACCESS', 'Zoho Desk'),
  zohoController.getDeskData
);

// 3. Finance -> Zoho Books (Allowed: Admin, Finance)
router.get(
  '/books',
  verifyRole(['Admin', 'Finance']),
  auditLogger('ZOHO_ACCESS', 'Zoho Books'),
  zohoController.getBooksData
);

// 4. HR -> Zoho People (Allowed: Admin, HR)
router.get(
  '/people',
  verifyRole(['Admin', 'HR']),
  auditLogger('ZOHO_ACCESS', 'Zoho People'),
  zohoController.getPeopleData
);

module.exports = router;