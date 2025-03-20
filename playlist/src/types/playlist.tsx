
// Define a Song interface
interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number; // in seconds
  }
  
  // Define a Playlist interface that includes an array of Song objects
  interface Playlist {
    id: string;
    name: string;
    description: string;
    songs: Song[];
  }

  
  