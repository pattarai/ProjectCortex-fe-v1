/**
 *
 * Asynchronously loads the component for TopNav
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TopNav = lazyLoad(
  () => import('./index'),
  module => module.TopNav,
);
