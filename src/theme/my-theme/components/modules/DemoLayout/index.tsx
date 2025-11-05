import * as React from 'react';
import { ModuleFields, TextField } from '@hubspot/cms-components/fields';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '../../ui/sidebar.js';
import { SidebarContentComponent } from '../Sidebar/index.js';
import { cn } from '../../../lib/utils.js';
import '../../../styles/globals.css';
import {
  FaInfoCircle,
  FaChevronRight,
  FaBell,
  FaUser,
  FaChevronDown,
} from 'react-icons/fa';

export function Component({ fieldValues }) {
  const { mainTitle } = fieldValues;
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

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

  return (
    <SidebarProvider className="h-screen">
      <SidebarContentComponent
        fieldValues={{ title: 'ABUNDANCEHUB', showFooter: false }}
      />
      <SidebarInset className="h-screen">
        {/* Navbar */}
        <header className="flex h-16 shrink-0 items-center justify-end gap-4 bg-white px-6 relative border-[#bf974c] border-b-2">
          {/* Icons on the right */}
          <div className="flex items-center gap-4">
            {/* Information Icon */}
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-gray-700 text-xl">
                <FaInfoCircle />
              </span>
            </button>

            {/* Notification Bell with Badge */}
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

              {/* Notification Dropdown */}
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

            {/* User Profile Section */}
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

              {/* User Dropdown */}
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

        {/* Golden Horizontal Line */}
        <div className="h-[1px] bg-[#D4AF37] w-full"></div>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50">
          <h1 className="text-3xl font-bold text-[#8B4513] mb-4">
            {mainTitle}
          </h1>
          <div className="space-y-4">
            {/* Event Updates with white background */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">
                    2026 ABUNDANCE SUMMIT HOTEL RESERVATIONS NOW OPEN FOR PATRON
                    MEMBERS!
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">07/31/2025</p>
                </div>
                <span className="text-gray-400">
                  <FaChevronRight />
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">
                    RELIVE THE SUMMIT WITH TRANSCRIPT, PHOTOS, VIDEOS AND MORE
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">03/21/2025</p>
                </div>
                <span className="text-gray-400">
                  <FaChevronRight />
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">
                    10AM: MEET YOUR FORUM/PEER GROUP ON THE 2ND FLOOR
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">03/14/2025</p>
                </div>
                <span className="text-gray-400">
                  <FaChevronRight />
                </span>
              </div>
            </div>

            {/* Event Updates with blue background */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
                <span className="text-blue-600 text-xl flex-shrink-0">
                  <FaInfoCircle />
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">
                    SHARE YOUR SUMMIT FEEDBACK!
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">03/14/2025</p>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium mt-1 inline-flex items-center gap-1 hover:underline"
                  >
                    Click for Details{' '}
                    <span className="text-xs inline-block">
                      <FaChevronRight />
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
                <span className="text-blue-600 text-xl flex-shrink-0">
                  <FaInfoCircle />
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">
                    THURSDAY FORUM MEETINGS
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">03/14/2025</p>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium mt-1 inline-flex items-center gap-1 hover:underline"
                  >
                    Click for Details{' '}
                    <span className="text-xs inline-block">
                      <FaChevronRight />
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
                <span className="text-blue-600 text-xl flex-shrink-0">
                  <FaInfoCircle />
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">
                    LISTEN TO TODAY'S NOTEBOOKLM SUMMIT SUMMARY
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">03/13/2025</p>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium mt-1 inline-flex items-center gap-1 hover:underline"
                  >
                    Click for Details{' '}
                    <span className="text-xs inline-block">
                      <FaChevronRight />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const fields = (
  <ModuleFields
    children={
      <>
        <TextField
          name="mainTitle"
          label="Main Title"
          default="EVENT UPDATES"
        />
      </>
    }
  />
);

export const meta = {
  label: 'Demo Layout with Sidebar',
};
