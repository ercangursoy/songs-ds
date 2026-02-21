import { useState, useMemo, useCallback } from 'react';
import {
  SearchInput,
  MultiSelectFilter,
  SingleSelectFilter,
  DataTable,
  Pagination,
  DesignNotes,
} from '@/components';
import { songs, getUniqueArtists, getUniqueGenres } from '@/data/songs';
import type { Song, SortConfig, Column } from '@/types';
import styles from './App.module.css';

const columns: Column[] = [
  { key: 'title', label: 'Title', sortable: true, width: '26%' },
  { key: 'artist', label: 'Artist', sortable: true, width: '29%' },
  { key: 'genre', label: 'Genre', sortable: false, width: '45%' },
];

const artistOptions = getUniqueArtists(songs);
const genreOptions = getUniqueGenres(songs);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    key: 'title',
    direction: 'asc',
  });

  const handleSort = useCallback(
    (key: keyof Song) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
        }
        return { key, direction: 'asc' };
      });
    },
    [],
  );

  const filteredAndSorted = useMemo(() => {
    let result = [...songs];

    // Search filter: match across title, artist, genre
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(q) ||
          song.artist.toLowerCase().includes(q) ||
          song.genre.toLowerCase().includes(q),
      );
    }

    // Multi-select artist filter
    if (selectedArtists.length > 0) {
      result = result.filter((song) => selectedArtists.includes(song.artist));
    }

    // Single-select genre filter
    if (selectedGenre) {
      result = result.filter((song) => song.genre === selectedGenre);
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key].toLowerCase();
        const bVal = b[sortConfig.key].toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchQuery, selectedArtists, selectedGenre, sortConfig]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Songs</h1>

      <div className={styles.toolbar}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search by title, artist or genre"
        />
        <MultiSelectFilter
          label="Artist"
          options={artistOptions}
          value={selectedArtists}
          onChange={setSelectedArtists}
          searchPlaceholder="Search Artists"
        />
        <SingleSelectFilter
          label="Genre"
          options={genreOptions}
          value={selectedGenre}
          onChange={setSelectedGenre}
        />
      </div>

      <div className={styles.tableCard}>
        {filteredAndSorted.length > 0 ? (
          <>
            <DataTable
              data={filteredAndSorted}
              columns={columns}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <Pagination
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
            />
          </>
        ) : (
          <div className={styles.emptyState}>No songs match the current filters.</div>
        )}
      </div>
      <DesignNotes />
    </div>
  );
}
