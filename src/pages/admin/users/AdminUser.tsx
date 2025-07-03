import { useEffect } from "react";
import { FiEye } from "react-icons/fi";
import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import UserImage from "../../../assets/images/patient/user.png";
import moment from "moment";
import AdminNavigate from "../../../components/common/AdminNavigate";

function AdminUser() {
  const {
    users,
    usersPage,
    usersLimit,
    usersTotal,
    usersLoading,
    getUsers,
    setUsersPage,
    setUsersSearch,
    setUsersIsDisabled,
    setUsersIsActive,
    setUsersRole,
    usersRole,
    usersSearch,
    usersIsDisabled,
    usersIsActive,
  } = useAdmin(AdminApi);

  useEffect(() => {
    getUsers();
  }, [
    usersPage,
    usersRole,
    usersSearch,
    usersIsDisabled,
    usersIsActive,
  ]);

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
          <h5 className="text-sm capitalize">
            {`${user?.firstName} ${user?.lastName}`}
          </h5>
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
      render: (user) => <span>{user?.contactNumber || "N/A"}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <StatusBadge status={user?.isActive ? "active" : "inactive"} />
      ),
    },

        {
      key: "isDisabled",
      label: "Disabled",
      render: (user) => (
        <span>{user?.isDisabled ? "YES" : "NO"}</span>
      ),
    },
    {
      key: "lastLogin",
      label: "Last Login",
      render: (user) => (
        <p>
          {user?.lastLogin
            ? moment(user.lastLogin).format("YYYY-MM-DD HH:mm")
            : "N/A"}
        </p>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user) => <p>{user?.role}</p>,
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
        onSearchChange={(value) => setUsersSearch(value)}
        dropdowns={[
          {
            label: "Status",
            options: ["Active", "Inactive"],
            onChange: (value) =>
              setUsersIsActive(value === "Active" ? "true" : "false"),
            value: usersIsActive || "",
          },
          {
            label: "Disabled",
            options: ["Yes", "No"],
            onChange: (value) =>
              setUsersIsDisabled(value === "Yes" ? "true" : "false"),
            value: usersIsDisabled || "",
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
            onChange: (value) => setUsersRole(value),
            value: usersRole || "",
          },
        ]}
      />
      <div>
        {usersLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={users}
            columns={columns}
            page={usersPage}
            total={usersTotal}
            limit={usersLimit}
            setPage={setUsersPage}
          />
        )}
      </div>
    </div>
  );
}

export default AdminUser;
