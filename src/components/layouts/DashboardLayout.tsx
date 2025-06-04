import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileSidebar from './MobileSidebar';
import { useLocation } from 'react-router-dom';

type DashboardLayoutProps = {
  children: React.ReactNode;
  links: { title: string; to: string; label: string; subLinks?: any, icon: React.ComponentType<{ className?: string }> }[];
  bg?:string
};


function DashboardLayout({ children, links, bg }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<{ to: string; label: string;  sublink?: string, icon: React.ReactNode } | null>(null);
  const location = useLocation();

  useEffect(() => { 
    // First, check for an exact match with the full path
    const active = links?.find((i) => i?.to === location?.pathname) || null;
  
    if (active) {
      setActiveLink({
        to: active.to,
        label: active.label,
        icon: active ? <active.icon className="" /> : null,
        sublink:''
      });
    } else {
      const parts = location.pathname.split("/");
  
      // Create the parent label (without parameters)
      const Label = `/${parts[1]}/${parts[2]}`;
  
      // Find the active link matching the Label (parent path)
      const active = links?.find((i) => i?.to === Label) || null;

        setActiveLink({
          to:  active ?  active?.to : '',
          label: active ? active?.label : '',
          icon: active ? <active.icon className="" /> : null,
          sublink:` / ${active?.label} Details`,
        });
    }
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
          active={activeLink ? { title: activeLink.label, sublink: activeLink.sublink || '' } : { title: '', sublink: '' }}
        />

        {/* Page Content */}
        <main className={`flex-1 px-4 md:px-8 py-6 ${bg}   overflow-y-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
