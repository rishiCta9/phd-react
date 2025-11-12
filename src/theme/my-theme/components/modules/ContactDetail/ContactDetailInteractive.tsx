import * as React from 'react';
import { SidebarContentComponent } from '../Sidebar/index.js';
import { SidebarProvider } from '../../ui/sidebar.js';
import {
  FaInfoCircle,
  FaBell,
  FaUser,
  FaChevronDown,
  FaSpinner,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
} from 'react-icons/fa';

// Get EXTERNAL_API from FRONTEND_URL environment variable
const getExternalApiUrl = () => {
  if (typeof window !== 'undefined') {
    const frontendUrl = (window as any).FRONTEND_URL;
    if (frontendUrl) {
      const baseUrl = frontendUrl.replace(/\/$/, '');
      return `${baseUrl}/api/contacts`;
    }
  }
  return 'https://hub-serverless.vercel.app/api/contacts';
};

// Get HUBSPOT_FRONTEND_URL from environment or use default HubSpot CDN
const getHubspotFrontendUrl = () => {
  if (typeof window !== 'undefined') {
    const envUrl = (window as any).HUBSPOT_FRONTEND_URL;
    if (envUrl) return envUrl;
    return 'https://cdn2.hubspot.net';
  }
  return 'https://cdn2.hubspot.net';
};

interface Contact {
  id: string;
  name: string;
  initials: string;
  email: string;
  city: string;
  phone: string;
  profilePicture?: string;
}

const ContactDetailInteractive = () => {
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [contact, setContact] = React.useState<Contact | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string>('');

  // Extract username from URL query parameter or path
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // First try query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const usernameParam = urlParams.get('username');

      if (usernameParam) {
        setUsername(usernameParam);
      } else {
        // Fallback to path (for /username format if you set up routing)
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        const lastPart = pathParts[pathParts.length - 1];
        // Only use path if it's not a known page route
        if (lastPart && lastPart !== 'contact-detail') {
          setUsername(lastPart);
        }
      }
    }
  }, []);

  // Fetch contact by username
  React.useEffect(() => {
    if (!username) {
      setLoading(false);
      setError('No username provided');
      return;
    }

    const fetchContact = async () => {
      try {
        setLoading(true);
        setError(null);

        const externalApi = getExternalApiUrl();
        const response = await fetch(externalApi, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
        }

        const data = await response.json();

        // Handle different response formats
        let contactsList: any[] = [];
        if (Array.isArray(data)) {
          contactsList = data;
        } else if (data.contacts && Array.isArray(data.contacts)) {
          contactsList = data.contacts;
        } else if (data.results && Array.isArray(data.results)) {
          contactsList = data.results;
        }

        // Find contact by username (match email or generate username from name)
        const foundContact = contactsList.find((contact: any) => {
          const props = contact.properties || contact;
          const email = props.email || '';
          const firstName = props.firstname || props.firstName || '';
          const lastName = props.lastname || props.lastName || '';
          const fullName = `${firstName} ${lastName}`.trim().toLowerCase();

          // Generate username from email or name
          const emailUsername = email.split('@')[0]?.toLowerCase() || '';
          const nameUsername = fullName.replace(/\s+/g, '-');

          return (
            emailUsername === username.toLowerCase() ||
            nameUsername === username.toLowerCase() ||
            fullName === username.toLowerCase()
          );
        });

        if (!foundContact) {
          throw new Error('Contact not found');
        }

        // Map contact to our format
        const props = foundContact.properties || foundContact;
        const firstName = props.firstname || props.firstName || '';
        const lastName = props.lastname || props.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'Unknown';
        const initials =
          `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '??';

        const mappedContact: Contact = {
          id: foundContact.id || foundContact.hs_object_id || '',
          name: fullName,
          initials: initials,
          email: props.email || '',
          city: props.city || props.ip_city || '',
          phone: props.phone || props.mobilephone || '',
          profilePicture: props.hs_avatar_filemanager_key || '',
        };

        setContact(mappedContact);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch contact');
        console.error('[ERROR] Error fetching contact:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [username]);

  const handleBack = () => {
    window.history.back();
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.notification-dropdown') &&
        !event.target.closest('.notification-button')
      ) {
        setIsNotificationOpen(false);
      }
      if (
        !event.target.closest('.user-dropdown') &&
        !event.target.closest('.user-button')
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const frontendUrl = getHubspotFrontendUrl();
  const imageUrl = contact?.profilePicture
    ? `${frontendUrl}/${contact.profilePicture}`
    : null;

  return (
    <SidebarProvider className="h-screen w-full">
      <div className="h-screen flex w-full">
        {/* Sidebar */}
        <div className="w-64 h-full border-r border-gray-200 bg-white overflow-hidden flex-shrink-0 flex flex-col">
          <SidebarContentComponent
            fieldValues={{ title: 'ABUNDANCEHUB', showFooter: false }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
          {/* Navbar */}
          <header className="flex h-16 shrink-0 items-center justify-end gap-4 bg-white px-6 relative border-[#bf974c] border-b-2">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-gray-700 text-xl">
                  <FaInfoCircle />
                </span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  className="notification-button p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsUserMenuOpen(false);
                  }}
                >
                  <span className="text-gray-600 text-xl relative">
                    <FaBell />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                  </span>
                </button>

                {isNotificationOpen && (
                  <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="text-center py-8 text-gray-500">
                        <span className="text-gray-300 text-5xl block mb-3">
                          <FaBell />
                        </span>
                        <p className="text-sm">No notifications for now</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  className="user-button flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsNotificationOpen(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-base">
                      <FaUser />
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    Pawan Kumar
                  </span>
                  <span className="text-gray-500 text-xs">
                    <FaChevronDown />
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Your profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="h-[1px] bg-[#D4AF37] w-full"></div>

          {/* Main Content */}
          <main className="flex flex-1 flex-col overflow-hidden bg-gray-50">
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm font-medium">Back to All Members</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <FaSpinner className="w-6 h-6 animate-spin text-[#D4AF37] mr-3" />
                  <span className="text-gray-600">Loading contact...</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {!loading && !error && contact && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#bf974c] p-8">
                      <div className="flex items-center gap-6">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={contact.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className =
                                  'w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg';
                                fallback.innerHTML = `<span class="text-[#D4AF37] text-4xl font-semibold">${contact.initials}</span>`;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                            <span className="text-[#D4AF37] text-4xl font-semibold">
                              {contact.initials}
                            </span>
                          </div>
                        )}
                        <div>
                          <h1 className="text-3xl font-bold text-white mb-2">
                            {contact.name}
                          </h1>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="p-8">
                      <div className="space-y-6">
                        {contact.email && (
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FaEnvelope className="text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">
                                Email
                              </p>
                              <p className="text-gray-900">{contact.email}</p>
                            </div>
                          </div>
                        )}

                        {contact.phone && (
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FaPhone className="text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">
                                Phone
                              </p>
                              <p className="text-gray-900">{contact.phone}</p>
                            </div>
                          </div>
                        )}

                        {contact.city && (
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FaMapMarkerAlt className="text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">
                                Location
                              </p>
                              <p className="text-gray-900">{contact.city}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ContactDetailInteractive;
