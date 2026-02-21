import { SearchIcon, CloseIcon } from '@/icons';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
}: SearchInputProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.searchIcon}>
        <SearchIcon size={20} />
      </span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button
        className={styles.clearButton}
        onClick={onClear}
        type="button"
        aria-label="Clear search"
        data-visible={!!value || undefined}
      >
        <CloseIcon size={24} />
      </button>
    </div>
  );
}
