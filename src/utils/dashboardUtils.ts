import { CiTablets1 } from "react-icons/ci";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { LiaPillsSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
import {
  FaRegCircleUser,
  FaUser,
  FaUserDoctor,
  FaUserInjured,
} from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { GrTest } from "react-icons/gr";
import { GiTestTubes } from "react-icons/gi";
import routeLinks from "./routes";
import { HiMiniUsers, HiUsers } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { CiViewList } from "react-icons/ci";
import { ImLab } from "react-icons/im";
import { MdInventory, MdMedication } from "react-icons/md";
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
    label: "Diagnoses",
    title: "Diagnoses",
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
    label: "Pharmacy",
    title: "Pharmacy",
    icon: LiaPillsSolid,
    to: routeLinks?.patient?.pharmacy,
    subLinks: [
      {
        label: "checkout",
        title: "checkout",
        icon: IoCalendarClearOutline,
        to: routeLinks?.patient?.labDetails,
      },
    ],
  },
  {
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks?.patient?.orders,
    subLinks: [
      {
        label: "Orders details",
        title: "Orders details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.patient?.orderDetails,
      },
    ],
  },

  {
    label: "profile",
    title: "profile",
    icon: FaRegUserCircle,
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
    to: "",
    subLinks: [
      {
        label: "My Patients",
        title: "My Patients",
        icon: FaUserInjured,
        to: routeLinks?.doctor?.patients,
      },
      {
        label: "All Patients",
        title: "All Patients",
        icon: FaUserInjured,
        to: routeLinks?.doctor?.allPatients,
      },
      {
        label: "Patients",
        title: "Patients / Patients Details",
        icon: HiUsers,
        visible: false,
        to: routeLinks?.doctor?.allPatientsDetails,
      },
      {
        label: "Patients",
        title: "Patients / Patients Details",
        icon: FaUserInjured,
        visible: false,
        to: routeLinks?.doctor?.patientView,
      },
    ],
  },

  //   {
  //   label: "All Patients",
  //   title: "All Patients",
  //   icon: HiUsers,
  //   to: routeLinks?.doctor?.allPatients,
  //   subLinks: [
  //     {
  //       label: "Patients",
  //       title: "Patients / Patients Details",
  //       icon: HiUsers,
  //       to: routeLinks?.doctor?.allPatientsDetails,
  //     },
  //   ],
  // },
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
];

