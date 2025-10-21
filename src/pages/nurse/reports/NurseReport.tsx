import { useState, useEffect } from "react";
import {  FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useReports } from "../../../hooks/useReports";
import { useToaster } from "../../../components/common/ToasterContext";
import NurseApi from "../../../api/nurseApi";
import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import NurseReportModal from "../../../components/modal/NurseReportModal";
import HeaderTab from "../../../components/common/HeaderTab";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { removeHTMLTags, reportTypeOptions } from "../../../utils/dashboardUtils";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";


function NurseReports() {


  const { showToast } = useToaster();
  const {user } = useSelector( (state: any) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [editReport, setEditReport] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
    const {
    data: reports,
    loading,
    total,
    filters,
    updateFilters,
    fetchReports,
  } = useReports(NurseApi);
  // Fetch on filter change
  useEffect(() => {
    // if (user?.id) {
      fetchReports(null);
    // }
  }, [filters.page, filters.limit, filters.search, filters.reportType, filters.month]);

  // const handleEdit = (report: any) => {
  //   setEditReport(report);
  //   setShowForm(true);
  // };

  const handleDelete = (reportId: string) => {
    setSelectedReportId(reportId);
    setConfirmMessage("Are you sure you want to delete this report?");
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedReportId) return;
    setConfirmLoading(true);
    try {
      await NurseApi.deleteReport(selectedReportId);
      showToast("Report deleted successfully", "success");
       fetchReports(user?.id);
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete report", "error");
    } finally {
      setConfirmOpen(false);
      setConfirmLoading(false);
      setSelectedReportId(null);
    }
  };

  const columns: Column<any>[] = [
    {
      key: "nurse",
      label: "Nurse",
      render: (report) => <span>     {report?.nurse?.user?.firstName
              ? `${report?.nurse?.user?.firstName} ${report?.nurse?.user?.lastName}`
              : "N/A"}</span>,
    },
    {
      key: "reportType",
      label: "Report Type",
      render: (report) => <span>{report?.reportType || "N/A"}</span>,
    },
    {
      key: "content",
      label: "Content",
      render: (report) => (
        <span className="line-clamp-1" title={report?.content}>
          {removeHTMLTags(report?.content) || "N/A"}
        </span>
      ),
    },
    {
      key: "month",
      label: "Month",
      render: (report) => <span>{report?.month || "N/A"}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (report) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li>
            <Link
          to={`${user?.isMatron ? routeLinks.matron.reports : routeLinks.nurse.reports}/${report?.id}`}
         className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
        >
            <BsEye/> View
        </Link>
            </li>
            <li>
                  <Link
              to={`${user?.isMatron ? routeLinks.matron.reports : routeLinks.nurse.reports}/edit/${report?.id}`}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit2 /> Edit
            </Link>
            </li>
            <li
              onClick={() => handleDelete(report?.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];



  return (
    <div className="space-y-4 p-4 bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Nurse Reports</h1>
        <Link
          to={`${user?.isMatron ? routeLinks.matron.reports : routeLinks.nurse.reports}/create`}
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
        >
          <FiPlus /> Add Report
        </Link>
      </div>

       <HeaderTab
        title="Nurse Reports"
        showSearch={false}
        dropdowns={[
          {
            label: "Report Type",
            options: reportTypeOptions,
            value: filters.reportType || "",
            onChange: (value) =>
              updateFilters({ reportType: value || null }),
          },
        ]}
        searches={[
          {
            label: "",
            placeholder: "Search report...",
            value: filters.nurseId || "",
            onChange: (value) => updateFilters({ search: value || null }),
          },
          {
            label: "",
            placeholder: "YYYY-MM",
            value: filters.month || "",
            onChange: (value) => updateFilters({ month: value || null }),
          },
        ]}
        dateFrom={filters.startDate || ""}
        onDateFromChange={(value) =>
         updateFilters({ startDate: value || null })
        }
        dateTo={filters.endDate || ""}
        onDateToChange={(value) =>
          updateFilters({ endDate: value || null })
        }
      />

      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedReportId(null);
        }}
        loading={confirmLoading}
      />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={reports}
            columns={columns}
            page={filters.page}
            total={total}
            limit={filters.limit}
            setPage={(page) => updateFilters({ page })}
          />
        )}
      </div>

              <NurseReportModal
        open={showForm}
        report={editReport}
        onClose={() => {
            setShowForm(false);
            setEditReport(null);
            fetchReports(user?.id);
        }}
        onBack={() => {
          setEditReport(null);
            setShowForm(false);
        }}
        />
    </div>
  );
}

export default NurseReports;


