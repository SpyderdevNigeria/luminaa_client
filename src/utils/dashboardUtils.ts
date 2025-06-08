import { CiTablets1 } from "react-icons/ci";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { TbSmartHome } from "react-icons/tb";
import { BiSolidClinic } from "react-icons/bi";
import { LiaPillsSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
import { FaRegNewspaper, FaRegCircleUser,FaUserDoctor    } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { MdPeople } from "react-icons/md";
import { GrTest } from "react-icons/gr";
import { GiTestTubes } from "react-icons/gi";
import routeLinks from "./routes";
export const navItemsPatient = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: TbSmartHome,
    to: routeLinks?.patient?.dashboard,
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
    label: "Lab/Radiology",
    title: "Lab/Radiology",
    icon: BiSolidClinic,
    to: routeLinks?.patient?.lab,
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
    label: "MedicalHistory",
    title: "MedicalHistory",
    icon: FaRegNewspaper,
    to: routeLinks?.patient?.medicalHistory,
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
    icon: TbSmartHome,
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
    label: "Prescription",
    title: "Prescription",
    icon: CiTablets1,
    to: routeLinks?.doctor?.prescription,
  },
  {
    label: "Patients",
    title: "Patients",
    icon: MdPeople,
    to: routeLinks?.doctor?.patients,
    subLinks: [
      {
        label: "Patients",
        title: "Patients / Patients Details",
        icon: IoCalendarClearOutline,
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
    icon: TbSmartHome,
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
    icon: TbSmartHome,
    to: routeLinks?.admin?.dashboard,
  },
  {
    label: "Patients",
    title: "Patients",
    icon: FaUserDoctor,
    to: routeLinks?.admin?.patients,
  },
  {
    label: "Doctors",
    title: "Doctors",
    icon: FaRegCircleUser,
    to: routeLinks?.admin?.doctors,
  },
    {
    label: "Laboratories",
    title: "Laboratories",
    icon: GiTestTubes ,
    to: routeLinks?.admin?.lab,
  },
  // {
  //   label: "Reports",
  //   title: "Reports",
  //   icon: FaRegNewspaper,
  //   to: routeLinks?.admin?.lab,
  // },
  // {
  //   label: "Settings",
  //   title: "Settings",
  //   icon: FaRegCircleUser,
  //   to: routeLinks?.admin?.settings,
  // },
];

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
    return "/lab/dashboard";
  }

  if (partnerType === "hospital") {
    return "/hospital/dashboard";
  }

  if (partnerType === "pharmacy") {
    return "/pharmacy/dashboard";
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
  if (partnerType) {
    return routeLinks?.admin?.dashboard;
  }
  }
  return routeLinks?.auth?.adminLogin;
};