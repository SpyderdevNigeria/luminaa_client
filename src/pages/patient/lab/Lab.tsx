import { useEffect, useState } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import LabCard from "../../../components/common/LabOrderCard";
import PaginationComponent from "../../../components/common/PaginationComponent";
import CommonFormField from "../../../components/common/CommonFormField";
import { LabCardSkeleton } from "../../../components/skeleton/SkeletonCards";
import useOrder from "../../../hooks/useOrder";
import PatientApi from "../../../api/PatientApi";
import { labRequestStatus } from "../../../utils/dashboardUtils";
import { IoArrowBack } from "react-icons/io5"; // <-- Add this icon
import { useToaster } from "../../../components/common/ToasterContext";

function Lab() {
  const {
    orders,
    ordersPage,
    ordersLimit,
    ordersTotal,
    ordersLoading,
    status,
    setOrdersFilters,
    getOrders,
  } = useOrder(PatientApi);

  const totalPages = Math.ceil((ordersTotal ?? 0) / ordersLimit);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    testName: "",
    notes: "",
    priority: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const {showToast} = useToaster();
  useEffect(() => {
    getOrders();
  }, [ordersPage, status]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await PatientApi.createLabOrder(formData);
      setFormData({ testName: "", notes: "", priority: "" });
      setShowForm(false);
      showToast('lab test sent successfully', 'success')
      getOrders(); // Refresh list
    } catch (error) {
      console.error("Failed to create lab order:", error);
      showToast('failed to send lab test', 'error')
    } finally {
      setSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <div className="flex flex-col gap-4 container-bd">
      {showForm ? (
        <>
          <div className="flex items-center gap-2 text-primary cursor-pointer font-medium text-sm" onClick={() => setShowForm(false)}>
            <IoArrowBack className="text-lg" />
            Back to Lab Requests
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-2xl my-16 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <CommonFormField
              type="text"
              name="testName"
              label="Test Name"
              value={formData.testName}
              onChange={handleFormChange}
              required
            />
            <CommonFormField
              type="select"
              name="priority"
              label="Priority"
              value={formData.priority}
              options={priorityOptions}
              onChange={handleFormChange}
              required
            />
            <div className="md:col-span-2">
              <CommonFormField
                type="textarea"
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={handleFormChange}
              />
            </div>
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md text-sm"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {/* Header + Button */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Lab Request</h1>
            <button
              className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
              onClick={() => setShowForm(true)}
            >
              Request Test
            </button>
          </div>

          {/* Status Filter */}
          <HeaderTab
            title=""
            showSearch={false}
            dropdowns={[
              {
                label: "Status",
                options: ["All", ...labRequestStatus],
                value: status || "",
                onChange: (value) =>
                  setOrdersFilters({
                    status: value === "All" ? null : value.toLowerCase(),
                  }),
              },
            ]}
          />

          {/* Lab Orders */}
          <section className="min-h-[300px]">
            {ordersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
                {[...Array(4)].map((_, idx) => (
                  <LabCardSkeleton key={idx} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <LabCard key={order.id} order={order} type="patient" />
                  ))
                ) : (
                  <p className="col-span-full text-center">
                    No lab test requests found.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Pagination */}
          <div className="mt-4">
            <PaginationComponent
              page={ordersPage}
              total={ordersTotal ?? 0}
              limit={ordersLimit}
              totalPages={totalPages ?? 1}
              onPageChange={(page) => setOrdersFilters({ page })}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Lab;
