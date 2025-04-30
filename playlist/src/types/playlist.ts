
// Define a Song interface
export interface Song {
    id: String;
    title: string;
    artist: string;
    album: string;
    duration: string; // in seconds
  }
  
  // Define a Playlist interface that includes an array of Song objects
export interface Playlist {
    id: String;
    title: string;
    description: string;
    songs: Song[] | null;
  }

  
  