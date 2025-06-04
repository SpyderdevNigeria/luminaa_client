import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import { IoCalendarClearOutline } from "react-icons/io5";
import LabCard from '../../../components/common/LabCard';
import { FiPlus } from "react-icons/fi";
function LabTestRequests() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between my-2">
        <Dropdown
          triggerLabel="Date range : This Week"
          showArrow
          triggerIcon={<IoCalendarClearOutline />}
        >
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              Day
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              Week
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              Month
            </li>
          </ul>
        </Dropdown>
        <div className="flex flex-row items-center gap-3">
          <button className="bg-primary text-white px-6 py-2  text-sm rounded-md flex items-center gap-2">
            <FiPlus />
            New Test
          </button>
        </div>
      </div>
      <div className=" border border-dashboard-gray p-2 lg:p-4 rounded-lg">
        <HeaderTab
          title="Sample Collection"
          showSearch={true}
          showSort={true}
        />
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14].map((i) => (
              <LabCard key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default LabTestRequests;
