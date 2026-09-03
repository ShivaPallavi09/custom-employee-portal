const zohoService = require('../services/zohoService');

// Sales -> Zoho CRM Proxy
exports.getCRMData = async (req, res) => {
  try {
    // Fetching organization details as a proof-of-concept for CRM integration
    const data = await zohoService.makeZohoRequest('https://www.zohoapis.com/crm/v3/org');
    res.status(200).json({ service: 'Zoho CRM', data: data });
  } catch (error) {
    res.status(502).json({ message: 'Failed to fetch data from Zoho CRM' });
  }
};

// Support -> Zoho Desk Proxy
exports.getDeskData = async (req, res) => {
  try {
    // Fetching organizations/portals as a proof-of-concept for Desk integration
    const data = await zohoService.makeZohoRequest('https://desk.zoho.com/api/v1/organizations');
    res.status(200).json({ service: 'Zoho Desk', data: data });
  } catch (error) {
    res.status(502).json({ message: 'Failed to fetch data from Zoho Desk' });
  }
};

// Finance -> Zoho Books Proxy
exports.getBooksData = async (req, res) => {
  try {
    // Fetching organizations as a proof-of-concept for Books integration
    const data = await zohoService.makeZohoRequest('https://www.zohoapis.com/books/v3/organizations');
    res.status(200).json({ service: 'Zoho Books', data: data });
  } catch (error) {
    res.status(502).json({ message: 'Failed to fetch data from Zoho Books' });
  }
};

// HR -> Zoho People Proxy
exports.getPeopleData = async (req, res) => {
  try {
    // Fetching generic employee records as a proof-of-concept for People integration
    const data = await zohoService.makeZohoRequest('https://people.zoho.com/people/api/forms/P_Employee/getRecords');
    res.status(200).json({ service: 'Zoho People', data: data });
  } catch (error) {
    res.status(502).json({ message: 'Failed to fetch data from Zoho People' });
  }
};