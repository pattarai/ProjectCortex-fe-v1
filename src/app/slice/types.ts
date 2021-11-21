/* --- STATE --- */

interface UserManagement {
  id: number;
  name: string;
  email: string;
  role: string;
  project: string;
}

export interface UserManagementState extends Array<UserManagement> {}
