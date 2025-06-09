import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientApi from "../../../api/PatientApi";
import LabOrderDetials from "../../../components/common/LabOrderDetials";
import ResultCard from "../../../components/common/ResultCard";

function LabDetails() {
  const { id } = useParams<{ id: string }>();
  const [labOrder, setLabOrder] = useState<any>(null);
  const [labResults, setLabResults] = useState<any[]>([]);
  const [isLoadingOrder, setLoadingOrder] = useState(true);
  const [isLoadingResults, setLoadingResults] = useState(true);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [resultError, setResultError] = useState<string | null>(null);


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

    const fetchResults = async () => {
      try {
        const response = await PatientApi.getLabOrderResultByOrderId(id);
        setLabResults(response?.data?.results || []);
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




  return (
    <div>
      <LabOrderDetials
        data={labOrder}
        isLoading={isLoadingOrder}
        error={orderError}
        setModalOpen={()=>{}}
        type="lab"
        handleStatus={()=>{}}
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
                onEdit={() => {}}
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

export default LabDetails;
