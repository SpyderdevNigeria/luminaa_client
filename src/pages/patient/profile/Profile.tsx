import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Modal from "../../../components/modal/modal";
import PersonalForm from "./components/PersonalForm";
import ResidentialForm from "./components/ResidentialForm";

const tabs = ["My Profile", "Notification", "Security"];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleEditClick = (title: string) => {
    setModalTitle(title);
    console.log(title)
    switch (title) {
        case "Personal Information":
            setModalContent(<PersonalForm />);
            break;
        case "Residential Details":
            setModalContent(<ResidentialForm />);
            break;
        case "Pre Morbid Conditions":
            setModalContent(
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Pre Morbid Conditions</label>
                <input
                  type="text"
                  placeholder="Enter Pre Morbid Conditions"
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
            );
            break;
        case "Profile Header":
            setModalContent(
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Profile Header</label>
                <input
                  type="text"
                  placeholder="Update Profile Header"
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
            );
            break;
    
        default:
            break;
    }

    setModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-base md:text-lg font-[400] mb-2">
        <span className={`${activeTab !== "My Profile" && 'text-gray-400' }`}>Profile</span>  {activeTab !== "My Profile" && (`/ ${activeTab}`)}</h2>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 ">
        {/* Sidebar / Tab Selector */}
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
          {activeTab === "My Profile" && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-base">Shawna Dele</h3>
                    <p className="text-sm text-gray-400">
                      12 Jalingo Road Str Abuja
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
                    ["First Name", "Shawna Dele"],
                    ["Last Name", "Awolowo"],
                    ["Email", "shawna@example.com"],
                    ["Phone Number", "08012345678"],
                    ["Marital Status", "Single"],
                    ["Blood Group", "O-"],
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
                    ["Address", "12 Jalingo Road"],
                    ["LGA", "Wuse"],
                    ["State of Origin", "FCT"],
                    ["Education", "B.Sc"],
                    ["Country", "Nigeria"],
                    ["Postal Code", "900101"],
                  ]}
                />
              </Section>

              {/* Pre Morbid Conditions */}
              <Section
                title="Pre Morbid Conditions"
                onEdit={() => handleEditClick("Pre Morbid Conditions")}
              >
                <p className="text-sm text-gray-600">N/A</p>
              </Section>
            </div>
          )}

          {activeTab === "Notification" && (
            <div className="bg-white rounded-lg p-6 text-gray-600 text-sm">
              Notification Sound
            </div>
          )}

          {activeTab === "Security" && (
            <div className="bg-white rounded-lg p-6 text-gray-600 text-sm">
              Security
            </div>
          )}
        </div>
      </div>

      {/* Modal for editing */}
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        hideCancel={true}
        style="!max-w-2xl !mx-4 !md:mx-0"
        buttonText=""
      >
        {modalContent}
      </Modal>
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
