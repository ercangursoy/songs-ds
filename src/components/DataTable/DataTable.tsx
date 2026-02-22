import { type KeyboardEvent } from "react";
import { SortArrowIcon } from "@/icons";
import type { SortConfig, Column } from "@/types";
import styles from "./DataTable.module.css";

export interface DataTableProps<T extends { [K in keyof T]: string }> {
  data: T[];
  columns: Column<T>[];
  sortConfig: SortConfig<T> | null;
  onSort: (key: keyof T & string) => void;
  rowKey: (row: T, index: number) => string;
}

export function DataTable<T extends { [K in keyof T]: string }>({
  data,
  columns,
  sortConfig,
  onSort,
  rowKey,
}: DataTableProps<T>) {
  const sortToken = sortConfig
    ? `${sortConfig.key}-${sortConfig.direction}`
    : "none";

  function handleHeaderKeyDown(key: keyof T & string) {
    return (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSort(key);
      }
    };
  }

  return (
    <table className={styles.table}>
      <colgroup>
        {columns.map((col) => (
          <col
            key={col.key}
            style={col.width ? { width: col.width } : undefined}
          />
        ))}
      </colgroup>
      <thead>
        <tr className={styles.headerRow}>
          {columns.map((col) => (
            <th
              key={col.key}
              className={
                col.sortable ? styles.headerCellSortable : styles.headerCell
              }
              onClick={col.sortable ? () => onSort(col.key) : undefined}
              onKeyDown={
                col.sortable ? handleHeaderKeyDown(col.key) : undefined
              }
              tabIndex={col.sortable ? 0 : undefined}
              aria-sort={
                sortConfig?.key === col.key
                  ? sortConfig.direction === "asc"
                    ? "ascending"
                    : "descending"
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
                          ? sortConfig.direction === "asc"
                            ? "desc"
                            : "asc"
                          : "desc"
                      }
                    />
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody key={sortToken}>
        {data.map((row, i) => (
          <tr key={rowKey(row, i)} className={styles.bodyRow}>
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
