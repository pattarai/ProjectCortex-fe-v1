/* --- STATE --- */

interface UserManagement {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  project: string;
  committee: string;
  startDate: string | null;
  status: boolean;
  roles: {
    role: string;
  };
  rank: string;
}

export interface UserManagementState {
  error: boolean;
  users: UserManagement[];
  committeeList: string[];
  projectList: string[];
  roleList: string[];
}
