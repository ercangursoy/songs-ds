import type { IconProps } from './index';

interface SortArrowIconProps extends IconProps {
  direction?: 'asc' | 'desc';
}

export function SortArrowIcon({ size = 20, className, direction = 'asc' }: SortArrowIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-direction={direction}
    >
      <path
        d="M10 15.0003L5 10.0003L6.16667 8.83366L9.16667 11.8337V4.16699H10.8333V11.8337L13.8333 8.83366L15 10.0003L10 15.0003Z"
        fill="currentColor"
      />
    </svg>
  );
}
