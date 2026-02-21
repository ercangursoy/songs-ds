import { useState, useRef, useCallback, useMemo } from 'react';
import { FilterButton } from '../FilterButton/FilterButton';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { SearchIcon, CloseIcon } from '@/icons';
import { useDropdown } from '@/hooks';
import styles from './MultiSelectFilter.module.css';

export interface MultiSelectFilterProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  searchPlaceholder?: string;
}

export function MultiSelectFilter({
  label,
  options,
  value,
  onChange,
  searchPlaceholder = `Search ${label}s`,
}: MultiSelectFilterProps) {
  const [stagedSelection, setStagedSelection] = useState<string[]>(value);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setSearchQuery('');
    setStagedSelection(value);
  }, [value]);

  const { isOpen, isClosing, wrapperRef, open, close } = useDropdown({ onClose: resetState });

  const handleToggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      setStagedSelection(value);
      setSearchQuery('');
      open();
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [isOpen, value, close, open]);

  const handleCheckboxChange = useCallback((option: string, checked: boolean) => {
    setStagedSelection((prev) =>
      checked ? [...prev, option] : prev.filter((v) => v !== option),
    );
  }, []);

  const handleRemove = useCallback((option: string) => {
    setStagedSelection((prev) => prev.filter((v) => v !== option));
  }, []);

  const handleClearAll = useCallback(() => {
    setStagedSelection([]);
  }, []);

  const handleApply = useCallback(() => {
    onChange(stagedSelection);
    close();
  }, [onChange, stagedSelection, close]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const q = searchQuery.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [options, searchQuery]);

  const isActive = value.length > 0;
  const activeLabel = isActive ? `${label} (${value.length})` : undefined;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <FilterButton
        label={label}
        activeLabel={activeLabel}
        isActive={isActive}
        isOpen={isOpen}
        onClick={handleToggle}
      />

      {isOpen && (
        <div className={styles.dropdown} role="dialog" aria-label={`${label} filter`} data-closing={isClosing || undefined}>
          {/* Header: search (left) + selected count (right) */}
          <div className={styles.header}>
            <div className={styles.searchSection}>
              <span className={styles.searchIcon}>
                <SearchIcon size={20} />
              </span>
              <input
                ref={searchInputRef}
                className={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </div>
            <div className={styles.selectedHeader}>
              Selected ({stagedSelection.length})
            </div>
          </div>

          {/* Two-panel body */}
          <div className={styles.body}>
            {/* Left: options list with checkboxes */}
            <div className={styles.optionsPanel} role="listbox" aria-multiselectable="true">
              {filteredOptions.map((option) => {
                const checked = stagedSelection.includes(option);
                return (
                  <div
                    key={option}
                    className={styles.optionRow}
                    role="option"
                    aria-selected={checked}
                    onClick={() => handleCheckboxChange(option, !checked)}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={(c) => handleCheckboxChange(option, c)}
                      ariaLabel={option}
                    />
                    <span className={styles.optionLabel}>{option}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: selected items with remove buttons */}
            <div className={styles.selectedPanel}>
              {stagedSelection.map((item) => (
                <div key={item} className={styles.selectedItem}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item)}
                    type="button"
                    aria-label={`Remove ${item}`}
                  >
                    <CloseIcon size={16} />
                  </button>
                  <span className={styles.selectedItemLabel}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer with actions */}
          <div className={styles.footer}>
            <Button variant="secondary" onClick={handleClearAll}>
              Clear All
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
