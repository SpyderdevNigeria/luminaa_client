import { CiTablets1 } from "react-icons/ci";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { LiaPillsSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
import {  FaRegCircleUser, FaUserDoctor, FaUserInjured     } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { GrTest } from "react-icons/gr";
import { GiTestTubes } from "react-icons/gi";
import routeLinks from "./routes";
import { HiMiniUsers } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { CiViewList } from "react-icons/ci";
import { ImLab } from "react-icons/im";
import { MdMedication } from "react-icons/md";
import moment from "moment";
export const navItemsPatient = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.patient?.dashboard,
  },
    {
    label: "Consultations",
    title: "Consultations",
    icon: LiaStethoscopeSolid,
    to: routeLinks?.patient?.consultations,
        subLinks: [
      {
        label: "Consultations",
        title: "Consultations / Consultations Details",
        icon: LiaStethoscopeSolid,
        to: routeLinks?.patient?.consultationsid,
      },
    ],
  },
    {
    label: "Lab/Radiology",
    title: "Lab/Radiology",
    icon: ImLab,
    to: routeLinks?.patient?.lab,
      subLinks: [
      {
        label: "Lab/Radiology",
        title: "Lab/Radiology",
        icon: IoCalendarClearOutline,
        to: routeLinks?.patient?.labDetails,
      },
    ],
  },

  {
    label: "MedicalHistory",
    title: "MedicalHistory",
    icon: CiViewList,
    to: routeLinks?.patient?.medicalHistory,
  },
  {
    label: "Prescription",
    title: "Prescription",
    icon: CiTablets1,
    to: routeLinks?.patient?.prescription,
  },
  {
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks?.patient?.orders,
  },
  {
    label: "Pharmacy",
    title: "Pharmacy",
    icon: LiaPillsSolid,
    to: routeLinks?.patient?.pharmacy,
  },


   {
    label: "profile",
    title: "profile",
     icon: FaRegUserCircle  ,
    to: routeLinks?.patient?.profile,
  },
];

export const navItemsDoctor = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.doctor?.dashboard,
  },
  {
    label: "Appointments",
    title: "Appointments",
    icon: IoCalendarClearOutline,
    to: routeLinks?.doctor?.appointment,
    subLinks: [
      {
        label: "Appointments",
        title: "Appointments / Appointment Details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.doctor?.appointmentView,
      },
    ],
  },

  {
    label: "Schedule",
    title: "Schedule",
    icon: TfiTimer,
    to: routeLinks?.doctor?.schedule,
  },
      {
    label: "Lab Request",
    title: "Lab Request",
    icon: FiPackage,
    to: routeLinks?.doctor?.labOrders,
     subLinks: [
      {
        label: "Lab Requests",
        title: "Lab Requests / Request Details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.doctor?.labOrdersDetails,
      },
    ],
  },

    {
    label: "Prescription",
    title: "Prescription",
    icon: CiTablets1,
    to: routeLinks?.doctor?.prescription,
  },
  {
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured,
    to: routeLinks?.doctor?.patients,
    subLinks: [
      {
        label: "Patients",
        title: "Patients / Patients Details",
        icon: FaUserInjured,
        to: routeLinks?.doctor?.patientView,
      },
    ],
  },
  {
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks?.doctor?.profile,
  },
];

export const navItemsLab = [
      {
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.lab?.dashboard,
  },
  {
    label: "Test Requests",
    title: "Test Requests",
    icon: GrTest,
    to: routeLinks?.lab?.labRequests,
      subLinks: [
      {
        label: "Test Requests",
        title: "Test Requests / Request Details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.lab?.labRequestsDetails,
      },
    ],
  },
  {
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks?.lab?.profile,
  },
]

export const navItemsAdmin = [
  {  
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.admin?.dashboard,
  },
  {
    label: "Doctors",
    title: "Doctors",
    icon:  FaUserDoctor,
    to: routeLinks?.admin?.doctors,
  },
    {
    label: "Laboratories",
    title: "Laboratories",
    icon: GiTestTubes ,
    to: routeLinks?.admin?.lab,
  },
    {
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured ,
    to: routeLinks?.admin?.patients,
  },
  {
    label: "Pharmacists",
    title: "Pharmacists",
    icon: LiaPillsSolid,
    to: routeLinks?.admin?.pharmacists
  },
  {
    label:"Medications",
    title:"Medications",
    icon:MdMedication,
    to:routeLinks?.admin?.medications,
      subLinks: [
      {
        label: "Medications",
        title: "Medications / Medications Details",
        icon: FaUserInjured,
        to: routeLinks?.admin?.medicationsDetails,
      },
    ],
  },
    {
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks?.admin?.profile,
  },
  // {
  //   label: "Reports",
  //   title: "Reports",
  //   icon: CiViewList,
  //   to: routeLinks?.admin?.lab,
  // },
  // {
  //   label: "Settings",
  //   title: "Settings",
  //   icon: FaRegCircleUser,
  //   to: routeLinks?.admin?.settings,
  // },
];

