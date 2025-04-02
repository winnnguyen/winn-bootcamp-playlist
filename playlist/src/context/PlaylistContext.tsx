import React, { createContext, useContext, useState } from 'react';
import { playlist as initialData } from '../data/example_data';
import { Playlist } from '@/types/playlist';

type PlaylistContextType = {
    playlists: Playlist[];
    setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
};

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const usePlaylist = () => {
    const ctx = useContext(PlaylistContext);
    if (!ctx) throw new Error("usePlaylist must be used inside PlaylistProvider");
    return ctx;
};

export const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>(initialData);

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists }}>
            {children}
        </PlaylistContext.Provider>
    );
};
