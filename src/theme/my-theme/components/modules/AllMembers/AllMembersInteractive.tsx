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

// Get EXTERNAL_API from FRONTEND_URL environment variable
const getExternalApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Try to get from window object (if passed from server/component)
    const frontendUrl = (window as any).FRONTEND_URL;
    if (frontendUrl) {
      // Ensure the URL ends with /api/contacts
      const baseUrl = frontendUrl.replace(/\/$/, ''); // Remove trailing slash
      return `${baseUrl}/api/contacts`;
    }
  }
  // Fallback to default if FRONTEND_URL is not available
  return 'https://hub-serverless.vercel.app/api/contacts';
};

// Get HUBSPOT_FRONTEND_URL from environment or use default HubSpot CDN
const getHubspotFrontendUrl = () => {
  if (typeof window !== 'undefined') {
    // Try to get from window object (if passed from server/component)
    const envUrl = (window as any).HUBSPOT_FRONTEND_URL;
    if (envUrl) return envUrl;

    // Default HubSpot CDN URL
    return 'https://cdn2.hubspot.net';
  }
  return 'https://cdn2.hubspot.net';
};

interface Member {
  id: string;
  name: string;
  initials: string;
  email: string;
  city: string;
  phone: string;
  profilePicture?: string;
}

const MemberCard = ({ member }: { member: Member }) => {
  const [imageError, setImageError] = React.useState(false);
  const showImage = member.profilePicture && !imageError;
  const frontendUrl = getHubspotFrontendUrl();
  const imageUrl = member.profilePicture
    ? `${frontendUrl}/${member.profilePicture}`
    : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
      {/* Profile Picture */}
      <div className="flex justify-center pt-6 pb-4">
        {showImage && imageUrl ? (
          <img
            src={imageUrl}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-2xl font-semibold">
              {member.initials}
            </span>
          </div>
        )}
      </div>

      {/* Member Info */}
      <div className="text-center px-4 pb-4 flex-1">
        <h3 className="font-bold text-gray-900 text-xl mb-2">{member.name}</h3>
        {member.email && (
          <p className="text-sm text-gray-600 mb-1">{member.email}</p>
        )}
        {member.city && (
          <p className="text-sm text-gray-500 mb-1">{member.city}</p>
        )}
        {member.phone && (
          <p className="text-sm text-gray-500">{member.phone}</p>
        )}
      </div>
    </div>
  );
};

const AllMembersInteractive = () => {
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('all-members');
  const [members, setMembers] = React.useState<Member[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cityFilter, setCityFilter] = React.useState('');
  const [nextAfter, setNextAfter] = React.useState<string | null>(null);
  const [hasMore, setHasMore] = React.useState(false);

  // Helper function to map contacts to members
  const mapContactsToMembers = React.useCallback(
    (contactsList: any[]): Member[] => {
      return contactsList.map((contact: any) => {
        const props = contact.properties || contact;
        const firstName = props.firstname || props.firstName || '';
        const lastName = props.lastname || props.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'Unknown';
        const initials =
          `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '??';

        // Extract email
        const email = props.email || '';

        // Extract city (try city first, then ip_city as fallback)
        const city = props.city || props.ip_city || '';

        // Extract phone (try phone first, then mobilephone as fallback)
        const phone = props.phone || props.mobilephone || '';

        // Extract profile picture from hs_avatar_filemanager_key
        const profilePicture = props.hs_avatar_filemanager_key || '';

        return {
          id: contact.id || contact.hs_object_id || String(Math.random()),
          name: fullName,
          initials: initials,
          email: email,
          city: city,
          phone: phone,
          profilePicture: profilePicture,
        };
      });
    },
    [],
  );

  const fetchContacts = React.useCallback(
    async (after?: string | null) => {
      try {
        if (!after) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        // Build URL with optional after parameter
        const externalApi = getExternalApiUrl();
        const url = after ? `${externalApi}?after=${after}` : externalApi;

        const response = await fetch(url, {
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
        console.log('[DEBUG] Contacts fetched:', data);

        // Handle different response formats: array, results, or contacts property
        let contactsList: any[] = [];
        if (Array.isArray(data)) {
          contactsList = data;
        } else if (data.contacts && Array.isArray(data.contacts)) {
          contactsList = data.contacts;
        } else if (data.results && Array.isArray(data.results)) {
          contactsList = data.results;
        }

        console.log('[DEBUG] Contacts list length:', contactsList.length);
        console.log('[DEBUG] First contact sample:', contactsList[0]);

        // Extract pagination info
        const nextAfterValue = data.nextAfter || null;
        const hasMoreValue =
          data.hasMore !== undefined ? data.hasMore : nextAfterValue !== null;

        const mappedMembers = mapContactsToMembers(contactsList);

        if (after) {
          // Append new members to existing list
          setMembers((prev) => [...prev, ...mappedMembers]);
        } else {
          // Replace members for initial load
          setMembers(mappedMembers);
        }

        // Update pagination state
        setNextAfter(nextAfterValue);
        setHasMore(hasMoreValue);

        console.log(
          '[DEBUG] Pagination - nextAfter:',
          nextAfterValue,
          'hasMore:',
          hasMoreValue,
        );
      } catch (err: any) {
        setError(err.message || 'Failed to fetch contacts');
        console.error('[ERROR] Error fetching contacts:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [mapContactsToMembers],
  );

  const loadMore = React.useCallback(() => {
    if (nextAfter && hasMore && !loadingMore) {
      fetchContacts(nextAfter);
    }
  }, [nextAfter, hasMore, loadingMore, fetchContacts]);

  React.useEffect(() => {
    // Initial load - reset pagination
    setNextAfter(null);
    setHasMore(false);
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

  // Get unique city values for filter
  const cityOptions = React.useMemo(() => {
    const cities = new Set<string>();
    members.forEach((member) => {
      if (member.city) cities.add(member.city);
    });
    return Array.from(cities).sort();
  }, [members]);

  const filteredMembers = React.useMemo(() => {
    return members.filter((member) => {
      // Search filter - only search by name and email
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // City filter
      if (cityFilter && member.city !== cityFilter) return false;

      return true;
    });
  }, [members, searchQuery, cityFilter]);

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
              <div className="flex gap-4 items-center">
                {/* Search bar on the left */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaSearch className="text-gray-400" />
                  </div>
                </div>

                {/* City filter dropdown on the right */}
                <div className="flex gap-3">
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white text-sm"
                  >
                    <option value="">City</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
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
                    onClick={() => fetchContacts()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
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
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembers.map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && !loadingMore && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={loadMore}
                        className="px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#bf974c] transition-colors shadow-md hover:shadow-lg"
                      >
                        Load More
                      </button>
                    </div>
                  )}

                  {/* Loading More Indicator */}
                  {loadingMore && (
                    <div className="flex items-center justify-center py-8">
                      <FaSpinner className="w-5 h-5 animate-spin text-[#D4AF37] mr-3" />
                      <span className="text-gray-600">
                        Loading more contacts...
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AllMembersInteractive;
