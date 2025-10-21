import { useState, useEffect } from "react";
import { FiTrash2, FiEdit, FiPlus, FiEye } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useInputOutput from "../../../hooks/useInputOutput";
import AdminApi from "../../../api/adminApi";
import Table, { Column } from "../Table";
import Dropdown from "../../dropdown/dropdown";
import ConfirmModal from "../../modal/ConfirmModal";
import { useToaster } from "../ToasterContext";
import DoctorApi from "../../../api/doctorApi";
import HeaderTab from "../HeaderTab";
import InputOutputCreate from "./components/InputOutputCreate";
import InputOutputDetails from "./InputOutputDetails";

function InputOutput({procedure, type} : any) {
  const {
    data,
    loading,
    total,
    filters,
    getInputOutputs,
    updateFilters,
  } = useInputOutput(type === 'admin' ? AdminApi :  DoctorApi);

  const { showToast } = useToaster();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState(false);
 useEffect(()=> {
  updateFilters({ patientId: procedure?.patient?.id, procedureId: procedure?.id});
 }, [procedure])
  useEffect(() => {
    if ( procedure?.patient?.id && procedure?.id) {
      getInputOutputs();
    }
  }, [
    filters.page,
    filters.limit,
    filters.type,
    filters.dateFrom,
    filters.dateTo,
    filters.patientId,
    filters.procedureId
  ]);

  const handleEdit = (item: any) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedId) return;
    setConfirmLoading(true);
    try {
      if (type == 'admin') {
      await  AdminApi.deleteInputOutput(selectedId);
      }else {
       await DoctorApi.deleteInputOutput(selectedId);
      }
      showToast("Input/Output record deleted successfully", "success");
      getInputOutputs();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete record", "error");
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };


  const columns: Column<any>[] = [
    { key: "type", label: "Type", render: (row) => <span>{row?.type}</span> },
    { key: "drugType", label: "Drug Type", render: (row) => <span>{row?.drugType}</span> },
    { key: "amount", label: "Amount", render: (row) => <span>{row?.amount}</span> },
    { key: "route", label: "Route", render: (row) => <span>{row?.data?.route}</span> },
    { key: "flowRate", label: "Flow Rate", render: (row) => <span>{row?.data?.flowRate}</span> },
    { key: "remark", label: "Remark", render: (row) => <span>{row?.remark}</span> },
    {
      key: "timestamp",
      label: "Timestamp",
      render: (row) => (
        <span>{new Date(row?.timestamp).toLocaleString()}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li onClick={()=> setView(true)}>
              <span className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2">
                <FiEye /> View
              </span>
            </li>
            <li
              onClick={() => handleEdit(row)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => handleDelete(row?.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (showForm) {
    return (
      <InputOutputCreate
        item={editItem}
        onClose={() => {
          setShowForm(false);
          setEditItem(null);
          getInputOutputs();
        }}
        patientId={procedure?.patient?.id}
        procedureId={procedure?.id}
        onBack={() => {
          setShowForm(false);
          setEditItem(null);
        }}
        type={type}
      />
    );
  }

  if (view) {
    return (
      <InputOutputDetails
        type={type}
        onBack={() => {
          setView(false);
        }}
      />
    )
  }

  return (
    <div className="space-y-4 p-4 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold">Input / Output Records</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-xs md:text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <FiPlus /> Add Record
        </button>
      </div>

      {/* 🔹 Header Filters Section */}
      <HeaderTab
        title="Nurse Reports"
        showSearch={false}
        dropdowns={[
          {
            label: "Report Type",
            options: ['input', 'output'],
            value: filters.type || "",
            onChange: (value) => updateFilters({ type: value || null }),
          },
        ]}
        dateFrom={filters.dateFrom || ""}
        onDateFromChange={(value) => updateFilters({ dateFrom: value || null })}
        dateTo={filters.dateTo || ""}
        onDateToChange={(value) => updateFilters({ dateTo: value || null })}
      />

      <ConfirmModal
        open={confirmOpen}
        description="Are you sure you want to delete this record?"
        onConfirm={onConfirmDelete}
        onClose={() => setConfirmOpen(false)}
        loading={confirmLoading}
      />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            page={filters.page}
            total={total}
            limit={filters.limit}
            setPage={(page) => updateFilters({ page })}
          />
        )}
      </div>
    </div>
  );
}

export default InputOutput;
