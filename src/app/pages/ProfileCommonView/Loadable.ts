/**
 *
 * Asynchronously loads the component for ProfileCommonView
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ProfileCommonView = lazyLoad(
  () => import('./index'),
  module => module.ProfileCommonView,
);
