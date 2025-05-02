import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileSidebar from './MobileSidebar';
import { useLocation } from 'react-router-dom';

type DashboardLayoutProps = {
  children: React.ReactNode;
  links: { title: string; to: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
};

function DashboardLayout({ children, links }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<{ to: string; label: string; icon: React.ReactNode } | null>(null);
  const location = useLocation();

  useEffect(() => {
    const active = links?.find((i) => i?.to === location?.pathname) || null;
    setActiveLink(
      active
        ? { to: active.to, label: active.label, icon: <active.icon className="" /> }
        : null
    );
  }, [location]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar*/}
        <Sidebar links={links} active={activeLink || { label: '' }} />

      {/* Mobile Sidebar */}
      <MobileSidebar
        links={links}
        active={activeLink || { label: '' }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-62 relative">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          active={activeLink ? { title: activeLink.label } : { title: '' }}
        />

        {/* Page Content */}
        <main className="flex-1 px-4 md:px-24 py-6   overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
