import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../ui/sidebar.js';
import { cn } from '../../../lib/utils.js';
import '../../../styles/globals.css';
import {
  FaFileAlt,
  FaCalendarAlt,
  FaGraduationCap,
  FaGlobe,
  FaRocket,
  FaBuilding,
  FaVideo,
  FaGift,
  FaCog,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa';
import logoImage from '../../../assets/ahub-logo.png';

const SidebarInteractive = ({ title, showFooter }) => {
  const [isMyA360Open, setIsMyA360Open] = React.useState(false);

  return (
    <Sidebar className="bg-[#140f0a] border-r border-[#140f0a] h-full min-h-screen">
      <SidebarHeader className="border-b border-gray-800">
        <div className="flex flex-col items-center gap-3">
          {/* Gold A Logo */}
          <div className="flex items-center justify-center px-2 py-2">
            <img
              src={logoImage}
              alt="AbundanceHub Logo"
              className="w-[188px] h-[96px] object-contain"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="text-white flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {/* A360 Updates */}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaFileAlt />
                  </span>
                  <span className="text-base font-medium leading-4">
                    A360 Updates
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* A360 Calendar */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaCalendarAlt />
                  </span>
                  <span className="text-base font-medium leading-4">
                    A360 Calendar
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* My A360 with submenu */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton
                  type="button"
                  className="text-white cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMyA360Open((prev) => !prev);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="mr-3">
                    <FaGraduationCap />
                  </span>
                  <span className="text-base font-medium leading-4">
                    My A360
                  </span>
                  <span
                    className={cn(
                      'ml-auto transition-transform duration-200',
                      isMyA360Open && 'rotate-180',
                    )}
                  >
                    <FaChevronDown />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Submenu items */}
              {isMyA360Open && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Getting Started</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Mindsets</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>MTP</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Moonshot</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Gifts & Perks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Past Workshops</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Community</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-400  text-sm pl-8">
                      <span>Code of Conduct</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Directory */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaGlobe />
                  </span>
                  <span className="text-base font-medium leading-4">
                    Directory
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 2026 Abundance Summit */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaRocket />
                  </span>
                  <span className="text-base font-medium leading-4">
                    2026 Abundance Summit
                  </span>
                  <span className="ml-auto">
                    <FaChevronRight />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 2025 Abundance Summit */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaRocket />
                  </span>
                  <span className="text-base font-medium leading-4">
                    2025 Abundance Summit
                  </span>
                  <span className="ml-auto">
                    <FaChevronRight />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Member Forums */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaBuilding />
                  </span>
                  <span className="text-base font-medium leading-4">
                    Member Forums
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Exponential Mastery */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaVideo />
                  </span>
                  <span className="text-base font-medium leading-4">
                    Exponential Mastery
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Nominate a Member */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaGift />
                  </span>
                  <span className="text-base font-medium leading-4">
                    Nominate a Member
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* AI Tools */}
              <SidebarMenuItem className="py-2">
                <SidebarMenuButton className="text-white ">
                  <span className="mr-3">
                    <FaCog />
                  </span>
                  <span className="text-base font-medium leading-4">
                    AI Tools
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarInteractive;
