import type { IconProps } from './index';

export function ChevronDownIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.06 5.53L8 8.58333L4.94 5.53L4 6.47L8 10.47L12 6.47L11.06 5.53Z"
        fill="currentColor"
      />
    </svg>
  );
}
