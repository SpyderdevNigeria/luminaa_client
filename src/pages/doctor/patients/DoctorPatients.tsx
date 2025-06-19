import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import routeLinks from "../../../utils/routes";
import useUsers from "../../../hooks/useUsers";
import DoctorApi from "../../../api/doctorApi";
import { IPatient } from "../../../types/Interfaces";
import UserImage from "../../../assets/images/patient/user.png"
import moment from "moment";

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
    return () => {};
  }, [page, status]);

  const columns: Column<IPatient>[] = [
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
      render: (user) => (
        <a href={`mailto:${user?.email}`} className="text-sm underline">
          {user?.email}
        </a>
      ),
    },
    {
      key: "age",
      label: "Age",
      render: (user) => (
        <span className="text-sm">
          {user?.dateOfBirth ? moment().diff(user.dateOfBirth, "years").toString() : "N/A"}
        </span>
      ),
    },
    {
      key: "bioData",
      label: "Bio Data",
      render: (user) => (
        <span className="capitalize text-sm">
          {user?.isBioDataCompleted ? "Completed" : "Not Completed"}
        </span>
      ),
    },
    {
      key: "medicalHistory",
      label: "Medical History",
      render: (user) => (
        <p className="text-sm">
          {user?.isMedicalHistoryCompleted ? "YES" : "NO"}
        </p>
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
              onChange: (value: string) =>
                setStatus(value === "All" ? "" : value.toLowerCase()),
            },
          ]}
        />
        {loadingUsers ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Table<IPatient>
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