export const navItemsSuperAdmin = [
  {  
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.superAdmin?.dashboard,
  },
  {
    label: "Doctors",
    title: "Doctors",
    icon:  FaUserDoctor,
    to: routeLinks?.superAdmin?.doctors,
  },
    {
    label: "Laboratories",
    title: "Laboratories",
    icon: GiTestTubes ,
    to: routeLinks?.superAdmin?.lab,
  },
    {
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured ,
    to: routeLinks?.superAdmin?.patients,
  },
  {
    label: "Pharmacists",
    title: "Pharmacists",
    icon: LiaPillsSolid,
    to: routeLinks?.superAdmin?.pharmacists
  },
  {
    label:"Medications",
    title:"Medications",
    icon:MdMedication,
    to:routeLinks?.superAdmin?.medications,
    subLinks: [
      {
        label: "Medications",
        title: "Medications / Medications Details",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.medicationsDetails,
      },
    ],
  },

    {
    label:"Admins",
    title:"Admins",
    icon:HiMiniUsers,
    to:routeLinks?.superAdmin?.admins,
  },
     {
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks?.superAdmin?.profile,
  },
  // {
  //   label: "Reports",
  //   title: "Reports",
  //   icon: CiViewList,
  //   to: routeLinks?.admin?.lab,
  // },
  // {
  //   label: "Settings",
  //   title: "Settings",
  //   icon: FaRegCircleUser,
  //   to: routeLinks?.admin?.settings,
  // },
];

export const navItemsPharmacy = [
    {  
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.pharmacist?.dashboard,
  },
    {
    label:"Medications",
    title:"Medications",
    icon:MdMedication,
    to:routeLinks?.pharmacist?.medications,
  },
    {
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks?.pharmacist?.profile,
  },

]
export const adminDoctorSpecialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Medicine",
  "Gynecology",
  "Neurology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Urology",
]

export const labDepartmentOptions = [
  'Hematology',
"Clinical",
" Pathology",
"Biochemistry",
"Microbiology",
"Histopathology",
]

export const medicationCategoryOptions = [
  'antibiotic', 'analgesic', 'antihypertensive', 'antidiabetic', 'antihistamine', 'antiviral', 'antifungal', 'cardiovascular', 'neurological', 'respiratory', 'gastrointestinal', 'dermatological', 'hormonal', 'vitamin_supplement', 'other'
]

export const medicationDosageFormOptions = [
   'tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment', 'drop', 'patch', 'inhaler', 'suspension', 'powder', 'gel'
]
export const medicationStatusOptions = [
  'active', 'inactive', 'discontinued'
]

export const medicationManufacturerOptions = [ "GSK Pharmaceuticals", "Pfizer", "Novartis"]

export const appointmentStatus = [
  "scheduled", "confirmed", "completed", "cancelled"," no_show"
]

export const labRequestStatus = [
  "PENDING", "IN_PROGRESS","COMPLETED", "CANCELLED"
]


export const labRequestPriority = [
  'low', 'medium', 'high'
]
export const returnMemberNavigationUrlLogic = (user: any) => {
  if (!user.isEmailVerified) {
    return routeLinks?.auth?.emailVerification;
  }

  if (!user.dateOfBirth) {
    return routeLinks?.patient?.onboarding;
  }

  return "/patient/dashboard";
};




export const returnPartnerNavigationUrlLogic = (
  partnerType: string,
  partnerProfile: any
) => {
  if (partnerProfile){
  if (partnerType === "doctor") {
    return routeLinks?.doctor?.dashboard;
  }

  if (partnerType === "lab_tech") {
    return routeLinks?.lab?.dashboard;
  }

  if (partnerType === "hospital") {
    return "/hospital/dashboard";
  }

  if (partnerType === "pharmacist") {
    return routeLinks?.pharmacist?.dashboard;
  }

  if (partnerType === "sponsor") {
    return "/sponsor/dashboard";
  }
  }
  return routeLinks?.auth?.partnerLogin;
};



export const returnAdminNavigationUrlLogic = (
  partnerType: string,
  partnerProfile: any
) => {
  if (partnerProfile){
  if (partnerType === 'admin') {
    return routeLinks?.admin?.dashboard;
  }
    if (partnerType === 'super_admin') {
    return routeLinks?.superAdmin?.dashboard;
  }
  }
  return routeLinks?.auth?.adminLogin;
};


export function getFormattedDateTime(isoDateString: string) {
  const localDateString = isoDateString.replace(/Z$/, "");
  const dateObj = new Date(localDateString);

  const getDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = moment(getDate).format("MMMM Do YYYY");

  return {
    formattedDate,
    formattedTime,
  };
}