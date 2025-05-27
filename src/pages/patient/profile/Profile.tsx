import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import PersonalForm from "./components/PersonalForm";
import ResidentialForm from "./components/ResidentialForm";
import Security from "./components/Security";
import BookingConditionForm from "./components/MorbidConditionForm";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateUser } from "../../../reducers/authSlice";
import ProfilePictureForm from "./components/ProfilePicForm";

const tabs = ["My Profile", "Notification", "Security"];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const dispatch = useAppDispatch()

  // type MedicalHistory = {
  //   Symptoms?: string;
  //   Genotype?: string;
  //   BloodGroup?: string;
  //   PastBloodTransfusion?: string;
  //   PastDelivery?: string;
  //   PastHospitalAdmission?: string;
  //   Hypertension?: string;
  //   Diabetes?: string;
  //   Asthma?: string;
  //   KidneyDisease?: string;
  //   LiverDisease?: string;
  //   Epilepsy?: string;
  //   SickleCellDisease?: string;
  //   PastMedicalHistory?: string;
  // };

  // type UserProfile = {
  //   user?: {
  //     firstName?: string;
  //     lastName?: string;
  //     email?: string;
  //     profilePicture?: string;
  //   };
  //   address?: string;
  //   city?: string;
  //   state?: string;
  //   phoneNumber?: string;
  //   dateOfBirth?: string;
  //   gender?: string;
  //   maritalStatus?: string;
  //   religion?: string;
  //   emergencyContactName?: string;
  //   emergencyContactPhone?: string;
  //   country?: string;
  //   zipCode?: string;
  //   medicalHistory?: MedicalHistory;
  // };

  const userProfile = useAppSelector((state) => state.auth.user);

  const user = userProfile?.user;

  const handleEditClick = (title: string) => {
    setModalTitle(title);
    switch (title) {
      case "Personal Information":
        setModalContent(<PersonalForm userProfile={userProfile} dispatch={dispatch} updateUser={updateUser} />);
        break;
      case "Residential Details":
        setModalContent(<ResidentialForm userProfile={userProfile} dispatch={dispatch} updateUser={updateUser}/>);
        break;
      case "Pre Morbid Conditions":
        setModalContent(
        <BookingConditionForm userProfile={userProfile} dispatch={dispatch} updateUser={updateUser} />
        );
        break;
      case "Profile Header":
        setModalContent(
        <ProfilePictureForm userProfile={userProfile} />
        );
        break;
      default:
        break;
    };
  };

  return (
    <div>
      <h2 className="text-base md:text-lg font-[400] mb-2">
        <span className={`${activeTab !== "My Profile" && "text-gray-400"}`}>
          Profile
        </span>{" "}
        {activeTab !== "My Profile" && `/ ${activeTab}`}
      </h2>

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full bg-white rounded-lg p-4 mb-4 md:mb-0 md:mr-6">
          <ul className="flex md:flex-col gap-4 justify-between md:justify-start text-sm md:text-base">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer font-light ${
                  activeTab === tab ? "text-black" : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4 w-full">
          {!modalContent && activeTab === "My Profile" && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={userProfile?.user?.profilePicture?.url || "ee"}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-base">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {userProfile?.address}, {userProfile?.city},{" "}
                      {userProfile?.state}
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-500 text-sm flex items-center gap-2 self-end md:self-auto"
                  onClick={() => handleEditClick("Profile Header")}
                >
                  Edit <FiEdit2 />
                </button>
              </div>

              {/* Personal Info */}
              <Section
                title="Personal Information"
                onEdit={() => handleEditClick("Personal Information")}
              >
                <GridInfo
                  data={[
                    ["First Name", user?.firstName || "—"],
                    ["Last Name", user?.lastName || "—"],
                    ["Email", user?.email || "—"],
                    ["Phone Number", userProfile?.phoneNumber || "—"],
                    ["Date of Birth", userProfile?.dateOfBirth || "—"],
                    ["Gender", userProfile?.gender || "—"],
                    ["Marital Status", userProfile?.maritalStatus || "—"],
                    ["Religion", userProfile?.religion || "—"],
                    [
                      "Emergency Contact Name",
                      userProfile?.emergencyContactName || "—",
                    ],
                    [
                      "Emergency Contact Phone",
                      userProfile?.emergencyContactPhone || "—",
                    ],
                  ]}
                />
              </Section>

              {/* Residential Info */}
              <Section
                title="Residential Details"
                onEdit={() => handleEditClick("Residential Details")}
              >
                <GridInfo
                  data={[
                    ["Address", userProfile?.address || "—"],
                    ["City", userProfile?.city || "—"],
                    ["State", userProfile?.state || "—"],
                    ["Country", userProfile?.country || "—"],
                    ["Postal Code", userProfile?.zipCode || "—"],
                  ]}
                />
              </Section>

              {/* Pre Morbid Conditions */}
              <Section
                title="Pre Morbid Conditions"
                onEdit={() => handleEditClick("Pre Morbid Conditions")}
              >
                {userProfile?.medicalHistory &&
                typeof userProfile.medicalHistory === "object" ? (
                  <GridInfo
                    data={[
                      ["Genotype", userProfile.medicalHistory.Genotype || "—"],
                      [
                        "Blood Group",
                        userProfile.medicalHistory.BloodGroup || "—",
                      ],
                      [
                        "Past Blood Transfusion",
                        userProfile.medicalHistory.PastBloodTransfusion || "—",
                      ],
                      [
                        "Past Delivery",
                        userProfile.medicalHistory.PastDelivery || "—",
                      ],
                      [
                        "Past Hospital Admission",
                        userProfile.medicalHistory.PastHospitalAdmission || "—",
                      ],
                      [
                        "Hypertension",
                        userProfile.medicalHistory.Hypertension || "—",
                      ],
                      ["Diabetes", userProfile.medicalHistory.Diabetes || "—"],
                      ["Asthma", userProfile.medicalHistory.Asthma || "—"],
                      [
                        "Kidney Disease",
                        userProfile.medicalHistory.KidneyDisease || "—",
                      ],
                      [
                        "Liver Disease",
                        userProfile.medicalHistory.LiverDisease || "—",
                      ],
                      ["Epilepsy", userProfile.medicalHistory.Epilepsy || "—"],
                      [
                        "Sickle Cell Disease",
                        userProfile.medicalHistory.SickleCellDisease || "—",
                      ],
                    ]}
                  />
                ) : (
                  <p className="text-sm text-gray-600">N/A</p>
                )}
              </Section>
            </div>
          )}

          {activeTab === "Notification" && (
            <div className="bg-white rounded-lg p-6 text-gray-600 text-sm">
              Notification Sound
            </div>
          )}
          {modalContent && 
          <div className="bg-white rounded-lg p-6 text-sm">
            <button className="text-base mb-3 flex items-center gap-2"
            onClick={()=>{setModalContent(null )}}
            > <FaArrowLeftLong /> Back </button>
            <div className="max-w-xl mx-auto">
              <h2 className="text-primary text-2xl my-4 ">{modalTitle}</h2>
              {modalContent}  
            </div>
            </div>
          }
          {activeTab === "Security" && <Security />}
        </div>
        
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}) => (
  <div className="bg-white rounded-lg p-4 md:p-6">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-medium text-base">{title}</h4>
      {onEdit && (
        <button
          className="text-gray-500 text-sm flex items-center gap-2"
          onClick={onEdit}
        >
          Edit <FiEdit2 />
        </button>
      )}
    </div>
    {children}
  </div>
);

const GridInfo = ({ data }: { data: [string, string][] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
    {data.map(([label, value], idx) => (
      <div key={idx}>
        <div className="text-gray-400 text-xs mb-1">{label}</div>
        <div>{value}</div>
      </div>
    ))}
  </div>
);

export default ProfilePage;
