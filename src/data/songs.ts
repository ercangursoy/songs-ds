import type { Song } from '../types';

export const songs: Song[] = [
  { title: 'All Along the Watchtower', artist: 'Jimi Hendrix', genre: 'Rock' },
  { title: 'Bad Guy', artist: 'Billie Eilish', genre: 'Pop' },
  { title: 'Dancing Queen', artist: 'ABBA', genre: 'Pop' },
  { title: 'DNA.', artist: 'Kendrick Lamar', genre: 'Hip-Hop' },
  { title: 'Happier Than Ever', artist: 'Billie Eilish', genre: 'Pop' },
  { title: 'HUMBLE.', artist: 'Kendrick Lamar', genre: 'Hip-Hop' },
  { title: 'Mamma Mia', artist: 'ABBA', genre: 'Pop' },
  { title: 'Purple Haze', artist: 'Jimi Hendrix', genre: 'Rock' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', genre: 'Rock' },
  { title: 'Whole Lotta Love', artist: 'Led Zeppelin', genre: 'Rock' },
];

export function getUniqueArtists(data: Song[]): string[] {
  return [...new Set(data.map((s) => s.artist))].sort();
}

export function getUniqueGenres(data: Song[]): string[] {
  return [...new Set(data.map((s) => s.genre))].sort();
}