export const navItemsAdmin = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks?.admin?.dashboard,
  },

  {
    label: "Users",
    title: "Users",
    icon: FaUser,
    to: routeLinks?.admin?.users,
  },

  {
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured,
    to: "",
    subLinks: [
      {
        label: "Patients",
        title: "Patients",
        icon: FaUserInjured,
        to: routeLinks?.admin?.patients,
      },
      {
        label: "Patients Stats",
        title: "Patients Stats",
        icon: FaUserInjured,
        to: routeLinks?.admin?.patientsStats,
      },
    ],
  },
  {
    label: "Doctors",
    title: "Doctors",
    icon: FaUserDoctor,
    to: "",
        subLinks: [
      {
        label: "Doctors",
        title: "Doctors",
        icon: FaUserDoctor,
        to: routeLinks?.admin?.doctors,
      },
      {
        label: "Doctors Stats",
        title: "Doctors Stats",
        icon: FaUserDoctor,
        to: routeLinks?.admin?.doctorsStats,
      },
        {
        label: "Doctors Specialties",
        title: "Doctors Specialties",
        icon: FaUserDoctor,
        to: routeLinks?.admin?.doctorsSpecialties,
      },
    ],
  },
  {
    label: "Laboratories",
    title: "Laboratories",
    icon: GiTestTubes,
    to: routeLinks?.admin?.lab,
  },

  {
    label: "Pharmacists",
    title: "Pharmacists",
    icon: LiaPillsSolid,
    to: routeLinks?.admin?.pharmacists,
  },

  {
    label: "Inventory",
    title: "Inventory",
    icon: MdInventory,
    to: "",
    subLinks: [
      {
        label: "Inventories",
        title: "Inventories",
        icon: FaUserInjured,
        to: routeLinks?.admin?.adminInventory,
      },
      {
        label: "Inventory Logs",
        title: "Inventory Logs",
        icon: FaUserInjured,
        to: routeLinks?.admin?.adminInventoryLogs,
      },
      {
        label: "Inventory Summary",
        title: "Inventory Summary",
        icon: FaUserInjured,
        to: routeLinks?.admin?.adminInventorySummary,
      },
      {
        label: "Inventory Details",
        title: "Inventory Details",
        icon: FaUserInjured,
        to: routeLinks?.admin?.adminInventoryDetails,
        visible: false,
      },
      {
        label: "Inventory Medication Details",
        title: "Inventory Medication Details",
        icon: FaUserInjured,
        to: routeLinks?.admin?.adminInventoryMedication,
        visible: false,
      },
    ],
  },
  {
    label: "Medications",
    title: "Medications",
    icon: MdMedication,
    to: routeLinks?.admin?.medications,
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
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks?.admin?.orders,
    subLinks: [
      {
        label: "Orders details",
        title: "Orders details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.admin?.orderDetails,
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
    label: "Users",
    title: "Users",
    icon: FaUser,
    to: routeLinks?.superAdmin?.users,
  },
  {
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured,
    to: "",
    subLinks: [
      {
        label: "Patients",
        title: "Patients",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.patients,
      },
      {
        label: "Patients Stats",
        title: "Patients Stats",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.patientsStats,
      },
    ],
  },
  {
    label: "Doctors",
    title: "Doctors",
    icon: FaUserDoctor,
    to: "",
        subLinks: [
      {
        label: "Doctors",
        title: "Doctors",
        icon: FaUserDoctor,
        to: routeLinks?.superAdmin?.doctors,
      },
      {
        label: "Doctors Stats",
        title: "Doctors Stats",
        icon: FaUserDoctor,
        to: routeLinks?.superAdmin?.doctorsStats,
      },
        {
        label: "Doctors Specialties",
        title: "Doctors Specialties",
        icon: FaUserDoctor,
        to: routeLinks?.superAdmin?.doctorsSpecialties,
      },
    ],
  },
  {
    label: "Laboratories",
    title: "Laboratories",
    icon: GiTestTubes,
    to: routeLinks?.superAdmin?.lab,
  },

  {
    label: "Pharmacists",
    title: "Pharmacists",
    icon: LiaPillsSolid,
    to: routeLinks?.superAdmin?.pharmacists,
  },

  {
    label: "Inventory",
    title: "Inventory",
    icon: MdInventory,
    to: "",
    subLinks: [
      {
        label: "Inventories",
        title: "Inventories",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.adminInventory,
      },
      {
        label: "Inventory Logs",
        title: "Inventory Logs",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.adminInventoryLogs,
      },
      {
        label: "Inventory Summary",
        title: "Inventory Summary",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.adminInventorySummary,
      },
      {
        label: "Inventory Details",
        title: "Inventory Details",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.adminInventoryDetails,
        visible: false,
      },
      {
        label: "Inventory Medication Details",
        title: "Inventory Medication Details",
        icon: FaUserInjured,
        to: routeLinks?.superAdmin?.adminInventoryMedication,
        visible: false,
      },
    ],
  },

  {
    label: "Medications",
    title: "Medications",
    icon: MdMedication,
    to: routeLinks?.superAdmin?.medications,
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
    label: "Admins",
    title: "Admins",
    icon: HiMiniUsers,
    to: routeLinks?.superAdmin?.admins,
  },
  {
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks?.superAdmin?.orders,
    subLinks: [
      {
        label: "Orders details",
        title: "Orders details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.superAdmin?.orderDetails,
      },
    ],
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
    label: "Inventory",
    title: "Inventory",
    icon: MdInventory,
    to: "",
    subLinks: [
      {
        label: "Inventories",
        title: "Inventories",
        icon: FaUserInjured,
        to: routeLinks?.pharmacist?.pharmacistInventory,
      },
      {
        label: "Inventory Summary",
        title: "Inventory Summary",
        icon: FaUserInjured,
        to: routeLinks?.pharmacist?.pharmacistInventorySummary,
      },
      {
        label: "Inventory Details",
        title: "Inventory Details",
        icon: FaUserInjured,
        to: routeLinks?.pharmacist?.pharmacistInventoryDetails,
        visible: false,
      },
      {
        label: "Inventory Medication Details",
        title: "Inventory Medication Details",
        icon: FaUserInjured,
        to: routeLinks?.pharmacist?.pharmacistInventoryMedication,
        visible: false,
      },
    ],
  },
  {
    label: "Medications",
    title: "Medications",
    icon: MdMedication,
    to: routeLinks?.pharmacist?.medications,
  },
  {
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks?.pharmacist?.orders,
    subLinks: [
      {
        label: "Orders details",
        title: "Orders details",
        icon: IoCalendarClearOutline,
        to: routeLinks?.pharmacist?.orderDetails,
      },
    ],
  },
  {
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks?.pharmacist?.profile,
  },
];

export const inventoryStatusOptions = [
  "in_stock",
  "low_stock",
  "expired",
  "out_of_stock",
];

export const inventoryLocationOptions = [
  "Pharmacy",
  "Ward A",
  "Ward B",
  "Lab",
  "Store Room",
];

export const inventorySupplierOptions = [
  "PharmaPlus",
  "MedSupply Co.",
  "Global Health Distributors",
  "RxDepot",
  "Wellness Suppliers",
];

export const inventoryLowStockOptions = [
  { label: "Yes", value: "10" },
  { label: "No", value: "" },
];

export const inventoryExpiryOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export const inventoryExpiringInOptions = [
  { label: "7 days", value: "7" },
  { label: "14 days", value: "14" },
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
];

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
];

