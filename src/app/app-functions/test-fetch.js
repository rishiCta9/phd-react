// Local test harness for fetchContact function
// Usage (PowerShell):
//  $env:PRIVATE_APP_ACCESS_TOKEN = 'your_token'; $env:CONTACT_ID = '12345'; node .\test-fetch.js

const path = require('path');

async function run() {
  // locate the deployed function file
  const funcPath = path.join(__dirname, 'fetchContact.functions', 'fetchContact.js');
  let fn;
  try {
    fn = require(funcPath);
  } catch (err) {
    console.error(`Failed to load function at ${funcPath}:`, err.message);
    process.exit(2);
  }

  const contactId = process.env.CONTACT_ID || process.argv[2];

  // This function now uses a public API and does not require a token.
  // If you want a specific contact, set CONTACT_ID env var or pass it as arg.

  // contactId is optional; if omitted the function will return the full list.

  try {
    const result = await fn.main({ params: { contactId } });
    console.log('Status:', result.statusCode);
    try {
      console.log('Body:', JSON.stringify(result.body, null, 2));
    } catch (e) {
      console.log('Body (raw):', result.body);
    }
  } catch (err) {
    console.error('Function threw an error:', err);
    process.exit(1);
  }
}

run();
