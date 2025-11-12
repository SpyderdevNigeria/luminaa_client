import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";
import routeLinks from "../../utils/routes";

interface AdminNavigateProps {
  role: "admin" | "doctor" | "procedure" | "nurse" | "patient" | "lab_tech" | "pharmacist" | "super_admin" | "vital" | "partner" | 'services' | "voucher" | "payment";
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
    else if (role === 'nurse') {
      url = type === "true" ? `${routeLinks.superAdmin.nurses}/${id}` : `${routeLinks.superAdmin.users}/${id}`
    }
     else if (role === 'vital') {
      url = type === "true" ? `${routeLinks.superAdmin.vitals}/${id}` : `${routeLinks.superAdmin.users}/${id}`
    }
    else if (role === 'procedure') {
      url = type === "true" ? `${routeLinks.superAdmin.procedures}/${id}` : `${routeLinks.superAdmin.users}/${id}`
    }
        else if (role === 'partner') {
      url = type === "true" ? `${routeLinks.superAdmin.partners}/${id}` : `${routeLinks.superAdmin.users}/${id}`
    }
    else if (role === 'services') {
      url = type === "true" ? `${routeLinks.superAdmin.services}/${id}` : `${routeLinks.superAdmin.users}/${id}`
    }
    else if (role === 'voucher') {
      url = type === "true" ? `${routeLinks.superAdmin.paymentVouchers}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
    }
    else if (role === "payment") {
      url = type === "true" ? `${routeLinks.superAdmin.payments}/${id}` : `${routeLinks.superAdmin.users}/${id}`;
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
    }else if (role === 'nurse') {
      url = type === "true" ? `${routeLinks.admin.nurses}/${id}` : `${routeLinks.admin.users}/${id}`
    }
     else if (role === 'vital') {
      url = type === "true" ? `${routeLinks.admin.vitals}/${id}` : `${routeLinks.admin.users}/${id}`
    }
    else if (role === 'procedure') {
      url = type === "true" ? `${routeLinks.admin.procedures}/${id}` : `${routeLinks.admin.users}/${id}`
    }
        else if (role === 'partner') {
      url = type === "true" ? `${routeLinks.admin.partners}/${id}` : `${routeLinks.admin.users}/${id}`
    }
    else if (role === 'services') {
      url = type === "true" ? `${routeLinks.admin.services}/${id}` : `${routeLinks.admin.users}/${id}`
    }
    else if (role === 'voucher') {
      url = type === "true" ? `${routeLinks.admin.paymentVouchers}/${id}` : `${routeLinks.admin.users}/${id}`;
    }
    else if (role === "payment") {
      url = type === "true" ? `${routeLinks.admin.payments}/${id}` : `${routeLinks.admin.users}/${id}`;
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
