export interface UserInfo {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  company: string;
  address: string;
  roles: string[];
  isFirstTimeLogin: boolean;
}

export interface Profile {
  id?: string;
  username?: string;
  email?: string;
  repId?: null;
  sponsorRepId?: null;
  firstName?: string;
  lastName?: string;
  company?: null;
  rank?: null;
  joinDate?: null;
  address1?: null;
  address2?: null;
  city?: null;
  state?: null;
  postalCode?: null;
  country?: null;
  phone?: null;
  coAppEmail?: null;
  url?: null;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}
