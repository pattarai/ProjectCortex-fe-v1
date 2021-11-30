import { LoginState } from '../app/pages/LoginPage/slice/types';
import { UserManagementState } from '../app/pages/UserManagement/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login?: LoginState;
  userManagement?: UserManagementState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
