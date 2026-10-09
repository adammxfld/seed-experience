import type { IconDefinition, IconName } from './types';

import { nutrientsDeliveredIcon } from './definitions/nutrientsDelivered';
import { pointsIcon } from './definitions/points';
import { strainsDeliveredIcon } from './definitions/strainsDelivered';
import { subscriptionsIcon } from './definitions/subscriptions';
import { audioMenuIcon } from './definitions/audioMenu';
import { audioPlayIcon } from './definitions/audioPlay';
import { chevronLeftIcon } from './definitions/chevronLeft';
import { chevronRightIcon } from './definitions/chevronRight';
import { pauseIcon } from './definitions/pause';
import { slideshowPlayIcon } from './definitions/slideshowPlay';
import { arrowRtIcon } from './definitions/arrowRt';

export const ICONS: Record<IconName, IconDefinition> = {
  nutrientsDelivered: nutrientsDeliveredIcon,
  points: pointsIcon,
  strainsDelivered: strainsDeliveredIcon,
  subscriptions: subscriptionsIcon,
  audioMenu: audioMenuIcon,
  audioPlay: audioPlayIcon,
  chevronLeft: chevronLeftIcon,
  chevronRight: chevronRightIcon,
  pause: pauseIcon,
  slideshowPlay: slideshowPlayIcon,
  arrowRt: arrowRtIcon,
};
