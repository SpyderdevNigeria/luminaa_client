import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProcedureDetails from "../../../components/common/procedure/ProcedureDetails";
import AdminApi from "../../../api/adminApi";
function NursesProcedureDetails() {
  const { id } = useParams();
  const [procedure, setProcedure] = useState<any>(null);
  const [isLoadingProcedure, setLoadingProcedure] = useState(true);
  const [procedureError, setProcedureError] = useState<string | null>(null);

  const fetchProcedure = async () => {
    try {
      if (!id) return;
      const data = await AdminApi.getProcedureById(id);
      setProcedure(data);
    } catch (err) {
      console.error(err);
      setProcedureError("Failed to load procedure details.");
    } finally {
      setLoadingProcedure(false);
    }
  };

  useEffect(() => {
    fetchProcedure();
  }, [id]);

  return (
    <div>
      <ProcedureDetails
        data={procedure}
        isLoading={isLoadingProcedure}
        error={procedureError}
        type="nurse"
        onUpdated={fetchProcedure}/>
    </div>
  );
}

export default NursesProcedureDetails;
