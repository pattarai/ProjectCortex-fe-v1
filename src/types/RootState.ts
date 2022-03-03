import { SliceState } from 'app/pages/EventPage/slice/types';
import { SliceState } from 'app/pages/LoginPage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  slice?: SliceState;
  slice?: SliceState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
