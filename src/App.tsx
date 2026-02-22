import { useState, useMemo, useCallback } from "react";
import {
  SearchInput,
  MultiSelectFilter,
  SingleSelectFilter,
  DataTable,
  Pagination,
  DesignNotes,
} from "@/components";
import { songs, getUniqueArtists, getUniqueGenres } from "@/data/songs";
import type { Song, SortConfig, Column } from "@/types";
import styles from "./App.module.css";

const columns: Column<Song>[] = [
  { key: "title", label: "Title", sortable: true, width: "26%" },
  { key: "artist", label: "Artist", sortable: true, width: "29%" },
  { key: "genre", label: "Genre", sortable: false, width: "45%" },
];

const artistOptions = getUniqueArtists(songs);
const genreOptions = getUniqueGenres(songs);

const PAGE_SIZE = 10;

const getSongKey = (song: Song) => `${song.title}-${song.artist}`;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig<Song> | null>({
    key: "title",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [fixedHeight, setFixedHeight] = useState(false);

  const handleSort = useCallback((key: keyof Song) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleClearSearch = useCallback(() => handleSearch(""), [handleSearch]);

  const handleArtistChange = useCallback((value: string[]) => {
    setSelectedArtists(value);
    setCurrentPage(1);
  }, []);

  const handleGenreChange = useCallback((value: string | null) => {
    setSelectedGenre(value);
    setCurrentPage(1);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...songs];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(q) ||
          song.artist.toLowerCase().includes(q) ||
          song.genre.toLowerCase().includes(q),
      );
    }

    if (selectedArtists.length > 0) {
      result = result.filter((song) => selectedArtists.includes(song.artist));
    }

    if (selectedGenre) {
      result = result.filter((song) => song.genre === selectedGenre);
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key].toLowerCase();
        const bVal = b[sortConfig.key].toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchQuery, selectedArtists, selectedGenre, sortConfig]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSorted.length / PAGE_SIZE),
  );
  const safePage = Math.min(currentPage, totalPages);

  const pageData = filteredAndSorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Songs</h1>

      <div className={styles.toolbar}>
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search by title, artist or genre"
        />
        <MultiSelectFilter
          label="Artist"
          options={artistOptions}
          value={selectedArtists}
          onChange={handleArtistChange}
          searchPlaceholder="Search Artists"
        />
        <SingleSelectFilter
          label="Genre"
          options={genreOptions}
          value={selectedGenre}
          onChange={handleGenreChange}
        />

        <div className={styles.reviewerTools}>
          <DesignNotes>
            <div className={styles.heightControl}>
              <div className={styles.heightLabel}>Table height</div>
              <button
                className={styles.heightToggle}
                role="switch"
                aria-checked={fixedHeight}
                onClick={() => setFixedHeight((v) => !v)}
                type="button"
              >
                <span className={styles.heightToggleThumb} />
                <span className={styles.heightToggleLabel}>
                  {fixedHeight ? "Fixed" : "Dynamic"}
                </span>
              </button>
              <span className={styles.heightDesc}>
                {fixedHeight
                  ? "Prevents layout shift on paginate"
                  : "Shrinks to fit content (Figma spec)"}
              </span>
            </div>
          </DesignNotes>
        </div>
      </div>

      <div
        className={styles.tableCard}
        data-fixed-height={fixedHeight || undefined}
      >
        {filteredAndSorted.length > 0 ? (
          <>
            <div className={styles.tableWrapper}>
              <DataTable
                data={pageData}
                columns={columns}
                sortConfig={sortConfig}
                onSort={handleSort}
                rowKey={getSongKey}
              />
            </div>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateTitle}>No songs found</div>
            <div className={styles.emptyStateHint}>
              Try adjusting your search or filters to see results
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
