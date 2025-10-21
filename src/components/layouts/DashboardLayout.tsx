import React, { useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import Sidebar, { LinkItem } from "./Sidebar";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import { ThemeProvider } from "../common/ThemeProvider";
type DashboardLayoutProps = {
  children: React.ReactNode;
  links: LinkItem[];
  type: string;
};

type ActiveLink = {
  id: string;
  to: string;
  label: string;
  sublink?: string;
  icon?: React.ReactNode;
  parentId?: string;
};

function flattenLinks(
  links: LinkItem[]
): (LinkItem & { parentId?: string })[] {
  return links.flatMap((link) => {
    const subs =
      link.subLinks?.map((sub) => ({
        ...sub,
        parentId: link.id,
        icon: sub.icon || link.icon,
      })) || [];
    return link.to ? [link, ...subs] : [...subs];
  });
}

function DashboardLayout({ children, links, type }: DashboardLayoutProps) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<ActiveLink | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const roleMap: Record<string, string> = {
      patient: "patient",
      doctor: "doctor",
      lab_tech: "lab tech",
      pharmacist: "pharmacist",
      admin: "admin",
      super_admin: "super admin",
      nurse: "nurse",
      matron : "matron",
    };

    if (type && roleMap[type]) {
      setUserType(roleMap[type]);
    }
  
  }, [type]);

  useEffect(() => {
  if (type) {
    document.documentElement.setAttribute("data-theme", type.toLowerCase());
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}, [type]);


  useEffect(() => {
    const currentPath = location.pathname;
    const flattened = flattenLinks(links);

    const matched = flattened
      .filter((link): link is LinkItem & { parentId?: string; to: string } => !!link.to)
      .find((link) =>
        matchPath({ path: link.to, end: !link.parentId }, currentPath)
      );



    if (matched) {
      setActiveLink({
        id: matched.id,
        to: matched.to, // matched.to is string now
        label: matched.label,
        icon: matched.icon ? React.createElement(matched.icon, {}) : null,
        sublink: matched.parentId ? ` / ${matched.label}` : "",
        parentId: matched.parentId,
      });
    } else {
      setActiveLink(null);
    }


    // Scroll top on location change
    document.getElementById("scroll-container")?.scrollTo(0, 0);
  }, [location.pathname, links]);

  return (
  <ThemeProvider>  
    <div className="min-h-screen bg-gray-100 ">
      <Sidebar links={links} active={activeLink || { id: "", label: "" }} type={userType} />
      <MobileSidebar
        links={links}
        active={activeLink || { id: "", label: "" }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        type={userType}
      />
      <div className="flex flex-col flex-1 md:ml-63 relative">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          active={
            activeLink
              ? { title: activeLink.label, sublink: activeLink.sublink || "" }
              : { title: "", sublink: "" }
          }
          type={userType}
        />
        <main
          className="flex-1 px-4 2xl:px-10 py-6 max-h-[90vh] overflow-y-scroll scrollbar-visible"
          id="scroll-container"
        >
          {children}
        </main>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default DashboardLayout;
