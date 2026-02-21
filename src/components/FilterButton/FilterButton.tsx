import type { ReactNode } from 'react';
import { ChevronDownIcon } from '@/icons';
import styles from './FilterButton.module.css';

export interface FilterButtonProps {
  label: string;
  activeLabel?: ReactNode;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export function FilterButton({
  label,
  activeLabel,
  isActive,
  isOpen,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      className={styles.button}
      data-active={isActive || undefined}
      data-open={isOpen || undefined}
      onClick={onClick}
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <span className={styles.label}>
        {activeLabel ?? label}
      </span>
      <span className={styles.chevron}>
        <ChevronDownIcon size={16} />
      </span>
    </button>
  );
}
