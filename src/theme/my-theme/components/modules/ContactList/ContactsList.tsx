import React, { useEffect, useState } from 'react';

interface Contact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
  };
}

const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        // Automatically detect domain at runtime
        const domain = window.location.hostname;

        // Use relative URL if on HubSpot, fallback for local testing
        const endpoint = domain.includes('hs-sites.com')
          ? `/hs/serverless/get-contacts?limit=50`
          : `https://${domain}/hs/serverless/get-contacts?limit=50`;

        const res = await fetch(endpoint, {
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }

        const data = await res.json();
        setContacts(data.results || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        console.error('Error fetching contacts:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <div style={{ padding: '2rem' }}>Loading contacts...</div>;
  if (error)
    return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Contacts ({contacts.length})</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {contacts.map((c) => {
          const p = c.properties || {};
          return (
            <div
              key={c.id}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: 8,
              }}
            >
              <h3>
                {p.firstname} {p.lastname}
              </h3>
              <p>Email: {p.email || 'N/A'}</p>
              <p>Phone: {p.phone || 'N/A'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsList;
