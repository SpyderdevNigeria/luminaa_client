import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LabApi from "../../../api/labApi";
import LabOrderDetials from "../../../components/common/LabOrderDetials";
import { IResults } from "../../../types/Interfaces";
import { useToaster } from "../../../components/common/ToasterContext";

function LabTestRequestsDetails() {
  const { id } = useParams<{ id: string }>();
  const [labOrder, setLabOrder] = useState<any>(null);
  const [labResultMeta, setLabResultMeta] = useState<IResults | null>(null);
  const [isLoadingOrder, setLoadingOrder] = useState(true);
  const [isLoadingResults, setLoadingResults] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [resultError, setResultError] = useState<string | null>(null);
  const { showToast } = useToaster();
  const fetchOrder = async () => {
    try {
      const orderData = await LabApi.getLabOrderById(id);
      setLabOrder(orderData);
    } catch (err) {
      console.error(err);
      setOrderError("Failed to load lab order details.");
    } finally {
      setLoadingOrder(false);
    }
  };

  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await LabApi.getLabOrderResultByOrderId(id);
      setLabResultMeta(response?.data || null);
    } catch (err) {
      console.error(err);
      if (
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        (err as any).status !== 404
      ) {
        return setResultError("Failed to load lab test results.");
      }
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  useEffect(() => {
    if (labOrder) {
      if (labOrder?.data?.result) {
        fetchResults();
      }
    }
  }, [labOrder]);
  const handleResult = async (payload: any) => {
    setLoadingResults(true);
    console.log(labOrder)
    try {
      if (labOrder?.data?.result) {
         console.log('update result', labResultMeta?.id, payload)
        await LabApi.updateLabOrderResultById(labResultMeta?.id, {
          documents : payload?.documents,
          notes: payload?.notes,
          results: payload?.results,
        });
        showToast("Result updated successfully.", "success");
      } else {
        console.log('create result')
        await LabApi.createLabOrderResult(id, payload);
        showToast("Result submitted successfully.", 'success');
      }
      fetchResults();
    } catch (err) {
      console.error("Error submitting result:", err);
      showToast("Failed to submit result.", 'error');
    } finally {
      setLoadingResults(false);
    }
  };

  const handleStatus = async () => {
    try {
      const data = await LabApi.updateLabOrderStatus(id);
      if (data) {
        showToast("Status updated successfully.", "success");
      }
      fetchOrder();
    } catch (err) {
      console.error(err);
      setOrderError("Failed to update lab order status.");
    }
  };

  return (
    <div>
      <LabOrderDetials
        data={labOrder}
        isLoading={isLoadingOrder}
        error={orderError}
        handleSubmit={handleResult}
        type="lab"
        handleStatus={handleStatus}
        results={labResultMeta}
        isLoadingResults={isLoadingResults}
        resultError={resultError}
        updateDocuments={fetchResults}
      />
    </div>
  );
}

export default LabTestRequestsDetails;
