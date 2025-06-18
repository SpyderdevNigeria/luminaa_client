import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";
import routeLinks from "../../utils/routes";

interface AdminNavigateProps {
  role: "admin" | "doctor" | "patient" | "lab_tech" | "pharmacist" | "super_admin";
  id: string;
  children: ReactNode;
}

function AdminNavigate({ role, id, children }: AdminNavigateProps) {
  const navigate = useNavigate();
  const { userProfile } = useAdminAuth();
  let url: string | null = null;

  const isSuperAdmin = userProfile?.user?.role === "super_admin";

  if (isSuperAdmin) {
    if (role === "admin" || role === "super_admin") {
      url = `${routeLinks.superAdmin.admins}/${id}`;
    } else if (role === "doctor") {
      url = `${routeLinks.superAdmin.doctors}/${id}`;
    } else if (role === "patient") {
      url = `${routeLinks.superAdmin.patients}/${id}`;
    } else if (role === "lab_tech") {
      url = `${routeLinks.superAdmin.lab}/${id}`;
    } else if (role === "pharmacist") {
      url = `${routeLinks.superAdmin.pharmacists}/${id}`;
    }
  } else {
    if (role === "admin") {
      url = `${routeLinks.admin.admin}/${id}`;
    } else if (role === "doctor") {
      url = `${routeLinks.admin.doctors}/${id}`;
    } else if (role === "patient") {
      url = `${routeLinks.admin.patients}/${id}`;
    } else if (role === "lab_tech") {
      url = `${routeLinks.admin.lab}/${id}`;
    } else if (role === "pharmacist") {
      url = `${routeLinks.admin.pharmacists}/${id}`;
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
