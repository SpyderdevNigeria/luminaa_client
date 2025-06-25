import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import LabOrderDetials from "../../../components/common/LabOrderDetails";


function DoctorLabOrderDetails() {
  const { id } = useParams();
  const [labOrder, setLabOrder] = useState<any>(null);
  const [isLoadingOrder, setLoadingOrder] = useState(true);
  const [orderError, setOrderError] = useState<string | null>(null);

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
        type="doctor"
        results={labOrder?.data?.result || []}
        isLoadingResults={false}
        resultError={null}
      />
    </div>
  );
}

export default DoctorLabOrderDetails;
