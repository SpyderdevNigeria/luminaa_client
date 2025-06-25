import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientApi from "../../../api/PatientApi";
import LabOrderDetials from "../../../components/common/LabOrderDetails";

function LabDetials() {
  const { id } = useParams();
  const [labOrder, setLabOrder] = useState<any>(null);
  const [isLoadingOrder, setLoadingOrder] = useState(true);
  const [orderError, setOrderError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      const orderData = await PatientApi.getLabOrderById(id);
      setLabOrder(orderData);
    } catch (err) {
      console.error(err);
      setOrderError("Failed to load lab order details.");
    } finally {
      setLoadingOrder(false);
    }
  };



  useEffect(() => {
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
        type="patient"
        results={labOrder?.data?.result || []}
        isLoadingResults={false}
        resultError={null}
      />
    </div>
  );
}

export default LabDetials;
