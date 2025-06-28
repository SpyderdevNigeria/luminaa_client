export interface IPaginationResponse {
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
export interface IPrescription {
  _id: string;
  id:string;
  medicationId:string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  status:string;
  instructions:string;
  createdAt: string;
  isRefillable:string | boolean;
   appointment?:IAppointment,
   doctor?: IDoctor
}

export interface IUser {
  role(role: any, user: IUser): unknown;
  isEmailVerified: any;
  id: string;
  createdAt: string;
  updatedAt: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalHistory: string;
  isBioDataCompleted: boolean;
  isMedicalHistoryCompleted: boolean;
  licenseNumber:string;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    phoneNumber: string;
    lastLogin: string;
    profilePicture: string;
    isEmailVerified: boolean;
  };
}
export interface IDoctor {
    specialty?:string;
    firstName?:string;
    lastName?:string;
    id?:string;

}
export interface IMedicalHistory {
  Asthma: string;
  Diabetes: string;
  Epilepsy: string;
  Genotype: string;
  BloodGroup: string;
  Hypertension: string;
  LiverDisease: string;
  PastDelivery: string;
  KidneyDisease: string;
  SickleCellDisease: string;
  PastBloodTransfusion: string;
  PastHospitalAdmission: string;
}

export interface IPatient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string; 
  gender: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalHistory: IMedicalHistory;
  isBioDataCompleted: boolean;
  isMedicalHistoryCompleted: boolean;
  createdAt: string; 
  updatedAt: string; 
  totalAppointments: number;
  lastAppointmentDate: string; 
  profilePicture: {
    url:string;
  };
}

export interface ILabOrder {
  id: string;
  testName: string;
  notes?: string;
  status?: "pending" | "completed" | "cancelled" | string;
  createdAt: string;
  updatedAt?: string;
  appointmentId?: string;
  patientId?: string;
  priority?:string;
  collectedSample?:boolean;
  statusHistory?: Array<any>
  patient?:Object
  doctor?:Object
}
export interface IAppointment {
  id: string;
  title: string;
  scheduledDate: string;
  status?: string;
  patient:IPatient;
  location?: string;
  doctor:IDoctor;
  patientNote?: string;
  [key: string]: any;
  date:string;
  createdAt:string;
}


export interface PharmacistUser  {
  firstName: string;
  lastName: string;
  email: string;
};

export interface IPharmacist {
  id: string;
  user: PharmacistUser;
  licenseNumber: string;
  licenseExpiryDate: string;
  hireDate: string;
  status:string;
};

export interface IMedication {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  category: string;
  description?: string;
  notes?: string;
  price: number;
  requiresPrescription: boolean;
  isHidden?: boolean;
  status?: "active" | "inactive";
  createdAt?: string; 
  updatedAt?: string; 
  image?: {
    url?: string;
  } | null;
}

export interface ISuperAdmin {
  id: string;
  contactNumber: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  createdAt?: string;
  isActive?: boolean;
}


export interface IPayload {
  token: string;
  user: IUser;
  refreshToken:string;
}

export interface IResult {
  testName?:string;
  result?:string;
  unit?:string;
  referenceRange?:string;
}

export interface IResults {
  id:string;
  labTestOrderId?:string;
  results?:IResult[];
  documents: Array<any>;
  status?:string;
  notes?:string;
}

export interface IInventoryItem {
  id: string;
  medication?:IMedication;
  medicationId: string;
  medicationName: string;
  medicationGenericName: string;
  batchNumber: string;
  notes?:string;
  quantity: number;
  expiryDate: string; 
  status: string;
  barcode: string;
  location: string;
  reference: string;
  supplier: string;
  createdAt: string;
  updatedAt: string;
  isExpired: boolean;
  isLowStock: boolean;
}

export interface IInventorySummary {
  medication:IMedication;
  totalQuantity: number;
}


export interface IInventoryLog {
  id: string;
  medicationId: string;
  medicationName: string;
  inventoryId: string;
  batchNumber: string;
  action: string; 
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  performedBy: string;
  performedByName: string;
  notes: string;
  reference: string;
  timestamp: string; 
}
