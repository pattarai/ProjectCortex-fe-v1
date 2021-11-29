import { LoginState } from '../app/pages/LoginPage/slice/types';
import { ProfileCommonViewState } from '../app/pages/ProfileCommonView/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login?: LoginState;
  profileCommonView?: ProfileCommonViewState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
