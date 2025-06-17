import { useEffect } from "react";
import { Link } from "react-router-dom";

import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import routeLinks from "../../../utils/routes";
import { IUser } from "../../../types/Interfaces";
import useUsers from "../../../hooks/useUsers";
import DoctorApi from "../../../api/doctorApi";

function DoctorPatients() {
  const {
    users,
    page,
    total,
    limit,
    totalPages,
    status,
    setStatus,
    getUsers,
    handleSetPage,
    loadingUsers,
  } = useUsers(DoctorApi);

  useEffect(() => {
    getUsers();
  }, [page, status]);

  const columns: Column<IUser>[] = [
    {
      key: "id",
      label: "ID",
      arrows: true,
      render: (user) => <h5 className="text-sm">#{user?.id}</h5>,
    },
    {
      key: "fullName",
      label: "Patient Name",
      render: (user) => (
        <div className="flex items-center gap-2">
          <img
            src={user?.user?.profilePicture || "https://via.placeholder.com/20"}
            alt={`${user?.user?.firstName} ${user?.user?.lastName}`}
            className="w-5 h-5 rounded-full"
          />
          <h5 className="text-sm capitalize">{`${user?.user?.firstName} ${user?.user?.lastName}`}</h5>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (user) => (
        <a href={`mailto:${user?.user?.email}`} className="text-sm underline">
          {user?.user?.email}
        </a>
      ),
    },
    {
      key: "phoneNumber",
      label: "Phone",
      render: (user) => <p className="text-sm">{user?.user?.phoneNumber}</p>,
    },
    {
      key: "age",
      label: "Age",
      render: (user) => (
        <span className="text-sm">{user?.dateOfBirth ?? "N/A"}</span>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      render: (user) => (
        <span className="capitalize text-sm">{user?.gender}</span>
      ),
    },
    {
      key: "address",
      label: "Location",
      render: (user) => (
        <p className="text-sm">{user?.address || "Not Provided"}</p>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (user) => (
        <Link
          to={`${routeLinks?.doctor?.patients}/${user?.id}`}
          className="text-primary underline text-xs"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Dashboard Metrics */}
      <main>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Appointments" count={100} />
          <DashboardCard title="Patients" count={50} />
          <DashboardCard title="Upcoming" count={30} />
          <DashboardCard title="Cancelled" count={20} />
        </div>
      </main>

      {/* Table Section */}
      <section className="container-bd">
        <HeaderTab
          title="Patients"
          showSearch={false}
          dropdowns={[
            {
              label: "Status",
              options: ["All", "Active", "Inactive"],
              value: status || "",
              onChange: (value) =>
                setStatus(value === "All" ? "" : value.toLowerCase()),
            },
          ]}
        />
        {loadingUsers ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Table
              data={users}
              columns={columns}
              page={page}
              total={total}
              limit={limit}
              totalPages={totalPages}
              setPage={handleSetPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default DoctorPatients;
