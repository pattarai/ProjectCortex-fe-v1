/* --- STATE --- */

interface UserManagement {
  id: number;
  name: string;
  email: string;
  role: string;
  rank: string;
  project: string;
  committee: string;
  date: Date | null;
}

export interface UserManagementState extends Array<UserManagement> {}
