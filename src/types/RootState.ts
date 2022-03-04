import { UserManagementState } from '../app/pages/UserManagement/slice/types';
import { AttendanceState } from 'app/pages/Attendance/slice/types';
import { RankingAdminState } from 'app/pages/RankingAdmin/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  userManagement?: UserManagementState;
  attendance?: AttendanceState;
  rankingAdmin?: RankingAdminState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
