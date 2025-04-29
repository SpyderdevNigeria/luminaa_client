import  { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
const notifications = [
  { id: 1, message: "New appointment scheduled." },
  { id: 2, message: "Lab results ready to view." },
  { id: 3, message: "Reminder: Consultation tomorrow at 10AM." },
  { id: 1, message: "New appointment scheduled." },
  { id: 2, message: "Lab results ready to view." },
  { id: 3, message: "Reminder: Consultation tomorrow at 10AM." },
  { id: 1, message: "New appointment scheduled." },
  { id: 2, message: "Lab results ready to view." },
  { id: 3, message: "Reminder: Consultation tomorrow at 10AM." },
];

function Notification() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all')
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex flex-col items-center justify-center gap-2 w-8 h-8 rounded-full border border-primary cursor-pointer"
        onClick={toggleDropdown}
      >
        <FiBell className="text-lg text-primary" />
      </div>

      {open && (
        <div className="absolute right-0 mt-2  min-w-sm bg-white shadow-lg rounded-md z-10">
        <main className="py-2 px-6 border-b border-gray-100 shadow">
        <div className="flex flex-row items-center justify-between w-full py-4">
            <div className=" text-lg font-[500]  flex flex-row items-center gap-2">Notifications  <div className="py-[3px] px-2 text-xs rounded-full text-white bg-green-500 font-[300]">1</div></div>
            <div className="flex flex-row items-center gap-4">
               <button className="text-xs text-green-500"> mark all as read</button>
               <BsThreeDotsVertical/>
            </div>
         </div>

         <div className="flex gap-8 font-[400] text-sm md:text-xs">
        {["all",].map((tab) => (
          <div
            key={tab}
            onClick={() => {
              setActiveTab(tab as "all" | "upcoming" | "past");
            }}
            className={`cursor-pointer px-4 pb-2 capitalize ${
              activeTab === tab
                ? "text-green-500 border-b-2 border-green-500"
                : "text-inactive"
            }`}
          >
           {tab}
          </div>
        ))}
      </div>
        </main>

        
          {notifications.length > 0 ? (
            <div className="space-y-2 mt-2 mx-2 max-h-[75vh] overflow-y-auto">
              {notifications.map((note, e) => (
                <div className="p-3 border border-gray-100 shadow rounded-lg" key={e}>
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-base font-[500]">Notification title <span className="text-xs font-[300] ml-2 text-[#7C7C7C]">10mins ago</span></h3>
                        <IoMdClose/>
                    </div>
                    <p className="text-xs text-[#525252] font-[300] py-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>

                    <div className="flex space-x-2">
                        <button className="text-xs">Dismiss</button>
                        <button className="text-xs font-semibold">Accept</button>

                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-500">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
