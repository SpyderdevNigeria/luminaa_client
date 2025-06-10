export interface IPaginationResponse {
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
export interface IPrescription {
  _id: string;
  id:string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  status:string;
  instructions:string;
  createdAt: string;
  isRefillable:string;
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

export interface IPatient {
    firstName?:string;
    lastName?:string;
    email?:string;
    id:string;

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

export interface IPayload {
  token: string;
  user: IUser;
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