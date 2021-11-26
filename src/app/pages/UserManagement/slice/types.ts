/* --- STATE --- */

interface UserManagement {
  id: number;
  name: string;
  email: string;
  role: string;
  project: string;
  date: Date | string;
}

export interface UserManagementState extends Array<UserManagement> {}
