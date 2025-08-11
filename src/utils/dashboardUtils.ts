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
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks.patient.dashboard ?? '',
  },
  {
    id: "consultations",
    label: "Consultations",
    title: "Consultations",
    icon: LiaStethoscopeSolid,
    to: routeLinks.patient.consultations ?? '',
    subLinks: [
      {
        id: "consultations-details",
        label: "Consultation Details",
        title: "Consultations / Consultation Details",
        icon: LiaStethoscopeSolid,
        to: routeLinks.patient.consultationsid ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "lab-radiology",
    label: "Lab/Radiology",
    title: "Lab/Radiology",
    icon: ImLab,
    to: routeLinks.patient.lab ?? '',
    subLinks: [
      {
        id: "lab-radiology-details",
        label: "Lab/Radiology Details",
        title: "Lab/Radiology / Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.patient.labDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "diagnoses",
    label: "Diagnoses",
    title: "Diagnoses",
    icon: CiViewList,
    to: routeLinks.patient.medicalHistory ?? '',
  },
  {
    id: "prescription",
    label: "Prescription",
    title: "Prescription",
    icon: CiTablets1,
    to: routeLinks.patient.prescription ?? '',
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    title: "Pharmacy",
    icon: LiaPillsSolid,
    to: routeLinks.patient.pharmacy ?? '',
    subLinks: [
      {
        id: "pharmacy-checkout",
        label: "Checkout",
        title: "Pharmacy / Checkout",
        icon: IoCalendarClearOutline,
        to: routeLinks.patient.labDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks.patient.orders ?? '',
    subLinks: [
      {
        id: "orders-details",
        label: "Order Details",
        title: "Orders / Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.patient.orderDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    title: "Profile",
    icon: FaRegUserCircle,
    to: routeLinks.patient.profile ?? '',
  },
];

export const navItemsDoctor = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks.doctor.dashboard ?? '',
  },
  {
    id: "appointments",
    label: "Appointments",
    title: "Appointments",
    icon: IoCalendarClearOutline,
    to: routeLinks.doctor.appointment ?? '',
    subLinks: [
      {
        id: "appointments-view",
        label: "Appointment Details",
        title: "Appointments / Appointment Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.doctor.appointmentView ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "schedule",
    label: "Schedule",
    title: "Schedule",
    icon: TfiTimer,
    to: routeLinks.doctor.schedule ?? '',
  },
  {
    id: "lab-requests",
    label: "Lab Requests",
    title: "Lab Requests",
    icon: FiPackage,
    to: routeLinks.doctor.labOrders ?? '',
    subLinks: [
      {
        id: "lab-requests-details",
        label: "Lab Request Details",
        title: "Lab Requests / Request Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.doctor.labOrdersDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "prescriptions",
    label: "Prescriptions",
    title: "Prescriptions",
    icon: CiTablets1,
    to: routeLinks.doctor.prescription ?? '',
  },
  {
    id: "patients-main",
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured,
    to: undefined, // parent with no direct route
    subLinks: [
      {
        id: "patients-my",
        label: "My Patients",
        title: "My Patients",
        icon: FaUserInjured,
        to: routeLinks.doctor.patients ?? '',
        visible: true,
      },
      {
        id: "patients-details-1",
        label: "Patient Details 1",
        title: "Patients / Patient Details 1",
        icon: HiUsers,
        to: routeLinks.doctor.allPatientsDetails ?? '',
        visible: false,
      },
      {
        id: "patients-details-2",
        label: "Patient Details 2",
        title: "Patients / Patient Details 2",
        icon: FaUserInjured,
        to: routeLinks.doctor.patientView ?? '',
        visible: false,
      },
    ],
  },
  {
    id: "profile-management",
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks.doctor.profile ?? '',
  },
];

export const navItemsLab = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks.lab.dashboard ?? '',
  },
  {
    id: "test-requests",
    label: "Test Requests",
    title: "Test Requests",
    icon: GrTest,
    to: routeLinks.lab.labRequests ?? '',
    subLinks: [
      {
        id: "test-requests-details",
        label: "Test Request Details",
        title: "Test Requests / Request Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.lab.labRequestsDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "profile-management",
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks.lab.profile ?? '',
  },
];

export const navItemsAdmin = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks.admin.dashboard ?? '',
  },
  {
    id: "users",
    label: "Users",
    title: "Users",
    icon: FaUser,
    to: routeLinks.admin.users ?? '',
  },
  {
    id: "patients",
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured,
    to: undefined,
    subLinks: [
      {
        id: "patients-main",
        label: "Patients List",
        title: "Patients List",
        icon: FaUserInjured,
        to: routeLinks.admin.patients ?? '',
        visible: true,
      },
      {
        id: "patients-stats",
        label: "Patients Stats",
        title: "Patients Stats",
        icon: FaUserInjured,
        to: routeLinks.admin.patientsStats ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "doctors",
    label: "Doctors",
    title: "Doctors",
    icon: FaUserDoctor,
    to: undefined,
    subLinks: [
      {
        id: "doctors-main",
        label: "Doctors List",
        title: "Doctors List",
        icon: FaUserDoctor,
        to: routeLinks.admin.doctors ?? '',
        visible: true,
      },
      {
        id: "doctors-stats",
        label: "Doctors Stats",
        title: "Doctors Stats",
        icon: FaUserDoctor,
        to: routeLinks.admin.doctorsStats ?? '',
        visible: true,
      },
      {
        id: "doctors-specialties",
        label: "Doctors Specialties",
        title: "Doctors Specialties",
        icon: FaUserDoctor,
        to: routeLinks.admin.doctorsSpecialties ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "lab-radiology-scientists",
    label: "Lab/Radiology Scientists",
    title: "Lab/Radiology Scientists",
    icon: GiTestTubes,
    to: undefined,
    subLinks: [
      {
        id: "laboratories",
        label: "Laboratories",
        title: "Laboratories",
        icon: GiTestTubes,
        to: routeLinks.admin.lab ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "pharmacists",
    label: "Pharmacists",
    title: "Pharmacists",
    icon: LiaPillsSolid,
    to: routeLinks.admin.pharmacists ?? '',
  },
  {
    id: "inventory",
    label: "Inventory",
    title: "Inventory",
    icon: MdInventory,
    to: undefined,
    subLinks: [
      {
        id: "inventories",
        label: "Inventories",
        title: "Inventories",
        icon: FaUserInjured,
        to: routeLinks.admin.adminInventory ?? '',
        visible: true,
      },
      {
        id: "inventory-logs",
        label: "Inventory Logs",
        title: "Inventory Logs",
        icon: FaUserInjured,
        to: routeLinks.admin.adminInventoryLogs ?? '',
        visible: true,
      },
      {
        id: "inventory-summary",
        label: "Inventory Summary",
        title: "Inventory Summary",
        icon: FaUserInjured,
        to: routeLinks.admin.adminInventorySummary ?? '',
        visible: true,
      },
      {
        id: "inventory-details",
        label: "Inventory Details",
        title: "Inventory Details",
        icon: FaUserInjured,
        to: routeLinks.admin.adminInventoryDetails ?? '',
        visible: false,
      },
      {
        id: "inventory-medication-details",
        label: "Inventory Medication Details",
        title: "Inventory Medication Details",
        icon: FaUserInjured,
        to: routeLinks.admin.adminInventoryMedication ?? '',
        visible: false,
      },
    ],
  },
  {
    id: "medications",
    label: "Medications",
    title: "Medications",
    icon: MdMedication,
    to: routeLinks.admin.medications ?? '',
    subLinks: [
      {
        id: "medications-details",
        label: "Medications Details",
        title: "Medications / Medications Details",
        icon: FaUserInjured,
        to: routeLinks.admin.medicationsDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks.admin.orders ?? '',
    subLinks: [
      {
        id: "orders-details",
        label: "Orders Details",
        title: "Orders / Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.admin.orderDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "profile-management",
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks.admin.profile ?? '',
  },
];

export const navItemsSuperAdmin = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks.superAdmin.dashboard ?? '',
  },
  {
    id: "users",
    label: "Users",
    title: "Users",
    icon: FaUser,
    to: routeLinks.superAdmin.users ?? '',
  },
  {
    id: "patients",
    label: "Patients",
    title: "Patients",
    icon: FaUserInjured,
    to: undefined,
    subLinks: [
      {
        id: "patients-main",
        label: "Patients List",
        title: "Patients List",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.patients ?? '',
        visible: true,
      },
      {
        id: "patients-stats",
        label: "Patients Stats",
        title: "Patients Stats",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.patientsStats ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "doctors",
    label: "Doctors",
    title: "Doctors",
    icon: FaUserDoctor,
    to: undefined,
    subLinks: [
      {
        id: "doctors-main",
        label: "Doctors List",
        title: "Doctors List",
        icon: FaUserDoctor,
        to: routeLinks.superAdmin.doctors ?? '',
        visible: true,
      },
      {
        id: "doctors-stats",
        label: "Doctors Stats",
        title: "Doctors Stats",
        icon: FaUserDoctor,
        to: routeLinks.superAdmin.doctorsStats ?? '',
        visible: true,
      },
      {
        id: "doctors-specialties",
        label: "Doctors Specialties",
        title: "Doctors Specialties",
        icon: FaUserDoctor,
        to: routeLinks.superAdmin.doctorsSpecialties ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "lab-radiology-scientists",
    label: "Lab/Radiology Scientists",
    title: "Lab/Radiology Scientists",
    icon: GiTestTubes,
    to: undefined,
    subLinks: [
      {
        id: "laboratories",
        label: "Laboratories",
        title: "Laboratories",
        icon: GiTestTubes,
        to: routeLinks.superAdmin.lab ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "pharmacists",
    label: "Pharmacists",
    title: "Pharmacists",
    icon: LiaPillsSolid,
    to: routeLinks.superAdmin.pharmacists ?? '',
  },
  {
    id: "inventory",
    label: "Inventory",
    title: "Inventory",
    icon: MdInventory,
    to: undefined,
    subLinks: [
      {
        id: "inventories",
        label: "Inventories",
        title: "Inventories",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.adminInventory ?? '',
        visible: true,
      },
      {
        id: "inventory-logs",
        label: "Inventory Logs",
        title: "Inventory Logs",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.adminInventoryLogs ?? '',
        visible: true,
      },
      {
        id: "inventory-summary",
        label: "Inventory Summary",
        title: "Inventory Summary",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.adminInventorySummary ?? '',
        visible: true,
      },
      {
        id: "inventory-details",
        label: "Inventory Details",
        title: "Inventory Details",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.adminInventoryDetails ?? '',
        visible: false,
      },
      {
        id: "inventory-medication-details",
        label: "Inventory Medication Details",
        title: "Inventory Medication Details",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.adminInventoryMedication ?? '',
        visible: false,
      },
    ],
  },
  {
    id: "medications",
    label: "Medications",
    title: "Medications",
    icon: MdMedication,
    to: routeLinks.superAdmin.medications ?? '',
    subLinks: [
      {
        id: "medications-details",
        label: "Medications Details",
        title: "Medications / Medications Details",
        icon: FaUserInjured,
        to: routeLinks.superAdmin.medicationsDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "admins",
    label: "Admins",
    title: "Admins",
    icon: HiMiniUsers,
    to: routeLinks.superAdmin.admins ?? '',
  },
  {
    id: "orders",
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks.superAdmin.orders ?? '',
    subLinks: [
      {
        id: "orders-details",
        label: "Orders Details",
        title: "Orders / Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.superAdmin.orderDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "profile-management",
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks.superAdmin.profile ?? '',
  },
];

export const navItemsPharmacy = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    icon: RxDashboard,
    to: routeLinks.pharmacist.dashboard ?? '',
  },
  {
    id: "inventory",
    label: "Inventory",
    title: "Inventory",
    icon: MdInventory,
    to: undefined,
    subLinks: [
      {
        id: "inventories",
        label: "Inventories",
        title: "Inventories",
        icon: FaUserInjured,
        to: routeLinks.pharmacist.pharmacistInventory ?? '',
        visible: true,
      },
      {
        id: "inventory-summary",
        label: "Inventory Summary",
        title: "Inventory Summary",
        icon: FaUserInjured,
        to: routeLinks.pharmacist.pharmacistInventorySummary ?? '',
        visible: true,
      },
      {
        id: "inventory-details",
        label: "Inventory Details",
        title: "Inventory Details",
        icon: FaUserInjured,
        to: routeLinks.pharmacist.pharmacistInventoryDetails ?? '',
        visible: false,
      },
      {
        id: "inventory-medication-details",
        label: "Inventory Medication Details",
        title: "Inventory Medication Details",
        icon: FaUserInjured,
        to: routeLinks.pharmacist.pharmacistInventoryMedication ?? '',
        visible: false,
      },
    ],
  },
  {
    id: "medications",
    label: "Medications",
    title: "Medications",
    icon: MdMedication,
    to: routeLinks.pharmacist.medications ?? '',
  },
  {
    id: "orders",
    label: "Orders",
    title: "Orders",
    icon: FiPackage,
    to: routeLinks.pharmacist.orders ?? '',
    subLinks: [
      {
        id: "orders-details",
        label: "Orders Details",
        title: "Orders / Details",
        icon: IoCalendarClearOutline,
        to: routeLinks.pharmacist.orderDetails ?? '',
        visible: true,
      },
    ],
  },
  {
    id: "profile-management",
    label: "Profile Management",
    title: "Profile Management",
    icon: FaRegCircleUser,
    to: routeLinks.pharmacist.profile ?? '',
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


export const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT - Abuja"
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
// Helper to ensure user must be 18 years or older
export const getMaxDateFor18YearsOld = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split("T")[0];
};

// Format the date safely to YYYY-MM-DD
export const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "";
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? "" : parsed.toISOString().split("T")[0];
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


export const nigerianStates = [
  "Select State", // Placeholder
  "Abia State",
  "Adamawa State",
  "Akwa Ibom State",
  "Anambra State",
  "Bauchi State",
  "Bayelsa State",
  "Benue State",
  "Borno State",
  "Cross River State",
  "Delta State",
  "Ebonyi State",
  "Edo State",
  "Ekiti State",
  "Enugu State",
  "Gombe State",
  "Imo State",
  "Jigawa State",
  "Kaduna State",
  "Kano State",
  "Katsina State",
  "Kebbi State",
  "Kogi State",
  "Kwara State",
  "Lagos State",
  "Nasarawa State",
  "Niger State",
  "Ogun State",
  "Ondo State",
  "Osun State",
  "Oyo State",
  "Plateau State",
  "Rivers State",
  "Sokoto State",
  "Taraba State",
  "Yobe State",
  "Zamfara State",
  "Abuja (FCT) State"
];
