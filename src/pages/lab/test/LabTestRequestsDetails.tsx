import { useState } from "react";
import UserImage from "../../../assets/images/patient/user.png"
import InfoLabel from "../../../components/common/InfoLabel";
import { IoChatbubbleOutline } from "react-icons/io5";
import LabInputTestResultModal from "../../../components/modal/LabInputTestResultModal";

function LabTestRequestsDetails() {
        const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {/* Patient Info */}
      <div className="w-full space-y-4 pb-8 border bg-gray-50 border-dashboard-gray max-h-[470px]  rounded-lg p-4 md:col-span-2">
        <h2 className="text-xl font-semibold">Patient Information</h2>
        <div className="">
          <img
            src={UserImage}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div>
            <p className="font-semibold text-xl">John Doe</p>
          </div>
          <hr className="border-t border-dashboard-gray"/>


          <InfoLabel
              label={"09012345678" }
              info="Phone Number"
            />
              <InfoLabel
              label={"Ajayiraymond@lumina.com" }
              info="Email"
            />
              <InfoLabel
              label={"12 Rumoko Road" }
              info="Address"
            />
        <a href="#" className="text-primary text-sm underline">
          view patient’s profile
        </a>
      </div>

      {/* Test Details */}
      <div className="w-full border border-dashboard-gray rounded-lg p-4 col-span-4 space-y-6 pb-8">
        <h2 className="text-xl font-semibold   text-primary underline">
          Test Details
        </h2>
            <InfoLabel
              label={"Cancer Scan" }
              info="Test Type"
            />
                 <InfoLabel
              label={"Urgent" }
              info="Status"
                style="bg-green-100 text-green-600 py-1 px-2 rounded-sm"
            />
           <InfoLabel
              label={"April 20th, 2025" }
              info="Date"
            />
            <div className="space-y-2">
        <p className="text-lg flex items-center gap-2"><IoChatbubbleOutline /> Doctor's Note</p>
        <p className="text-base ">
          To Whom It May Concern, <br />
          This certifies that Ajayi Raymond is under my care and should take
          necessary health precautions. Please provide any required
          accommodations.
        </p>
            </div>
        <div className="flex flex-col gap-3">
          <button className="w-full bg-primary hover:bg-primary/50 text-white text-sm px-4 py-3 rounded-md">
            Start Test
          </button>
          <button className="w-full bg-gray-300 text-gray-600 text-sm px-4 py-3 rounded-md" 
           onClick={() => {setModalOpen(true)}}
          >
            Input Test Results
          </button>
        </div>
      </div>
       <LabInputTestResultModal isModalOpen={isModalOpen} setModalOpen={(e)=>{setModalOpen(e)}} />
    </div>
  );
}

export default LabTestRequestsDetails