import {  useEffect } from "react";
import { FiEye } from "react-icons/fi";
import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import UserImage from "../../../assets/images/patient/user.png"
import moment from "moment";
import AdminNavigate from "../../../components/common/AdminNavigate";

function AdminPatients() {
  const {
    patients,
    patientsPage,
    patientsLimit,
    patientsTotal,
    patientsLoading,
    getPatients,
    setPatientsPage,
    setPatientsSearch,
    setPatientsIsDisabled,
    setPatientsIsActive,
    setPatientsRole,
    patientsRole,
    patientsSearch,
    patientsIsDisabled,
    patientsIsActive,
  } = useAdmin(AdminApi);


  useEffect(() => {
    getPatients();
  }, [
    patientsPage,
    patientsRole,
    patientsSearch,
    patientsIsDisabled,
    patientsIsActive,
  ]);

  useEffect(()=> {
    setPatientsRole("patient")
  }, [])
  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (user) => (
       <div className="flex items-center gap-2">
          <img
            src={user?.profilePicture?.url || UserImage}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-5 h-5 rounded-full"
          />
          <h5 className="text-sm capitalize">{`${user?.firstName} ${user?.lastName}`}</h5>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (user) => <span>{user?.email}</span>,
    },
    {
      key: "contactNumber",
      label: "Phone",
      render: (user) => <span>{user?.contactNumber || 'N/A'}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <StatusBadge status={user?.isActive ? "active" : "inactive"} />
      ),
    },
       {
      key: "lastLogin",
      label: "Last Login",
      render: (user) => (
        <p>{user?.lastLogin ? moment(user.lastLogin).format("YYYY-MM-DD HH:mm") : "N/A"}</p>
      ),
    },
       {
      key: "role",
      label: "Role",
      render: (user) => (
        <p>{user?.role}</p>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
              <AdminNavigate role={user?.role} id={user?.id}> 
                 <FiEye /> View
              </AdminNavigate>
          </ul>
        </Dropdown>
      ),
    },
  ];


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>

      <HeaderTab
        title=""
        showSearch={true}
        searchPlaceholder="Search By Name"
        onSearchChange={(value) => setPatientsSearch(value)}
        dropdowns={[
          {
            label: "Status",
            options: ["Active", "Inactive"],
            onChange: (value) =>
              setPatientsIsActive(value === "Active" ? true : false),
            value: "",
          },
          {
            label: "Disabled",
            options: ["Yes", "No"],
            onChange: (value) =>
              setPatientsIsDisabled(value === "Yes" ? true : false),
            value: "",
          },
          {
            label: "Roles",
            options: [
              "admin",
              "super_admin",
              "doctor",
              "patient",
              "lab_tech",
              "pharmacist",
            ],
            onChange: (value) => setPatientsRole(value),
            value: "",
          },
        ]}
      />
      <div>
        {patientsLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={patients}
            columns={columns}
            page={patientsPage}
            total={patientsTotal}
            limit={patientsLimit}
            setPage={setPatientsPage}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPatients;
