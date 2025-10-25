import { useState, useEffect } from "react";
import { FiEye, } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useVitals } from "../../../hooks/useVitals";
// import { useToaster } from "../../../components/common/ToasterContext";
import PatientApi from "../../../api/PatientApi";

import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
//import ConfirmModal from "../../../components/modal/ConfirmModal";
import AdminVitalsCreate from "../../../components/common/procedure/form/ActionVitalsCreate";
// import useProcedures from "../../../hooks/useProcedures";
// import useAdmin from "../../../hooks/useAdmin";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
// import { useSelector } from "react-redux";

function PatientVitals() {
  const {
    data: vitals,
    loading,
    error,
    total,
    filters,
    fetchVitals,
    updateFilters,
  } = useVitals(PatientApi);
  // const {user} = useSelector((state: any) => state.auth);
  // const { showToast } = useToaster();

  //  Load Patients from Admin Hook
  // const {
  //   patients,
  //   patientsSearch,
  //   setPatientsSearch,
  //   getPatients,
  // } = useAdmin(PatientApi);

  //  Load Procedures from Procedure Hook
  // const {
  //   data: procedures,
  //   filters: proceduresFilters,
  //   loadProcedures,
  // } = useProcedures(AdminApi);

  const [showForm, setShowForm] = useState(false);
  const [editVital, setEditVital] = useState<any>(null);
  //const [confirmOpen, setConfirmOpen] = useState(false);
 // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [confirmMessage, setConfirmMessage] = useState("");
  //const [selectedVitalId, setSelectedVitalId] = useState<string | null>(null);

  // Load vitals when filters change
  useEffect(() => {
    fetchVitals();
  }, [
    filters.page,
    filters.patientId,
    filters.appointmentId,
    filters.procedureId,
    filters.dateFrom,
    filters.dateTo,
  ]);

  // Load patients and procedures on mount
  useEffect(() => {
    // getPatients();
    // loadProcedures();
  }, []);

  // const handleEdit = (vital: any) => {
  //   setEditVital(vital);
  //   setShowForm(true);
  // };

  // const confirmDelete = (id: string) => {
  //   setSelectedVitalId(id);
  //   setConfirmMessage("Are you sure you want to delete this vital record?");
  //   setConfirmOpen(true);
  // };

  // const onConfirmDelete = async () => {
  //   if (!selectedVitalId) return;
  //   setConfirmLoading(true);
  //   try {
  //     await AdminApi.deleteVital(selectedVitalId);
  //     showToast("Vital deleted successfully", "success");
  //     fetchVitals();
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //     showToast("Failed to delete vital", "error");
  //   } finally {
  //     setConfirmOpen(false);
  //     setConfirmLoading(false);
  //     setSelectedVitalId(null);
  //   }
  // };

  const columns: Column<any>[] = [
    {
      key: "patient",
      label: "Patient",
      render: (vital: any) => (
        <span>
          {vital?.patient?.user?.firstName && vital?.patient?.user?.lastName
            ? `${vital?.patient?.user?.firstName} ${vital?.patient?.user?.lastName}`
            : "N/A"}
        </span>
      ),
    },
    {
      key: "systolicBP",
      label: "BP",
      render: (vital: any) => (
        <span>
          {vital?.systolicBP}/{vital?.diastolicBP}
        </span>
      ),
    },
    { key: "pulse", label: "Pulse", render: (vital) => <>{vital?.pulse || "N/A"}</> },
    { key: "weight", label: "Weight", render: (vital) => <>{vital?.weight} kg</> },
    { key: "height", label: "Height", render: (vital) => <>{vital?.height} cm</> },
    {
      key: "respiratoryRate",
      label: "Resp. Rate",
      render: (vital) => <>{vital?.respiratoryRate || "—"}</>,
    },
    {
      key: "recordedAt",
      label: "Recorded At",
      render: (vital) => (
        <span>
          {vital?.createdAt
            ? new Date(vital.createdAt).toLocaleString()
            : "N/A"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (vital: any) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
       
            <li>
              <Link to={`${routeLinks.patient.vitals}/${vital?.id}`} className="flex items-center gap-4"><FiEye /> View </Link>
            </li>
            {/* <li
              onClick={() => handleEdit(vital)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(vital?.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li> */}
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (showForm) {
    return (
      <AdminVitalsCreate
        vital={editVital}
        onClose={() => {
          setShowForm(false);
          setEditVital(null);
          fetchVitals();
        }}
        onBack={() => {
          setShowForm(false);
          setEditVital(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4  bg-white p-4 ">
      <HeaderTab
        title="Vitals"
        showSearch={false}
        searches={[
          //  {
          //   label: "",
          //   placeholder: "Search patients...",
          //   value: patientsSearch,
          //   data: patients, // full object array
          //   getLabel: (p) => `${p?.user?.firstName} ${p?.user?.lastName}`,
          //   onChange: (val, selectedPatient) => {
          //     setPatientsSearch(val);
          //     if (selectedPatient) {
          //       updateFilters({ patientId: selectedPatient.id });
          //       //  setPatientsSearch("");
          //     }
          //   },
          // },
          // {
          //   label: "Procedure",
          //   placeholder: "Search procedure...",
          //   value: proceduresFilters?.search,
          //   onChange: (val) => {
          //     updateFilters({
          //       search: val,
          //       page: 1,
          //     });
          //     loadProcedures();
          //   },
          //   suggestions: procedures?.map(
          //     (proc: any) => `${proc?.type || "Procedure"} (${proc?.status})`
          //   ),
          // },
        ]}

        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        onDateFromChange={(val) => updateFilters({ dateFrom: val, page: 1 })}
        onDateToChange={(val) => updateFilters({  dateTo: val, page: 1 })}
      />



      {/* 🗑 Confirm Delete */}
      {/* <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedVitalId(null);
        }}
        loading={confirmLoading}
      /> */}

      {/* 📋 Table */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading vitals</p>
        ) : (
          <Table
            data={vitals}
            columns={columns}
            page={filters.page}
            total={total}
            limit={filters.limit}
            setPage={(p: number) => updateFilters({ page: p })}
          />
        )}
      </div>
    </div>
  );
}

export default PatientVitals;
