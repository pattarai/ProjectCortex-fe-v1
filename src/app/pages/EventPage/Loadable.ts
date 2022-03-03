/**
 *
 * Asynchronously loads the component for EventPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EventPage = lazyLoad(
  () => import('./index'),
  module => module.EventPage,
);
