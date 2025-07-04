import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";
import routeLinks from "../../utils/routes";

interface AdminNavigateProps {
  role: "admin" | "doctor" | "patient" | "lab_tech" | "pharmacist" | "super_admin";
  id: string;
  children: ReactNode;
  type?: string;
}

function AdminNavigate({ role, id, children, type }: AdminNavigateProps) {
  const navigate = useNavigate();
  const { userProfile } = useAdminAuth();
  let url: string | null = null;

  const isSuperAdmin = userProfile?.user?.role === "super_admin";

  if (isSuperAdmin) {
    if (role === "admin" || role === "super_admin") {
      url = type === "true" ? `${routeLinks.superAdmin.admins}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
    } else if (role === "doctor") {
      url = type === "true" ? `${routeLinks.superAdmin.doctors}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
    } else if (role === "patient") {
      url =  type === "true" ? `${routeLinks.superAdmin.patients}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
    } else if (role === "lab_tech") {
      url = type === "true" ? `${routeLinks.superAdmin.lab}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
    } else if (role === "pharmacist") {
      url = type === "true" ? `${routeLinks.superAdmin.pharmacists}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
    }
  } else {
    if (role === "admin") {
      url = type === "true" ? `${routeLinks.admin.admin}/${id}` : `${routeLinks.admin.users}/${id}`;
    } else if (role === "doctor") {
      url =  type === "true" ? `${routeLinks.admin.doctors}/${id}` : `${routeLinks.admin.users}/${id}`;
    } else if (role === "patient") {
      url = type === "true" ? `${routeLinks.admin.patients}/${id}` : `${routeLinks.admin.users}/${id}`;
    } else if (role === "lab_tech") {
      url = type === "true" ? `${routeLinks.admin.lab}/${id}` : `${routeLinks.admin.users}/${id}`;
    } else if (role === "pharmacist") {
      url = type === "true" ? `${routeLinks.admin.pharmacists}/${id}` : `${routeLinks.admin.users}/${id}`;
    }
  }

  return (
    <li
      onClick={() => url && navigate(url)}
      className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
    >
      {children}
    </li>
  );
}

export default AdminNavigate;
