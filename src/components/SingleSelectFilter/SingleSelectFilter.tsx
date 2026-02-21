import { useCallback } from 'react';
import { FilterButton } from '../FilterButton/FilterButton';
import { useDropdown } from '@/hooks';
import styles from './SingleSelectFilter.module.css';

export interface SingleSelectFilterProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (selected: string | null) => void;
}

export function SingleSelectFilter({
  label,
  options,
  value,
  onChange,
}: SingleSelectFilterProps) {
  const { isOpen, isClosing, wrapperRef, toggle, close } = useDropdown();

  const handleSelect = useCallback(
    (option: string) => {
      const next = option === value ? null : option;
      onChange(next);
      close();
    },
    [onChange, value, close],
  );

  const isActive = value !== null;
  const activeLabel = isActive ? (
    <>
      <span className={styles.activeLabelName}>{label}: </span>
      <span className={styles.activeLabelValue}>{value}</span>
    </>
  ) : undefined;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <FilterButton
        label={label}
        activeLabel={activeLabel}
        isActive={isActive}
        isOpen={isOpen}
        onClick={toggle}
      />

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label={`${label} filter`} data-closing={isClosing || undefined}>
          {options.map((option) => (
            <button
              key={option}
              className={styles.option}
              role="option"
              aria-selected={option === value}
              data-selected={option === value}
              onClick={() => handleSelect(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
