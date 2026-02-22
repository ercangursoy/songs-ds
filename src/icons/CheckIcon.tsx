import type { IconProps } from "./index";

export function CheckIcon({ size = 12, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 10.6667 8.37333"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.55556 8.37333L0 4.81778L1.25333 3.55556L3.55556 5.85778L9.41333 0L10.6667 1.26222"
        fill="currentColor"
      />
    </svg>
  );
}
