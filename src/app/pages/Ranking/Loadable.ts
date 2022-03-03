/**
 *
 * Asynchronously loads the component for Ranking
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Ranking = lazyLoad(
  () => import('./index'),
  module => module.Ranking,
);
