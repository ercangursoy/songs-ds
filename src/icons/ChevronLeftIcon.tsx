import type { IconProps } from './index';

export function ChevronLeftIcon({ size = 20, className }: IconProps) {
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
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0003 16.0002C11.7443 16.0002 11.4883 15.9022 11.2933 15.7072L6.29325 10.7073C5.90225 10.3163 5.90225 9.68425 6.29325 9.29325L11.2933 4.29325C11.6843 3.90225 12.3163 3.90225 12.7073 4.29325C13.0983 4.68425 13.0983 5.31625 12.7073 5.70725L8.41425 10.0003L12.7073 14.2933C13.0983 14.6843 13.0983 15.3162 12.7073 15.7072C12.5123 15.9022 12.2563 16.0002 12.0003 16.0002"
        fill="currentColor"
      />
    </svg>
  );
}
