import { useEffect, useState } from "react";
import MedicalReportModal from "../../../components/modal/MedicalReportModal";
import useDiagnoses from "../../../hooks/useDiagnoses";
import PaginationComponent from "../../../components/common/PaginationComponent";
import PatientApi from "../../../api/PatientApi";
import HeaderTab from "../../../components/common/HeaderTab";
import DiagnosisCard from "../../../components/common/DiagnosisCard";

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

  console.log(diagnoses)
  return (
    <div className="container-bd">
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

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-4">
            {diagnoses.map((diagnosis) => (
              <DiagnosisCard
                diagnosis={diagnosis}
                onView={() => {
                  setSelectedDiagnosis(diagnosis);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

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
