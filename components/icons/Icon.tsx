import * as React from 'react';
import type { IconName } from './types';
import { ICONS } from './icons';

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'color'> & {
  name: IconName;
  /**
   * Optional color override.
   * If omitted, icon inherits currentColor naturally.
   */
  color?: string;
  size?: number;
  title?: string;
};

export function Icon({ name, color, size, title, style, ...svgProps }: IconProps) {
  const def = ICONS[name];

  return (
    <svg
      viewBox={def.viewBox}
      fill="currentColor"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      style={{
        ...(size != null ? { width: size, height: size } : null),
        ...(color ? { color } : null),
        ...style,
      }}
      {...svgProps}
    >
      {title ? <title>{title}</title> : null}
      {def.paths}
    </svg>
  );
}
