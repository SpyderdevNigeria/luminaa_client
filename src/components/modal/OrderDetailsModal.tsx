import StatusBadge from "../common/StatusBadge";
import Modal from "./modal";
type OrderDetailsModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};
function OrderDetailsModal({
  isModalOpen,
  setModalOpen,
}: OrderDetailsModalProps) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Order Details"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0 "
        buttonText="Purchase Refill"
      >
        <div>
          <main className="min-h-[200px]">
            <h4 className="text-sm  my-2">Drugs List </h4>
            {[1, 2, ].map((i) => (
          <div className=" flex flex-row items-center justify-between py-4 " key={i}>
            <div className="space-y-1">
                <h4 className="text-sm  font-[300]">Drug Name</h4>
                <h3 className="text-sm  ">Homatrophie - Eye Drop</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-sm  font-[300]">Category</h4>
                <h3 className="text-sm   ">Pain relief</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-sm font-[300]">Refill</h4>
                <h3 className="text-sm   ">Yes</h3>
            </div>
          </div>
        ))}

            <div className="my-8">
            <h4 className="text-sm  my-2">Payment details </h4>
            <div className="space-y-1">
                <h4 className="text-sm  font-[300]">Payment Type</h4>
                <h3 className="text-sm   ">Card - 1424 **** **** **** - Mastercard</h3>
                <h4 className="text-sm  font-[300]">Payment Status</h4>
               <StatusBadge status="success"/>
            </div>
            </div>
          </main>
        </div>
      </Modal>
    </div>
  );
}

export default OrderDetailsModal;
