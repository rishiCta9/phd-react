const axios = require('axios');

exports.main = async (context = {}) => {
  try {
    // Extract limit from query parameters (default to 50)
    const limit = context.params?.limit?.[0] || '50';

    const response = await axios.get(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        params: {
          limit: limit,
          properties: ['firstname', 'lastname', 'email', 'phone'],
        },
      },
    );

    return {
      statusCode: 200,
      body: response.data,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error fetching contacts:', error.message);

    return {
      statusCode: error.response?.status || 500,
      body: {
        error: error.message,
        detail: error.response?.data,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
