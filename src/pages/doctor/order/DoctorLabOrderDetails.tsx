import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import LabOrderDetials from "../../../components/common/LabOrderDetials";

function DoctorLabOrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [labOrder, setLabOrder] = useState<any>(null);
  const [isLoadingOrder, setLoadingOrder] = useState(true);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await DoctorApi.getLabOrderById(id);
        setLabOrder(orderData);
      } catch (err) {
        console.error(err);
        setOrderError("Failed to load lab order details.");
      } finally {
        setLoadingOrder(false);
      }
    };

    if (id) {
      fetchOrder();

    }
  }, [id]);


  return (
    <div>
      <LabOrderDetials
        data={labOrder}
        isLoading={isLoadingOrder}
        error={orderError}
        type="doctor"
        setModalOpen={()=>{}}
      />
    </div>
  );
}

export default DoctorLabOrderDetails;
