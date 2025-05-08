import { CiTablets1 } from "react-icons/ci";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { TbSmartHome } from "react-icons/tb";
import { BiSolidClinic } from "react-icons/bi";
import { LiaPillsSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
import { FaRegNewspaper, FaRegCircleUser } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { MdPeople } from "react-icons/md";
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
  },
  {
    label: "MedicalHistory",
    title: "MedicalHistory",
    icon: FaRegNewspaper,
    to: routeLinks?.patient?.medicalHistory,
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
