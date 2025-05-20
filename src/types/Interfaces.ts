export interface IPaginationResponse {
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}


export interface IUser {
  photo: {
    url: string;
    publicId: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  phoneNumber: string;
  role: string; // Assuming role is always a string (e.g., "user", "admin")
  accountType: "member" | "partner" | "inventory" | "admin" | "super_admin";
  isPartnerProfileCompleted: boolean;
  isCompletedProfile: boolean;
  isEmailVerified: boolean;
  isHRABooked: boolean;
  isEnabled: boolean;
  lastLoginDate: string;
  accountPlan: string;
  partnerType: "hospital" | "doctor" | "pharmacy" | "laboratory" | "sponsor";
  gender?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
  };
  cardApplicationStatus?: string;
  createdAt: string | Date;
}

export interface IPayload {
  token: string;
  user: IUser;
}