import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LabApi from "../../../api/labApi";
import LabInputTestResultModal from "../../../components/modal/LabInputTestResultModal";
import LabOrderDetials from "../../../components/common/LabOrderDetials";
import ResultCard from "../../../components/common/ResultCard";

function LabTestRequestsDetails() {
  const { id } = useParams<{ id: string }>();
  const [labOrder, setLabOrder] = useState<any>(null);
  const [labResults, setLabResults] = useState<any[]>([]);
  const [labResultMeta, setLabResultMeta] = useState<any>(null);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isLoadingOrder, setLoadingOrder] = useState(true);
  const [isLoadingResults, setLoadingResults] = useState(true);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [resultError, setResultError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);


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
      try {
        const response = await LabApi.getLabOrderResultByOrderId(id);
        setLabResults(response?.data?.results || []);
        setLabResultMeta(response?.data || null);
      } catch (err) {
        console.error(err);
        setResultError("Failed to load lab test results.");
      } finally {
        setLoadingResults(false);
      }
    };


  useEffect(() => {


    if (id) {
      fetchOrder();
      fetchResults();
    }
  }, [id]);

  const handleResult = async (payload: any) => {
    try {
      if (selectedResult) {
        await LabApi.updateLabOrderResultById(labResultMeta?.id, payload);
        alert("Result updated successfully.");
      } else {
        await LabApi.createLabOrderResult(id, payload);
        alert("Result submitted successfully.");
      }
      fetchOrder();
      const response = await LabApi.getLabOrderResultByOrderId(id);
      setLabResults(response?.data?.results || []);
      setLabResultMeta(response?.data || null);
    } catch (err) {
      console.error("Error submitting result:", err);
      alert("Failed to submit result.");
    } finally {
      setModalOpen(false);
      setSelectedResult(null);
    }
  };

  const handleStatus = async () => {
    try {
      const data = await LabApi.updateLabOrderStatus(id);
      if (data) {
        alert("Status updated successfully.");
      }
      fetchOrder();
    } catch (err) {
      console.error(err);
      setOrderError("Failed to update lab order status.");
    }
  };

  const handleOpenModal = (result?: any) => {
    setSelectedResult(result || null);
    setModalOpen(true);
  };

  return (
    <div>
      <LabOrderDetials
        data={labOrder}
        isLoading={isLoadingOrder}
        error={orderError}
        setModalOpen={handleOpenModal}
        type="lab"
        handleStatus={handleStatus}
      />

      <LabInputTestResultModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        labTestOrderId={id || ""}
        initialData={
          selectedResult
            ? {
                testName: selectedResult?.testName || "",
                result: selectedResult?.result || "",
                unit: selectedResult?.unit || "",
                referenceRange: selectedResult?.referenceRange || "",
                notes: selectedResult?.notes || "",
              }
            : undefined
        }
        onSubmit={handleResult}
      />

      <div className="mt-6 container-bd">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Test Results</h2>

        {isLoadingResults ? (
          <p>Loading results...</p>
        ) : resultError ? (
          <p className="text-red-600">{resultError}</p>
        ) : labResults?.length > 0 ? (
          <div className="space-y-4">
            {labResults.map((result, index) => (
              <ResultCard
                key={index}
                result={result}
                onEdit={() => handleOpenModal(result)}
              />
            ))}
          </div>
        ) : (
          <p>No test results found.</p>
        )}
      </div>
    </div>
  );
}

export default LabTestRequestsDetails;
