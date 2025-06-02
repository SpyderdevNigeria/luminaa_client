import { useEffect, useState } from "react";
import MedicalReportModal from "../../../components/modal/MedicalReportModal";
import StatusBadge from "../../../components/common/StatusBadge";
import useDiagnoses from "../../../hooks/useDiagnoses";
import PaginationComponent from "../../../components/common/PaginationComponent";
import PatientApi from "../../../api/PatientApi";
import moment from "moment";
import HeaderControlsDiagnosis from "../../../components/common/HeaderControlsDiagnosis";

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
      <HeaderControlsDiagnosis
        // search={search}
        // onSearchChange={(e) => setSearch(e.target.value)}
        severity={severity}
        onSeverityChange={(e) => setSeverity(e.target.value)}
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
              <div className="space-y-1  md:w-[300px] line-clamp-1">
                <h3 className="text-sm md:text-base">
                  {diagnosis.primaryDiagnosis}
                </h3>
                <h4 className="text-xs font-[300]">
                  {moment(diagnosis.createdAt).format("MMMM D, YYYY")}
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
