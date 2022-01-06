import { LoginState } from '../app/pages/LoginPage/slice/types';
import { UserManagementState } from '../app/pages/UserManagement/slice/types';
import { EventsState } from 'app/pages/EventPage/slice/types';
import { AttendanceState } from 'app/pages/Attendance/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login?: LoginState;
  userManagement?: UserManagementState;
  events?: EventsState;
  attendance?: AttendanceState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
