import { useEffect, useMemo, useState } from "react";
import api from "../../api/apiConfig";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiPlus, FiEdit2,  } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Table, { Column } from "./Table";
import Dropdown from "../dropdown/dropdown";
import HeaderTab from "./HeaderTab";
// import ConfirmModal from "../modal/ConfirmModal";
import Modal from "../modal/modal";
import { useToaster } from "./ToasterContext";


interface DrugChartProps {
  patientId: string;
  procedureId: string;
  type?: "admin" | "doctor" | string;
}

interface DrugChartItem {
  id?: string;
  drug: string;
  time: string; 
  dose: string;
  route: string;
  duration: string;
  remark: string;
  createdAt?: string;
  updatedAt?: string;
  // any other server fields...
}

 function DrugChart({ patientId, procedureId, type }: DrugChartProps) {
  const isAdmin = type === "admin";
  const { showToast } = useToaster();

  // list state
  const [data, setData] = useState<DrugChartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // filters / pagination
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    dateFrom: "",
    dateTo: "",
    // optionally add search etc.
  });

  // modal state for add/edit
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<DrugChartItem | null>(null);
  const emptyForm = useMemo(
    () => ({
      drug: "",
      time: "",
      dose: "",
      route: "",
      duration: "",
      remark: "",
    }),
    []
  );
  const [form, setForm] = useState<DrugChartItem>(emptyForm);

  // confirm delete
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  // view details (hides table)
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [viewingData, setViewingData] = useState<DrugChartItem | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  // build base path depending on role
  const basePath = isAdmin ? "/admin" : "/doctor";

  // fetch list
  const fetchList = async () => {
    if (!patientId || !procedureId) return;
    try {
      setLoading(true);
      const res = await api.get(`${basePath}/drug-chart/list`, {
        params: {
          patientId,
          procedureId,
          dateFrom: filters.dateFrom || undefined,
          dateTo: filters.dateTo || undefined,
          page: filters.page,
          limit: filters.limit,
        },
      });

      const payload = res.data || {};
      console.log(res)
      setData(payload?.data?.data || []);
      setTotal(payload?.data?.total ?? (payload.data ? payload?.data?.length : 0));
    } catch (err) {
      console.error("fetchList error", err);
      showToast("Failed to load drug chart list", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // auto-fetch when filters or ids change
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, procedureId, filters.page, filters.limit, filters.dateFrom, filters.dateTo]);

  // open modal for add
  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  // open modal for edit
  const openEdit = (item: DrugChartItem) => {
    setEditItem(item);
    // ensure time is ISO local if needed; keep as server value
    setForm({
      id: item.id,
      drug: item.drug || "",
      time: item.time || "",
      dose: item.dose || "",
      route: item.route || "",
      duration: item.duration || "",
      remark: item.remark || "",
    });
    setModalOpen(true);
  };

  // submit add/edit
  const handleSave = async () => {
    // basic validation
    if (!form.drug?.trim()) {
      showToast("Please enter drug name", "error");
      return;
    }
    if (!form.time) {
      showToast("Please select time", "error");
      return;
    }

    try {
      setSaving(true);
      if (editItem?.id) {
        await api.patch(`/admin/drug-chart/${editItem.id}`, form);
        showToast("Drug entry updated", "success");
      } else {
        await api.post(`/admin/drug-chart/add`, {
          ...form,
          patientId,
          procedureId,
        });
        showToast("Drug entry created", "success");
      }
      setModalOpen(false);
      setEditItem(null);
      setForm(emptyForm);
      fetchList();
    } catch (err) {
      console.error("save error", err);
      showToast("Failed to save drug entry", "error");
    } finally {
      setSaving(false);
    }
  };

  // delete
//   const confirmDelete = (id?: string) => {
//     if (!id) return;
//     setSelectedDeleteId(id);
//     setConfirmOpen(true);
//   };
//   const handleDelete = async () => {
//     if (!selectedDeleteId) return;
//     try {
//       await api.delete(`/admin/drug-chart/${selectedDeleteId}`);
//       showToast("Deleted", "success");
//       setConfirmOpen(false);
//       setSelectedDeleteId(null);
//       // if viewing that item, go back
//       if (viewingId === selectedDeleteId) {
//         setViewingId(null);
//         setViewingData(null);
//       }
//       fetchList();
//     } catch (err) {
//       console.error("delete error", err);
//       showToast("Failed to delete", "error");
//     }
//   };

  // view details
  const handleView = async (id?: string) => {
    if (!id) return;
    setViewingId(id);
    setViewingData(null);
    setViewLoading(true);
    try {
      const res = await api.get(`${basePath}/drug-chart/${id}`);
      // support both res.data and res.data.data
      const payload = res.data;
      const item = payload?.data ?? payload;
      setViewingData(item);
    } catch (err) {
      console.error("get by id error", err);
      showToast("Failed to load details", "error");
      setViewingId(null);
    } finally {
      setViewLoading(false);
    }
  };

  // back from view
  const handleBackFromView = () => {
    setViewingId(null);
    setViewingData(null);
  };

  // table columns
  const columns: Column<any>[] = [
    {
      key: "drug",
      label: "Drug",
      render: (r) => <span>{r?.drug || "N/A"}</span>,
    },
    {
      key: "dose",
      label: "Dose",
      render: (r) => <span>{r?.dose || "N/A"}</span>,
    },
    {
      key: "route",
      label: "Route",
      render: (r) => <span>{r?.route || "N/A"}</span>,
    },
    {
      key: "duration",
      label: "Duration",
      render: (r) => <span>{r?.duration || "N/A"}</span>,
    },
    {
      key: "time",
      label: "Time",
      render: (r) =>
        r?.time ? (
          <span>{new Date(r.time).toLocaleString()}</span>
        ) : (
          <span>N/A</span>
        ),
    },
    {
      key: "remark",
      label: "Remark",
      render: (r) => <span className="line-clamp-1">{r?.remark || "—"}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Dropdown triggerIcon={<HiOutlineDotsVertical />} triggerLabel="" showArrow={false}>
          <ul className="space-y-2 text-sm">
            <li
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
              onClick={() => handleView(r?.id)}
            >
              <BsEye /> View
            </li>

            {isAdmin && (
              <>
                <li
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
                  onClick={() => openEdit(r)}
                >
                  <FiEdit2 /> Edit
                </li>
                {/* <li
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
                  onClick={() => confirmDelete(r?.id)}
                >
                  <FiTrash2 /> Delete
                </li> */}
              </>
            )}
          </ul>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-4 p-4 bg-white">
      {/* Header / title & add button (admin only) */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Drug Chart</h1>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="bg-primary text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
          >
            <FiPlus /> Add Drug
          </button>
        )}
      </div>

      {/* HeaderTab for date filters */}
      <HeaderTab
        title=""
        showSearch={false}
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        onDateFromChange={(val) => setFilters((s) => ({ ...s, dateFrom: val, page: 1 }))}
        onDateToChange={(val) => setFilters((s) => ({ ...s, dateTo: val, page: 1 }))}
      />

      {/* If viewing a single item, show details (hide table) */}
      {viewingId ? (
        <div className=" ">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackFromView}
              className="text-sm px-3 py-2 border rounded text-gray-700"
            >
              Back
            </button>
            <h2 className="text-lg font-semibold">Drug Entry Details</h2>
            <div />
          </div>

          {viewLoading ? (
            <p>Loading...</p>
          ) : viewingData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Drug</p>
                <p className="font-medium">{viewingData.drug}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dose</p>
                <p className="font-medium">{viewingData.dose}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Route</p>
                <p className="font-medium">{viewingData.route}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-medium">{viewingData.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-medium">
                  {viewingData.time ? new Date(viewingData.time).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Remark</p>
                <p className="font-medium">{viewingData.remark || "—"}</p>
              </div>

              {isAdmin && (
                <div className="md:col-span-2 flex gap-3 mt-4">
                  <button
                    onClick={() => openEdit(viewingData)}
                    className="px-3 py-2 border rounded text-sm text-white bg-primary"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => {
                      confirmDelete(viewingData.id);
                    }}
                    className="px-3 py-2 border rounded text-sm text-red-600"
                  >
                    Delete
                  </button> */}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center py-8">No details found.</p>
          )}
        </div>
      ) : (
        // Table list mode
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
              setPage={(page) => setFilters((s) => ({ ...s, page }))}
            />
          )}
        </div>
      )}

      {/* Confirm Delete */}
      {/* <ConfirmModal
        open={confirmOpen}
        description="Are you sure you want to delete this record?"
        onConfirm={handleDelete}
        onClose={() => {
          setConfirmOpen(false);
          setSelectedDeleteId(null);
        }}
        loading={false}
      /> */}

      {/* Add / Edit Modal (uses shared Modal component) */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
          setForm(emptyForm);
        }}
        title={editItem ? "Edit Drug Entry" : "Add Drug Entry"}
        handleSubmit={handleSave}
        buttonText={saving ? "Processing..." : editItem ? "Update" : "Save"}
        loading={saving}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Drug</label>
            <input
              value={form.drug}
              onChange={(e) => setForm((f) => ({ ...f, drug: e.target.value }))}
              className="form-input w-full p-2 border rounded"
              placeholder="Paracetamol"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Time</label>
            <input
              type="datetime-local"
              value={
                form.time
                  ? new Date(form.time).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) => {
                // store as ISO
                const val = e.target.value;
                const iso = val ? new Date(val).toISOString() : "";
                setForm((f) => ({ ...f, time: iso }));
              }}
              className="form-input w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Dose</label>
            <input
              value={form.dose}
              onChange={(e) => setForm((f) => ({ ...f, dose: e.target.value }))}
              className="form-input w-full p-2 border rounded"
              placeholder="500mg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600">Route</label>
              <input
                value={form.route}
                onChange={(e) => setForm((f) => ({ ...f, route: e.target.value }))}
                className="form-input w-full p-2 border rounded"
                placeholder="PO"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Duration</label>
              <input
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                className="form-input w-full p-2 border rounded"
                placeholder="7 days"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Remark</label>
            <textarea
              value={form.remark}
              onChange={(e) => setForm((f) => ({ ...f, remark: e.target.value }))}
              className="form-input w-full p-2 border rounded"
              rows={3}
              placeholder="Take after meals"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DrugChart