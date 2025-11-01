import {  useEffect } from "react";
import { FiEye,} from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useServices } from "../../../hooks/useServices";
import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import routeLinks from "../../../utils/routes";
import { Link } from "react-router-dom";

export default function PatientServices() {
const {
  data: services,
  loading,
  error,
  total,
  filters,
  fetchServicesListPatient,
  updateFilters,
} = useServices();

  console.log(services);
  useEffect(() => {
    fetchServicesListPatient();
  }, [filters.page, filters.search, filters.category, filters.name, filters.includeDeleted]);

  const columns: Column<any>[] = [
    { key: "name", label: "Name", render: (s) => s.name },
    { key: "category", label: "Category", render: (s) => s.category },
    // { key: "price", label: "Price", render: (s) => `₦${s.price}` },
    { key: "description", label: "Description", render: (s) => s.description || "—" },


    {
      key: "actions",
      label: "Actions",
      render: (service) => (
        <Dropdown
        showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
                        <Link to={routeLinks.patient.services + '/' + service?.id} className="flex flex-row gap-2 items-center ">
                          <FiEye /> View
                        </Link>

          </ul>
        </Dropdown>
      ),
    },
  ];


  return (
    <div className="space-y-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Services</h1>

      </div>

      <HeaderTab
        title="Services All"
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
            placeholder: "Search category...",
            value: filters.category,
            onChange: (val) => updateFilters({ category: val, page: 1 }),
          },
        ]}

      />



      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table
            data={services}
            columns={columns}
            page={filters.page}
            total={total}
            limit={filters.limit}
            setPage={(p) => updateFilters({ page: p })}
          />
        )}
      </div>
    </div>
  );
}
