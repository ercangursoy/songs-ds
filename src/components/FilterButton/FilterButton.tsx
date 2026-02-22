import { forwardRef, type ReactNode } from "react";
import { ChevronDownIcon, CloseIcon } from "@/icons";
import styles from "./FilterButton.module.css";

export interface FilterButtonProps {
  label: string;
  activeLabel?: ReactNode;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
  onClear?: () => void;
}

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  function FilterButton(
    { label, activeLabel, isActive, isOpen, onClick, onClear },
    ref,
  ) {
    return (
      <span
        className={styles.group}
        data-active={isActive || undefined}
        data-open={isOpen || undefined}
      >
        <button
          ref={ref}
          className={styles.button}
          onClick={onClick}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.label}>{activeLabel ?? label}</span>
          <span className={styles.chevron}>
            <ChevronDownIcon size={16} />
          </span>
        </button>
        {isActive && onClear && (
          <button
            className={styles.clear}
            onClick={onClear}
            type="button"
            aria-label={`Clear ${label} filter`}
          >
            <CloseIcon size={14} />
          </button>
        )}
      </span>
    );
  },
);
