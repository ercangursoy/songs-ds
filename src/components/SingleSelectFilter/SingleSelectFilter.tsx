import { useState, useCallback } from "react";
import { FilterButton } from "../FilterButton/FilterButton";
import { useDropdown } from "@/hooks";
import styles from "./SingleSelectFilter.module.css";

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
  const { isOpen, isClosing, wrapperRef, triggerRef, toggle, close } =
    useDropdown();
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      const idx = value ? options.indexOf(value) : 0;
      setFocusedIndex(idx >= 0 ? idx : 0);
    }
    toggle();
  }, [isOpen, value, options, toggle]);

  const handleSelect = useCallback(
    (option: string) => {
      const next = option === value ? null : option;
      onChange(next);
      close();
    },
    [onChange, value, close],
  );

  const handleClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(options.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            handleSelect(options[focusedIndex]);
          }
          break;
      }
    },
    [options, focusedIndex, handleSelect],
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
        ref={triggerRef}
        label={label}
        activeLabel={activeLabel}
        isActive={isActive}
        isOpen={isOpen}
        onClick={handleToggle}
        onClear={handleClear}
      />

      {isOpen && (
        <div
          className={styles.dropdown}
          role="listbox"
          aria-label={`${label} filter`}
          aria-activedescendant={
            focusedIndex >= 0 ? `${label}-opt-${focusedIndex}` : undefined
          }
          data-closing={isClosing || undefined}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {options.map((option, i) => (
            <button
              key={option}
              id={`${label}-opt-${i}`}
              className={styles.option}
              role="option"
              aria-selected={option === value}
              data-selected={option === value || undefined}
              data-focused={i === focusedIndex || undefined}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setFocusedIndex(i)}
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
