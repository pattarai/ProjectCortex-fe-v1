/**
 *
 * Asynchronously loads the component for ProfileView
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ProfileView = lazyLoad(
  () => import('./index'),
  module => module.ProfileView,
);
