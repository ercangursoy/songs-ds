export interface Song {
  title: string;
  artist: string;
  genre: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof Song;
  direction: SortDirection;
}

export interface Column {
  key: keyof Song;
  label: string;
  sortable?: boolean;
  width?: string;
}
