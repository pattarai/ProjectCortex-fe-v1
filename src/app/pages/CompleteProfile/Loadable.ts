/**
 *
 * Asynchronously loads the component for CompleteProfile
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CompleteProfile = lazyLoad(
  () => import('./index'),
  module => module.CompleteProfile,
);
