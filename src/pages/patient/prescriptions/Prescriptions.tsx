import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { useState } from "react";
import PrescriptionDetailsModal from "../../../components/modal/PrescriptionDetailsModal";
function Prescriptions() {
      const [data, setData] = useState<any>(null);
      const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-row items-center justify-between my-4">
        <div className="flex  flex-row items-center  gap-4">
          <div className="text-xs p-1 flex items-center gap-2 border bg-white">
            {" "}
            Week <IoIosArrowDown />{" "}
          </div>
          <div className="text-xs p-1 flex items-center gap-2 border bg-white">
            {" "}
            Today{" "}
          </div>
          <MdOutlineArrowBackIos className="text-xs" />
          <MdOutlineArrowForwardIos className="text-xs" />
        </div>

        <div className="flex flex-row items-center gap-3">
          <div className="relative ">
            <IoSearch className="absolute left-2 top-3 text-base" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-sm py-2 px-8 border border-[#727272] rounded-sm md:w-sm"
            />
          </div>
          <div className=" text-sm bg-white py-2 px-3 flex flex-row items-center gap-2  border border-[#727272] rounded-sm ">
            <IoFilterOutline className="text-base " />
            <h4>Sort By</h4>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className="bg-white rounded-lg flex flex-row items-center justify-between py-4 md:px-8" key={i}>
            <div className="space-y-1">
                <h3 className="text-sm md:text-base ">Treatment For hepatitis</h3>
                <h4 className="text-xs font-[300]">Last Prescribed 04 App 2025</h4>
            </div>
            <div className="flex items-center space-x-2">
            <h3 className="text-sm md:text-base ">3</h3>
                <h4 className="text-xs font-[300]">Active Medications</h4>
            </div>
            <div className="flex items-center space-x-2">
            <h3 className="text-sm md:text-base ">0</h3>
                <h4 className="text-xs font-[300]">Refill Request </h4>
            </div>

            <button className="bg-gray-100 p-1 md:px-4 md:py-3 rounded-lg text-xs font-light text-primary"
              onClick={() => {setData({}); setModalOpen(true)}}
              >
                View details
              </button>
          </div>
        ))}
        <PrescriptionDetailsModal data={data} isModalOpen={isModalOpen} setModalOpen={(e)=>{setModalOpen(e)}} />
      </div>
    </div>
  );
}

export default Prescriptions;
