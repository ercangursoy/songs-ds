import { useState, useRef, useCallback, useMemo } from "react";
import { FilterButton } from "../FilterButton/FilterButton";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { SearchIcon, CloseIcon } from "@/icons";
import { useDropdown, useFocusTrap } from "@/hooks";
import styles from "./MultiSelectFilter.module.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setSearchQuery("");
    setStagedSelection(value);
    setFocusedIndex(-1);
  }, [value]);

  const { isOpen, isClosing, wrapperRef, triggerRef, open, close } =
    useDropdown({ onClose: resetState });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dropdownRef, isOpen && !isClosing);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const q = searchQuery.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [options, searchQuery]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      setStagedSelection(value);
      setSearchQuery("");
      setFocusedIndex(-1);
      open();
    }
  }, [isOpen, value, close, open]);

  const handleCheckboxChange = useCallback(
    (option: string, checked: boolean) => {
      setStagedSelection((prev) =>
        checked ? [...prev, option] : prev.filter((v) => v !== option),
      );
    },
    [],
  );

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

  const handleClearFilter = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const len = filteredOptions.length;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((i) => (i < len - 1 ? i + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((i) => (i > 0 ? i - 1 : len - 1));
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(len - 1);
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < len) {
            const opt = filteredOptions[focusedIndex];
            const checked = stagedSelection.includes(opt);
            handleCheckboxChange(opt, !checked);
          }
          break;
      }
    },
    [filteredOptions, focusedIndex, stagedSelection, handleCheckboxChange],
  );

  const isActive = value.length > 0;
  const activeLabel = isActive ? `${label} (${value.length})` : undefined;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <FilterButton
        ref={triggerRef}
        label={label}
        activeLabel={activeLabel}
        isActive={isActive}
        isOpen={isOpen}
        onClick={handleToggle}
        onClear={handleClearFilter}
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          role="dialog"
          aria-label={`${label} filter`}
          data-closing={isClosing || undefined}
        >
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(-1);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-activedescendant={
                  focusedIndex >= 0 ? `${label}-opt-${focusedIndex}` : undefined
                }
              />
            </div>
            <div className={styles.selectedHeader}>
              Selected ({stagedSelection.length})
            </div>
          </div>

          <div className={styles.body}>
            <div
              className={styles.optionsPanel}
              role="listbox"
              aria-multiselectable="true"
            >
              {filteredOptions.map((option, i) => {
                const checked = stagedSelection.includes(option);
                return (
                  <div
                    key={option}
                    id={`${label}-opt-${i}`}
                    className={styles.optionRow}
                    role="option"
                    aria-selected={checked}
                    data-focused={i === focusedIndex || undefined}
                    onClick={() => handleCheckboxChange(option, !checked)}
                    onMouseEnter={() => setFocusedIndex(i)}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={() => {}}
                      ariaLabel={option}
                    />
                    <span className={styles.optionLabel}>{option}</span>
                  </div>
                );
              })}
            </div>

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
