import Modal from "./modal";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";

type LabOrderDetailModalProps = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  data: any;
};

const LabOrderDetailModal = ({
  isModalOpen,
  setModalOpen,
  data,
}: LabOrderDetailModalProps) => {
  const order = data;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setModalOpen(false)}
      title="Lab Order Details"
      hideCancel={false}
      style="!md:max-w-2xl !md:mx-4 !md:mx-0"
    >
      <main className="min-h-[200px] flex flex-col gap-4 py-4">
        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Test Name</h4>
          <h3 className="text-sm text-text-primary">{order?.testName}</h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Priority</h4>
          <h3 className="text-sm text-text-primary capitalize">{order?.priority}</h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Notes</h4>
          <h3 className="text-sm text-text-primary">{order?.notes || "None"}</h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Collected Sample</h4>
          <h3 className="text-sm text-text-primary">
            {order?.collectedSample ? "YES" : "NO"}
          </h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Date Issued</h4>
          <h3 className="text-sm text-text-primary">
            {moment(order?.createdAt).format("MMMM D, YYYY")}
          </h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Status</h4>
          <StatusBadge status={order?.status} />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Patient</h4>
          <h3 className="text-sm text-text-primary">
            {order?.patient?.firstName} {order?.patient?.lastName} (
            {order?.patient?.email})
          </h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Doctor</h4>
          <h3 className="text-sm text-text-primary">
            {order?.doctor?.firstName} {order?.doctor?.lastName} (
            {order?.doctor?.specialty})
          </h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Appointment</h4>
          <h3 className="text-sm text-text-primary">
            {moment(order?.appointment?.date).format("MMMM D, YYYY")} –{" "}
            {order?.appointment?.status}
          </h3>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm text-text-secondary font-[300]">Status History</h4>
          <div className="flex flex-col gap-2">
            {order?.statusHistory?.length > 0 ? (
              order.statusHistory.map((entry: any, index: number) => (
                <div key={index} className="text-sm text-text-primary">
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    <StatusBadge status={entry.status} />
                  </div>
                  <div>
                    <span className="font-medium">Updated By:</span>{" "}
                    {entry.updatedBy}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {moment(entry.updatedAt).format("MMMM D, YYYY")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No history available</p>
            )}
          </div>
        </div>
      </main>
    </Modal>
  );
};

export default LabOrderDetailModal;
