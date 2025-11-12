// This function now fetches contact data from a public API endpoint
// provided by the user: https://vercel-serverless-ivory-seven.vercel.app/api/contacts
// If a contactId is provided in context.params, it will try to return that
// contact; otherwise it returns the full list.

const fetch = global.fetch || require('node-fetch');

// Get EXTERNAL_API from FRONTEND_URL environment variable
const getExternalApiUrl = () => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) {
    // Ensure the URL ends with /api/contacts
    const baseUrl = frontendUrl.replace(/\/$/, ''); // Remove trailing slash
    return `${baseUrl}/api/contacts`;
  }
  // Fallback to default if FRONTEND_URL is not available
  return 'https://vercel-serverless-ivory-seven.vercel.app/api/contacts';
};

exports.main = async (context) => {
  try {
    const { contactId } = context && context.params ? context.params : {};

    const externalApi = getExternalApiUrl();
    const res = await fetch(externalApi);
    if (!res.ok) {
      const text = await res.text();
      console.error('External API error:', res.status, text);
      return {
        statusCode: res.status,
        body: {
          message: 'Failed to fetch contacts from external API',
          details: text,
        },
        headers: { 'Content-Type': 'application/json' },
      };
    }

    const data = await res.json();

    // If caller requested a specific contact, try to find it.
    if (contactId) {
      // match by id or by contactId property (string/number)
      const found = Array.isArray(data)
        ? data.find(
            (c) =>
              String(c.id) === String(contactId) ||
              String(c.contactId) === String(contactId),
          )
        : null;

      if (!found) {
        return {
          statusCode: 404,
          body: { message: `Contact with id ${contactId} not found` },
          headers: { 'Content-Type': 'application/json' },
        };
      }

      return {
        statusCode: 200,
        body: found,
        headers: { 'Content-Type': 'application/json' },
      };
    }

    // No contactId: return full data
    return {
      statusCode: 200,
      body: data,
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.error('Error in fetchContact:', err);
    return {
      statusCode: 500,
      body: { message: 'Internal error', error: err.message || err },
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
