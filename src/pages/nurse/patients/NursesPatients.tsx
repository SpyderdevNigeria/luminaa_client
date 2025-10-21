import { useState, useEffect } from "react";
import { FiEye, FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import useAdmin from "../../../hooks/useAdmin";
import NurseApi from "../../../api/nurseApi";

import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToaster } from "../../../components/common/ToasterContext";
import ActionVitalsCreate from "../../../components/common/procedure/form/ActionVitalsCreate";
import routeLinks from "../../../utils/routes";

function NursePatients() {
  const {
    patients,
    patientsPage,
    patientsLimit,
    patientsTotal,
    patientsLoading,
    patientsSearch,
    patientsGender,
    patientsCity,
    isBioDataCompleted,
    isMedicalHistoryCompleted,
    getPatients,
    setPatientsPage,
    setPatientsSearch,
    setPatientsGender,
    setPatientsCity,
  } = useAdmin(NurseApi);

  const { showToast } = useToaster();
  const { user } = useSelector((state: { auth: any }) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  useEffect(() => {
    getPatients();
  }, [
    patientsPage,
    patientsSearch,
    patientsGender,
    patientsCity,
    isBioDataCompleted,
    isMedicalHistoryCompleted,
  ]);

  const handleAddVitals = (patientId: string) => {
    setSelectedPatientId(patientId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPatientId(null);
    showToast("Vitals added successfully!", "success");
  };

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (patient) => (
        <span>
          {patient?.user?.firstName && patient?.user?.lastName
            ? `${patient?.user?.firstName} ${patient?.user?.lastName}`
            : "N/A"}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (patient) => <span>{patient?.user?.email || "N/A"}</span>,
    },
    {
      key: "gender",
      label: "Gender",
      render: (patient) => <span>{patient?.gender || "N/A"}</span>,
    },
    {
      key: "city",
      label: "City",
      render: (patient) => <span>{patient?.city || "N/A"}</span>,
    },
    {
      key: "hmoNumber",
      label: "HMO Number",
      render: (patient) => <span>{patient?.hmoNumber || "N/A"}</span>,
    },
    {
      key: "hmoStatus",
      label: "HMO Status",
      render: (patient) => <span>{patient?.hmoStatus || "N/A"}</span>,
    },
    {
      key: "isBioDataCompleted",
      label: "BioData Completed",
      render: (patient) => (
        <span>{patient?.isBioDataCompleted ? "YES" : "NO"}</span>
      ),
    },
    {
      key: "isMedicalHistoryCompleted",
      label: "MedicalHistoryCompleted",
      render: (patient) => (
        <span>{patient?.isMedicalHistoryCompleted ? "YES" : "NO"}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (patient) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to={`${
                  user?.isMatron
                    ? routeLinks.matron.patient
                    : routeLinks?.nurse?.patient
                }/${patient?.id}`}
                className="hover:bg-gray-100 p-1 rounded flex items-center gap-2"
              >
                <FiEye /> View
              </Link>
            </li>
            <li
              onClick={() => handleAddVitals(patient?.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 "
            >
              <FiPlus /> Add Vitals
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (showForm && selectedPatientId) {
    return (
      <div  className="p-4 bg-white ">
   <ActionVitalsCreate
        patientId={selectedPatientId}
        onClose={handleCloseForm}
        onBack={() => setShowForm(false)}
      />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Patients</h1>
      </div>

      <HeaderTab
        title=""
        showSearch={true}
        searchPlaceholder="Search by Name"
        onSearchChange={(val) => setPatientsSearch(val)}
        dropdowns={[
          {
            label: "Gender",
            options: ["male", "female"],
            value: patientsGender,
            onChange: (val) => setPatientsGender(val),
          },
          {
            label: "City",
            options: ["Lagos", "Abuja", "Port Harcourt"],
            value: patientsCity,
            onChange: (val) => setPatientsCity(val),
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

export default NursePatients;
