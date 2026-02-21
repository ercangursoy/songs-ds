import { SortArrowIcon } from '@/icons';
import type { Song, SortConfig, Column } from '@/types';
import styles from './DataTable.module.css';

export interface DataTableProps {
  data: Song[];
  columns: Column[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof Song) => void;
}

export function DataTable({ data, columns, sortConfig, onSort }: DataTableProps) {
  return (
    <table className={styles.table}>
      <colgroup>
        {columns.map((col) => (
          <col key={col.key} style={col.width ? { width: col.width } : undefined} />
        ))}
      </colgroup>
      <thead>
        <tr className={styles.headerRow}>
          {columns.map((col) => (
            <th
              key={col.key}
              className={col.sortable ? styles.headerCellSortable : styles.headerCell}
              onClick={col.sortable ? () => onSort(col.key) : undefined}
              aria-sort={
                sortConfig?.key === col.key
                  ? sortConfig.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
            >
              <span className={styles.headerContent}>
                {col.label}
                {col.sortable && (
                  <span
                    className={styles.sortIcon}
                    data-active={sortConfig?.key === col.key || undefined}
                  >
                    <SortArrowIcon
                      size={20}
                      direction={
                        sortConfig?.key === col.key
                          ? sortConfig.direction === 'asc'
                            ? 'desc'
                            : 'asc'
                          : 'desc'
                      }
                    />
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={`${row.title}-${i}`} className={styles.bodyRow}>
            {columns.map((col) => (
              <td key={col.key} className={styles.bodyCell}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