export const labDepartmentOptions = [
  "Hematology",
  "Clinical",
  " Pathology",
  "Biochemistry",
  "Microbiology",
  "Histopathology",
];

export const medicationCategoryOptions = [
  "antibiotic",
  "analgesic",
  "antihypertensive",
  "antidiabetic",
  "antihistamine",
  "antiviral",
  "antifungal",
  "cardiovascular",
  "neurological",
  "respiratory",
  "gastrointestinal",
  "dermatological",
  "hormonal",
  "vitamin_supplement",
  "other",
];

export const medicationDosageFormOptions = [
  "tablet",
  "capsule",
  "syrup",
  "injection",
  "cream",
  "ointment",
  "drop",
  "patch",
  "inhaler",
  "suspension",
  "powder",
  "gel",
];
export const medicationStatusOptions = ["active", "inactive", "discontinued"];

export const medicationManufacturerOptions = [
  "GSK Pharmaceuticals",
  "Pfizer",
  "Novartis",
];

export const appointmentStatus = [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  " no_show",
];

export const labRequestStatus = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export const labRequestPriority = ["low", "medium", "high"];
export const returnMemberNavigationUrlLogic = (user: any) => {
  if (!user.isEmailVerified) {
    return routeLinks?.auth?.emailVerification;
  }

  if (!user.dateOfBirth) {
    return routeLinks?.patient?.onboarding;
  }

  return "/patient/dashboard";
};

export const getAge = (dateOfBirth?: string | null): number | null => {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday has occurred yet this year
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
};

export const returnPartnerNavigationUrlLogic = (
  partnerType: string,
  partnerProfile: any
) => {
  if (partnerProfile) {
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
  if (partnerProfile) {
    if (partnerType === "admin") {
      return routeLinks?.admin?.dashboard;
    }
    if (partnerType === "super_admin") {
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

export function numberWithCommas(x: number | string): string {
  const num = typeof x === "string" ? parseFloat(x) : x;
  return num.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
