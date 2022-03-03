/**
 *
 * Asynchronously loads the component for AttendanceCrew
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AttendanceCrew = lazyLoad(
  () => import('./index'),
  module => module.AttendanceCrew,
);
