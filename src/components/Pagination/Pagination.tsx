import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav className={styles.wrapper} aria-label="Pagination">
      <button
        className={styles.navButton}
        data-enabled={canGoPrev}
        onClick={() => canGoPrev && onPageChange(currentPage - 1)}
        type="button"
        aria-label="Previous page"
        disabled={!canGoPrev}
      >
        <ChevronLeftIcon size={20} />
      </button>
      <span className={styles.pageInfo}>
        {currentPage} of {totalPages}
      </span>
      <button
        className={styles.navButton}
        data-enabled={canGoNext}
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        type="button"
        aria-label="Next page"
        disabled={!canGoNext}
      >
        <ChevronRightIcon size={20} />
      </button>
    </nav>
  );
}
