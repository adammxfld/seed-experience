import * as React from 'react';

export type IconDefinition = {
  viewBox: string;
  paths: React.ReactNode;
};

export type IconName =
  'nutrientsDelivered' |
  'points' |
  'strainsDelivered' |
  'subscriptions' |
  'audioMenu' |
  'audioPlay';
