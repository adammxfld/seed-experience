import type { IconDefinition, IconName } from './types';

import { nutrientsDeliveredIcon } from './definitions/nutrientsDelivered';
import { pointsIcon } from './definitions/points';
import { strainsDeliveredIcon } from './definitions/strainsDelivered';
import { subscriptionsIcon } from './definitions/subscriptions';

export const ICONS: Record<IconName, IconDefinition> = {
  nutrientsDelivered: nutrientsDeliveredIcon,
  points: pointsIcon,
  strainsDelivered: strainsDeliveredIcon,
  subscriptions: subscriptionsIcon,
};
