import { useEffect, useState } from "react";
import MedicalReportModal from "../../../components/modal/MedicalReportModal";
import StatusBadge from "../../../components/common/StatusBadge";
import useDiagnoses from "../../../hooks/useDiagnoses";
import PaginationComponent from "../../../components/common/PaginationComponent";
import PatientApi from "../../../api/PatientApi";
import HeaderTab from "../../../components/common/HeaderTab";

function MedicalHistory() {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    diagnoses,
    getDiagnoses,
    loading,
    page,
    total,
    totalPages,
    limit,
    setSeverity,
    severity,
    setPage,
  } = useDiagnoses(PatientApi);

  // Filters

  useEffect(() => {
    getDiagnoses();
  }, [page, severity]);

  return (
    <div>
      <HeaderTab
        title="Medical History"
         showSearch={false}
        dropdowns={[
          {
            label: "Severity",
            options: ["All Severities", "Mild", "Moderate", "Severe"],
            value: severity,
            onChange: (value) =>
              setSeverity(
                value.toLowerCase() === "all severities"
                  ? ""
                  : value.toLowerCase()
              ),
          },
        ]}
      />

      <div className="space-y-4">
        {loading && <p>Loading...</p>}
        {!loading && diagnoses.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            No diagnoses found.
          </p>
        )}

        {!loading &&
          diagnoses.map((diagnosis: any) => (
            <div
              className="bg-white rounded-lg flex flex-row items-center justify-between py-4 md:px-8"
              key={diagnosis._id}
            >
              <div className="space-y-1 ">
                <h3 className="text-sm md:text-base  md:w-[300px] line-clamp-1">
                  {diagnosis.primaryDiagnosis}
                </h3>
                <h4 className="text-xs font-[300]">
                  on {new Date(diagnosis.createdAt).toLocaleDateString()}
                </h4>
              </div>

              <div className="flex items-center space-x-2  md:w-[300px] line-clamp-1">
                <h4 className="text-xs font-[300]">
                  {`${diagnosis?.primaryDiagnosis}`}
                </h4>
              </div>

              <div>
                <StatusBadge status={diagnosis.severity || "pending"} />
              </div>

              <button
                className="bg-gray-100 p-1 md:px-4 md:py-3 rounded-lg text-xs font-light text-primary"
                onClick={() => {
                  setSelectedDiagnosis(diagnosis);
                  setModalOpen(true);
                }}
              >
                View details
              </button>
            </div>
          ))}

        {/* Modal */}
        <MedicalReportModal
          data={selectedDiagnosis}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />

        {/* Pagination */}
        <div className="mt-6">
          <PaginationComponent
            page={page}
            total={total ?? 0}
            limit={limit}
            totalPages={totalPages ?? 1}
            onPageChange={(newPage: number) => {
              if (setPage) setPage(newPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MedicalHistory;
