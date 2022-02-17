/* --- STATE --- */

interface UserManagement {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  project: string;
  committee: string;
  startDate: string | null;
  isActive: boolean;
  role: string;
  rank: string;
}

export interface UserManagementState {
  error: boolean;
  users: UserManagement[];
}
