import React, { useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileSidebar from './MobileSidebar';

type LinkItem = {
  title: string;
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subLinks?: LinkItem[];
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  links: LinkItem[];
  bg?: string;
};

type ActiveLink = {
  to: string;
  label: string;
  sublink?: string;
  icon?: React.ReactNode;
};

function flattenLinks(links: LinkItem[]): LinkItem[] {
  return links.flatMap(link => {
    const subs = link.subLinks?.map(sub => ({
      ...sub,
      icon: link.icon,
    })) || [];

    // Only include parent if it has a valid route
    return link.to ? [link, ...subs] : [...subs];
  });
}

function DashboardLayout({ children, links, }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<ActiveLink | null>(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const flattenedLinks = flattenLinks(links);

    const matched = flattenedLinks.find(link =>
      matchPath({ path: link.to, end: false }, currentPath)
    );

    if (matched) {
      const parent = links.find(link =>
        link.subLinks?.some(sub =>
          matchPath({ path: sub.to, end: false }, currentPath)
        )
      );

      setActiveLink({
        to: matched.to,
        label: matched.label,
        icon: <matched.icon className="" />,
        sublink: parent && parent.label !== matched.label ? ` / ${matched.label}` : '',
      });
    } else {
      setActiveLink(null);
    }
      const scrollable = document.getElementById("scroll-container");
    scrollable?.scrollTo(0, 0);
  }, [location.pathname, links]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar links={links} active={activeLink || { label: '' }}  />
      <MobileSidebar
        links={links}
        active={activeLink || { label: '' }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}

      />
      <div className="flex flex-col flex-1 md:ml-63 relative">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          active={
            activeLink
              ? { title: activeLink.label, sublink: activeLink.sublink || '' }
              : { title: '', sublink: '' }
          }
        />
        <main className="flex-1 px-4 2xl:px-18 py-6 max-h-[90vh] overflow-y-scroll scrollbar-visible"
        id="scroll-container"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
