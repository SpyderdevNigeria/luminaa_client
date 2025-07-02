import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import DoctorApi from "../../../api/doctorApi";
import { IPatient } from "../../../types/Interfaces";
import UserImage from "../../../assets/images/patient/user.png";
import routeLinks from "../../../utils/routes";
import moment from "moment";
import usePatients from "../../../hooks/usePatients";

function DoctorAllPatients() {
  const {
    patients,
    page,
    total,
    limit,
    totalPages,
    search,
    speciality,
    loadingPatients,
    setSearch,
    setSpeciality,
    getPatients,
    handleSetPage,
  } = usePatients(DoctorApi);

  useEffect(() => {
    getPatients();
  }, [page, search, speciality]);

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
      render: (user) =>
        user?.dateOfBirth ? (
          <span className="text-sm">
            {moment().diff(user.dateOfBirth, "years").toString()}
          </span>
        ) : (
          "N/A"
        ),
    },
    {
      key: "activePrescriptions",
      label: "Active Prescriptions",
      render: (user) => (
        <span className="capitalize text-sm">
          {user?.activePrescriptions}
        </span>
      ),
    },
    {
      key: "totalAppointments",
      label: "Total Appointments",
      render: (user) => (
        <p className="text-sm">{user?.totalAppointments}</p>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (user) => (
        <Link
          to={`${routeLinks?.doctor?.allPatients}/${user?.id}`}
          className="text-primary underline text-xs"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="container-bd">
        <HeaderTab
          title="All Patients"
          showSearch={true}
          onSearchChange={setSearch}
          dropdowns={[
            {
              label: "Speciality",
              options: ["All", "Cardiology", "Dermatology", "Neurology"], 
              value: speciality || "",
              onChange: (value: string) =>
                setSpeciality(value === "All" ? "" : value),
            },
          ]}
        />
        {loadingPatients ? (
          <p>Loading...</p>
        ) : (
          <Table<IPatient>
            data={patients}
            columns={columns}
            page={page}
            total={total}
            limit={limit}
            totalPages={totalPages}
            setPage={handleSetPage}
          />
        )}
      </section>
    </div>
  );
}

export default DoctorAllPatients;
