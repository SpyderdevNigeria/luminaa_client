import Modal from "./modal";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";

type PrescriptionReportModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};

function PrescriptionReportModal({
  isModalOpen,
  setModalOpen,
  data,
}: PrescriptionReportModalProps) {
  const prescription = data;

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Prescription Report Details"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0"

      >
        <main className="min-h-[200px] flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Prescription Name</h4>
            <h3 className="text-sm text-text-primary">
              {prescription?.medicationName}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
             Dosage
            </h4>
            <h3 className="text-sm text-text-primary">
              {prescription?.dosage}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Date Issued</h4>
            <h3 className="text-sm text-text-primary">
              {moment(prescription?.createdAt).format("MMMM D, YYYY")}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Frequency</h4>
            <h3 className="text-sm text-text-primary">
              {prescription?.frequency}
            </h3>
          </div>

            <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Rifillable</h4>
            <h3 className="text-sm text-text-primary">
              {prescription?.isRefillable ? 'YES' : 'NO'}
            </h3>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Status</h4>
            <StatusBadge status={prescription?.status} />
          </div>


          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Additional Recommendations
            </h4>
            <h3 className="text-sm text-text-primary">
              {prescription?.additionalRecommendations || "None"}
            </h3>
          </div>

            <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Instructions</h4>
            <h3 className="text-sm text-text-primary capitalize">
              {prescription?.instructions}
            </h3>
          </div>

        </main>
      </Modal>
    </>
  );
}

export default PrescriptionReportModal;
