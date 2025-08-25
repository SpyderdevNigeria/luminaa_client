import { useEffect } from "react";
import PharmacistApi from "../../../api/pharmacistApi";
import HeaderTab from "../../../components/common/HeaderTab";
import useMedications from "../../../hooks/useMedications";
import {
  medicationCategoryOptions,
  medicationDosageFormOptions,
  medicationManufacturerOptions,
  medicationStatusOptions,
} from "../../../utils/dashboardUtils";
import routeLinks from "../../../utils/routes";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../components/dropdown/dropdown";
import { MdInventory } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";

const PharmacistMedications = () => {
  const {
    medications,
    medicationsTotalPages,
    medicationsPage,
    medicationsLimit,
    medicationsTotal,
    medicationsLoading,
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    setMedicationsPage,
    setMedicationSearch,
    setMedicationCategory,
    setMedicationDosageForm,
    setMedicationStatus,
    setMedicationRequiresPrescription,
    setMedicationManufacturer,
    getMedications,
  } = useMedications(PharmacistApi);
  const navigate = useNavigate()
  useEffect(() => {
    getMedications();
  }, [
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    medicationsPage,
  ]);
  const columns: Column<any>[] = [
    {
  key: "image",
  label: "Image",
  render: (m) =>
    m.image?.url ? (
      <img
        src={m.image.url}
        alt={m.name}
        className="w-12 h-12 object-cover rounded-md "
      />
    ) : (
      <span className="text-gray-400 text-sm">No image</span>
    ),
},
    { key: "name", label: "Name" },
    { key: "genericName", label: "Generic Name" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "dosageForm", label: "Dosage Form" },
    { key: "strength", label: "Strength" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (m) => `₦${m.price}` },
    {
      key: "requiresPrescription",
      label: "Requires Prescription",
      render: (m) => (m.requiresPrescription ? "Yes" : "No"),
    },
    {
      key: "status",
      label: "Status",
      render: (m) => <StatusBadge status={m.status} />,
    },
    {
      key: "isHidden",
      label: "Hidden",
      render: (m) => <p>{m.isHidden ? "Hidden" : "Visible"}</p>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (m) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">

            <li
              onClick={() => navigate(routeLinks?.pharmacist?.pharmacistInventory+'/medication/'+ m.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <MdInventory /> Inventory
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];
  return (
    <div className="bg-white  p-6 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">All Medications</h2>

      <HeaderTab
        title=""
        showSearch={true}
        onSearchChange={setMedicationSearch}
        dropdowns={[
          {
            label: "Status",
            options: medicationStatusOptions,
            value: medicationStatus,
            onChange: setMedicationStatus,
          },
          {
            label: "Category",
            options: medicationCategoryOptions,
            value: medicationCategory,
            onChange: setMedicationCategory,
          },
          {
            label: "Dosage Form",
            options: medicationDosageFormOptions,
            value: medicationDosageForm,
            onChange: setMedicationDosageForm,
          },
          {
            label:  "Requires Prescription",
            options: ["true", "false"],
            value: medicationRequiresPrescription,
            onChange: setMedicationRequiresPrescription,
          },
          {
            label: "Manufacturer",
            options: medicationManufacturerOptions,
            value: medicationManufacturer,
            onChange: setMedicationManufacturer,
          },
        ]}
      />

      {medicationsLoading ? (
        <p className="text-center mt-10 text-gray-500">Loading medications...</p>
      ) : medications.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No medications found.</p>
      ) : (
         <Table
              data={medications}
              columns={columns}
              page={medicationsPage}
              total={medicationsTotal}
              limit={medicationsLimit}
              totalPages={medicationsTotalPages}
              setPage={setMedicationsPage}
            />
      )}

    </div>
  );
};

export default PharmacistMedications;
