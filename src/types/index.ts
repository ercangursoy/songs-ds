export interface Song {
  title: string;
  artist: string;
  genre: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T = Record<string, string>> {
  key: keyof T & string;
  direction: SortDirection;
}

export interface Column<T = Record<string, string>> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  width?: string;
}
