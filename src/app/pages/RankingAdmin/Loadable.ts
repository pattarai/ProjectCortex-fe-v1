/**
 *
 * Asynchronously loads the component for UserManagement
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RankingAdmin = lazyLoad(
  () => import('./index'),
  // module => module.RankingAdmin,
);
