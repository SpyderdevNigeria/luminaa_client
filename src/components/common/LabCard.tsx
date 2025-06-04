import { PiTestTubeBold } from "react-icons/pi";
import routeLinks from "../../utils/routes";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";
function LabCard() {
    const navigate = useNavigate()
  return (
    <main className="border border-dashboard-gray p-2 lg:p-4 rounded-lg ">
      <div className="flex flex-row items-start gap-8 w-full">
        <div>
          <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary/20 rounded-full">
            <PiTestTubeBold className="text-primary" />
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <h5>Adeniji A.</h5>
              <h5>Blood & water</h5>
            </div>
            <div className="space-y-2">
              <h5>11:09AM</h5>
              <h5>Sept 24</h5>
            </div>
          </div>
          <button
          onClick={()=>{navigate(routeLinks?.lab?.labRequests + '/' + "2222")}}
            className="w-full bg-primary rounded p-1 text-white hover:bg-primary/50"
          >
            {" "}
            Start test
          </button>
          <StatusBadge status="urgent" />
        </div>
      </div>
    </main>
  );
}

export default LabCard;
