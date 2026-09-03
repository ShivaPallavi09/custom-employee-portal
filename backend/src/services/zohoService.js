const axios = require('axios');

let cachedAccessToken = null;
let tokenExpiryTime = null;

/**
 * Retrieves a valid Zoho Access Token using the Refresh Token.
 * It caches the token in memory and only requests a new one if it has expired.
 */
async function getZohoAccessToken() {
  // Return cached token if it is still valid (adding a 1-minute buffer)
  if (cachedAccessToken && tokenExpiryTime && Date.now() < tokenExpiryTime - 60000) {
    return cachedAccessToken;
  }

  try {
    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });

    cachedAccessToken = response.data.access_token;
    // Zoho tokens typically expire in 3600 seconds (1 hour)
    const expiresIn = response.data.expires_in || 3600; 
    tokenExpiryTime = Date.now() + (expiresIn * 1000);

    return cachedAccessToken;
  } catch (error) {
    console.error('Failed to retrieve Zoho Access Token:', error.response ? error.response.data : error.message);
    throw new Error('Unable to authenticate with Zoho API');
  }
}

/**
 * Generic helper to make authorized requests to Zoho APIs
 */
async function makeZohoRequest(endpoint, method = 'GET', data = null) {
  const token = await getZohoAccessToken();
  
  try {
    const response = await axios({
      method,
      url: endpoint,
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
    return response.data;
  } catch (error) {
    console.error(`Zoho API Error on ${endpoint}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = {
  getZohoAccessToken,
  makeZohoRequest
};