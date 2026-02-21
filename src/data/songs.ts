import type { Song } from '@/types';

export const songs: Song[] = [
  { title: 'All Along the Watchtower', artist: 'Jimi Hendrix', genre: 'Rock' },
  { title: 'Bad Guy', artist: 'Billie Eilish', genre: 'Pop' },
  { title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Rock' },
  { title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Pop' },
  { title: 'Come Together', artist: 'The Beatles', genre: 'Rock' },
  { title: 'Dancing Queen', artist: 'ABBA', genre: 'Pop' },
  { title: 'DNA.', artist: 'Kendrick Lamar', genre: 'Hip-Hop' },
  { title: 'Don\'t Stop Me Now', artist: 'Queen', genre: 'Rock' },
  { title: 'Empire State of Mind', artist: 'Jay-Z', genre: 'Hip-Hop' },
  { title: 'Happier Than Ever', artist: 'Billie Eilish', genre: 'Pop' },
  { title: 'Hey Jude', artist: 'The Beatles', genre: 'Rock' },
  { title: 'Hotel California', artist: 'Eagles', genre: 'Rock' },
  { title: 'HUMBLE.', artist: 'Kendrick Lamar', genre: 'Hip-Hop' },
  { title: 'Imagine', artist: 'John Lennon', genre: 'Rock' },
  { title: 'In Da Club', artist: '50 Cent', genre: 'Hip-Hop' },
  { title: 'Juicy', artist: 'The Notorious B.I.G.', genre: 'Hip-Hop' },
  { title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop' },
  { title: 'Lose Yourself', artist: 'Eminem', genre: 'Hip-Hop' },
  { title: 'Mamma Mia', artist: 'ABBA', genre: 'Pop' },
  { title: 'Paint It Black', artist: 'The Rolling Stones', genre: 'Rock' },
  { title: 'Purple Haze', artist: 'Jimi Hendrix', genre: 'Rock' },
  { title: 'Shake It Off', artist: 'Taylor Swift', genre: 'Pop' },
  { title: 'Smells Like Teen Spirit', artist: 'Nirvana', genre: 'Rock' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', genre: 'Rock' },
  { title: 'Starboy', artist: 'The Weeknd', genre: 'Pop' },
  { title: 'Superstition', artist: 'Stevie Wonder', genre: 'R&B' },
  { title: 'Take On Me', artist: 'a-ha', genre: 'Pop' },
  { title: 'Thinking Out Loud', artist: 'Ed Sheeran', genre: 'Pop' },
  { title: 'Thriller', artist: 'Michael Jackson', genre: 'Pop' },
  { title: 'Watermelon Sugar', artist: 'Harry Styles', genre: 'Pop' },
  { title: 'Whole Lotta Love', artist: 'Led Zeppelin', genre: 'Rock' },
];

export function getUniqueArtists(data: Song[]): string[] {
  return [...new Set(data.map((s) => s.artist))].sort();
}

export function getUniqueGenres(data: Song[]): string[] {
  return [...new Set(data.map((s) => s.genre))].sort();
}
