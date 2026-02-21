import type { IconProps } from './index';

export function ChevronRightIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00025 16.0002C7.74425 16.0002 7.48825 15.9022 7.29325 15.7072C6.90225 15.3162 6.90225 14.6843 7.29325 14.2933L11.5863 10.0003L7.29325 5.70725C6.90225 5.31625 6.90225 4.68425 7.29325 4.29325C7.68425 3.90225 8.31625 3.90225 8.70725 4.29325L13.7073 9.29325C14.0983 9.68425 14.0983 10.3163 13.7073 10.7073L8.70725 15.7072C8.51225 15.9022 8.25625 16.0002 8.00025 16.0002"
        fill="currentColor"
      />
    </svg>
  );
}
