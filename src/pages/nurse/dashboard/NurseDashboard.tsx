import { useEffect } from "react";
import NurseApi from "../../../api/nurseApi";
import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import CustomCalendar from "../../../components/common/CustomCalendar";
import moment from "moment";
import routeLinks from "../../../utils/routes";
import { Link } from "react-router-dom";
import { useReports } from "../../../hooks/useReports";
import { useSelector } from "react-redux";
import { removeHTMLTags } from "../../../utils/dashboardUtils";
function NurseDashboard() {
  const {
    data: reports,
    loading,
    total,
    filters,
    updateFilters,
    fetchReports,
    error: reportError,
  } = useReports(NurseApi);

  const {user } = useSelector( (state: any) => state.auth);

  // Fetch data
  useEffect(() => {
       if (user?.id) {
      fetchReports(user?.id);
    }
  }, [filters.page, filters.limit, filters.search, filters.reportType, filters.month]);

  // Columns for Nurse Reports
  const reportColumns: Column<any>[] = [
    {
      key: "id",
      label: "ID",
      render: (report) => (
        <h4 className="max-w-[50px] line-clamp-1">{report?.id}</h4>
      ),
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
      key: "createdAt",
      label: "Created",
      render: (report) => (
        <h4>{moment(report?.createdAt).format("YYYY-MM-DD HH:mm")}</h4>
      ),
    },
    {
      key: "Action",
      label: "View",
      render: (report) => (
        <Link
          to={`${user?.isMatron ? routeLinks.matron.reports : routeLinks.nurse.reports}/${report?.id}`}
          className="underline text-primary"
        >
          View
        </Link>
      ),
    },
  ];

  if (reportError)
    return (
      <p className="text-center mt-10 text-red-500">
        {reportError || "Failed to load reports"}
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* === DASHBOARD SUMMARY CARDS === */}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <DashboardCard title="Reports" count={reports?.length || 0} />
          <DashboardCard
            title="This Month"
            count={
              reports?.filter(
                (r : any) =>
                  moment(r?.createdAt).format("YYYY-MM") ===
                  moment().format("YYYY-MM")
              ).length || 0
            }
          />
          <DashboardCard
            title="Total Reports Submitted"
            count={total || reports?.length || 0}
            col="col-span-2"
          />
        </div>
      </section>

      {/* === RECENT REPORTS TABLE & CALENDAR === */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 border border-dashboard-gray p-2 lg:p-4 rounded-lg bg-white">
            <HeaderTab title="Recent Reports" showSearch={false} />

            {loading ? (
              <p>Loading...</p>
            ) : reports?.length > 0 ? (
              <Table
                data={reports.slice(0, 5)}
                columns={reportColumns}
                page={filters.page}
                total={total}
                limit={filters.limit}
                showPaginate={false}
                setPage={(page) => updateFilters({ page })}
              />
            ) : (
              <p className="text-center my-24">
                You don’t have any reports yet.
              </p>
            )}
          </div>

          <CustomCalendar />
        </div>
      </section>
    </div>
  );
}

export default NurseDashboard;
