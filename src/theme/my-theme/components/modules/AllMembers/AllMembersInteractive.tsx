import * as React from 'react';
import { SidebarContentComponent } from '../Sidebar/index.js';
import { SidebarProvider } from '../../ui/sidebar.js';
import {
  FaInfoCircle,
  FaBell,
  FaUser,
  FaChevronDown,
  FaSearch,
  FaSpinner,
} from 'react-icons/fa';

const AllMembersInteractive = () => {
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('all-members');
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchContacts = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try serverless function endpoints - HubSpot may use different paths
      const serverlessPaths = [
        '/serverless/get-contacts',
        '/hubspot-api/get-contacts',
        '/_hcms/api/get-contacts',
      ];

      let responseText: string | null = null;
      let responseStatus: number = 0;
      let responseHeaders: Headers | null = null;
      let lastError: Error | null = null;

      // Try each possible path
      for (const path of serverlessPaths) {
        try {
          console.log(`[DEBUG] Trying serverless function path: ${path}`);
          const response = await fetch(`${path}?limit=100`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });

          responseStatus = response.status;
          responseHeaders = response.headers;
          const contentType = response.headers.get('content-type');
          const text = await response.text();

          // Check if we got JavaScript source code
          if (
            text.trim().startsWith('var ') ||
            text.trim().startsWith('function ') ||
            text.includes('exports.main')
          ) {
            console.log(
              `[DEBUG] ${path} returned source code, trying next path...`,
            );
            continue;
          }

          // Check if response is valid JSON
          if (contentType && contentType.includes('application/json')) {
            try {
              JSON.parse(text); // Validate it's valid JSON
              responseText = text;
              console.log(`[DEBUG] Successfully connected to: ${path}`);
              break; // Found a working path
            } catch {
              // Not valid JSON, try next path
              continue;
            }
          }

          // If status is ok and we got some text, try to parse as JSON anyway
          if (response.ok) {
            try {
              const parsed = JSON.parse(text);
              responseText = text;
              console.log(
                `[DEBUG] Successfully connected to: ${path} (parsed as JSON)`,
              );
              break;
            } catch {
              // Not valid JSON, try next path
              continue;
            }
          }

          // If not ok, store error but continue trying
          if (!response.ok) {
            lastError = new Error(
              `HTTP ${response.status}: ${text.substring(0, 100)}`,
            );
            continue;
          }
        } catch (err) {
          console.log(`[DEBUG] ${path} failed:`, err);
          lastError = err as Error;
          continue;
        }
      }

      if (!responseText) {
        throw new Error(
          lastError?.message ||
            'Could not connect to serverless function. Please ensure the function is properly deployed and accessible.',
        );
      }

      // Check if response was successful
      if (
        responseStatus !== 0 &&
        !(responseStatus >= 200 && responseStatus < 300)
      ) {
        let errorData: { error?: string; message?: string } = {};
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: responseText.substring(0, 200) };
        }
        const errorMessage =
          errorData.error || errorData.message || `HTTP ${responseStatus}`;
        throw new Error(errorMessage);
      }

      console.log(
        '[DEBUG] Response text preview:',
        responseText.substring(0, 200),
      );

      // Parse the JSON response
      const data = JSON.parse(responseText);
      console.log('[DEBUG] Contacts fetched:', data.results?.length);

      const mappedMembers = (data.results || []).map((contact) => {
        const props = contact.properties || {};
        const firstName = props.firstname || '';
        const lastName = props.lastname || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'Unknown';
        const initials =
          `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '??';

        return {
          id: contact.id,
          name: fullName,
          initials: initials,
          email: props.email || '',
          phone: props.phone || '',
          contactOwner: props.hubspot_owner_id || '',
        };
      });

      console.log('[DEBUG] Mapped members:', mappedMembers);
      setMembers(mappedMembers);
    } catch (err) {
      setError(err.message);
      console.error('[ERROR] Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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

  const filteredMembers = React.useMemo(() => {
    return members.filter((member) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      return true;
    });
  }, [members, searchQuery]);

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
            <div className="flex gap-1 border-b border-gray-200 bg-white px-6 pt-4">
              <button
                onClick={() => setSelectedTab('directory')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTab === 'directory'
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Directory
              </button>
              <button
                onClick={() => setSelectedTab('all-members')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTab === 'all-members'
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Members
              </button>
            </div>

            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaSearch className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <FaSpinner className="w-6 h-6 animate-spin text-[#D4AF37] mr-3" />
                  <span className="text-gray-600">Loading contacts...</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-700 mb-2">
                    Error loading contacts: {error}
                  </p>
                  <button
                    onClick={fetchContacts}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && (
                <div className="mb-4 text-sm text-gray-600">
                  Showing {filteredMembers.length} of {members.length} members
                </div>
              )}

              {!loading && !error && filteredMembers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">No members found</p>
                  <p className="text-sm">
                    {searchQuery
                      ? 'Try adjusting your search'
                      : 'No contacts available'}
                  </p>
                </div>
              )}

              {!loading && !error && filteredMembers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 text-xl font-semibold">
                            {member.initials}
                          </span>
                        </div>
                      </div>

                      <div className="text-center mb-3">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          {member.name}
                        </h3>
                        {member.email && (
                          <p className="text-sm text-gray-600 mb-1">
                            {member.email}
                          </p>
                        )}
                        {member.phone && (
                          <p className="text-sm text-gray-600 mb-1">
                            {member.phone}
                          </p>
                        )}
                        {member.contactOwner && (
                          <p className="text-xs text-gray-500 mt-2">
                            Owner: {member.contactOwner}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AllMembersInteractive;
