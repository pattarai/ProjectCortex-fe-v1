/**
 *
 * Asynchronously loads the component for Attendance
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Attendance = lazyLoad(
  () => import('./index'),
  module => module.Attendance,
);
