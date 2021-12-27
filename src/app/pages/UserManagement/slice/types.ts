/* --- STATE --- */

interface UserManagement {
  uid: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  rank: string;
  project: string;
  committee: string;
  date: string | null;
}

export interface UserManagementState extends Array<UserManagement> {}
