import { LoginState } from '../app/pages/LoginPage/slice/types';
import { ProfileCommonViewState } from '../app/pages/Profilecommonview/slice/types';
import { ProfileViewState } from 'app/pages/Profileview/slice/types';
import { UserManagementState } from '../app/pages/UserManagement/slice/types';
import { AttendanceState } from 'app/pages/Attendance/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login?: LoginState;
  profileCommonView?: ProfileCommonViewState;
  userManagement?: UserManagementState;
  profileView?: ProfileViewState;
  attendance?: AttendanceState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
