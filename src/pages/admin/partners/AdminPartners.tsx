import { useState, useEffect } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { usePartners } from "../../../hooks/usePartners";
import AdminApi from "../../../api/adminApi";
import { useToaster } from "../../../components/common/ToasterContext";
import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import AdminPartnersCreate from "./component/AdminPartnersCreate";
import AdminNavigate from "../../../components/common/AdminNavigate";
import { partnerTypes } from "../../../utils/dashboardUtils";


function AdminPartners() {
  const {
    data: partners,
    loading,
    error,
    total,
    filters,
    fetchPartners,
    updateFilters,
  } = usePartners(AdminApi);

  const [showForm, setShowForm] = useState(false);
  const [editPartner, setEditPartner] = useState<any>(null);
  const { showToast } = useToaster();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, [filters.page, filters.search, filters.partnerType, filters.name]);

  const handleEdit = (partner: any) => {
    setEditPartner(partner);
    setShowForm(true);
  };

  const confirmDelete = (id: string) => {
    setSelectedPartnerId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedPartnerId) return;
    setConfirmLoading(true);
    try {
      await AdminApi.deletePartner(selectedPartnerId);
      fetchPartners();
      showToast("Partner deleted successfully", "success");
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete partner", "error");
    } finally {
      setConfirmOpen(false);
      setConfirmLoading(false);
      setSelectedPartnerId(null);
    }
  };

  const columns: Column<any>[] = [
    { key: "name", label: "Name", render: (p) => <>{p?.name}</> },
    { key: "partnerType", label: "Type", render: (p) => <>{p?.partnerType}</> },
    {
      key: "description",
      label: "Description",
      render: (p) => <>{p?.description || "—"}</>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (partner) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <AdminNavigate role={"partner"} id={partner?.id} type="true">
              <FiEye /> View
            </AdminNavigate>
            <li
              onClick={() => handleEdit(partner)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(partner.id)}
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
      <AdminPartnersCreate
        partner={editPartner}
        onClose={() => {
          setShowForm(false);
          setEditPartner(null);
          fetchPartners();
        }}
        onBack={() => {
          setShowForm(false);
          setEditPartner(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4 bg-white p-4 ">

    <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Partners</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          Add Partner
        </button>
      </div>
      <HeaderTab
        title="Partners"
        showSearch
        searches={[
                      {
            label: "",
            placeholder: "Search name...",
            value: filters.name,
            onChange: (val) => updateFilters({ name: val, page: 1 }),
          },
          {
            label: "",
            placeholder: "Search description...",
            value: filters.search,
            onChange: (val) => updateFilters({ search: val, page: 1 }),
          },
        ]}
        dropdowns={[
                      {
                        label: "Department",
                        options: partnerTypes,
                        value: filters.partnerType || "",
                        onChange: (val) => updateFilters({ partnerType: val || "", page: 1 }),
                      },
        ]}
      />

      {/* 🗑 Confirm Delete */}
      <ConfirmModal
        open={confirmOpen}
        description="Are you sure you want to delete this partner?"
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedPartnerId(null);
        }}
        loading={confirmLoading}
      />

      {/*  Table */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading partners</p>
        ) : (
          <Table
            data={partners}
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

export default AdminPartners;
