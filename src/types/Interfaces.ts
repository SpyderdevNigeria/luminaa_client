export interface IPaginationResponse {
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
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


export interface IPayload {
  token: string;
  user: IUser;
}