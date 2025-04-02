import React, { createContext, useEffect, useState } from 'react';
import { Playlist } from '@/types/playlist';

interface PlaylistContextType {
    playlists: Playlist[];
    setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
    addPlaylist: (p: Playlist) => void;
    editPlaylist: (p: Playlist) => void;
    deletePlaylist: (id: number) => void;
}

export const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider = ({ children }: any) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await fetch('/api/playlists');
                const data = await res.json();
                setPlaylists(data);
            } catch(e) {
                console.log('Failed to fetch playlist', e);
            }
        };
        fetchPlaylists();
    }, []);

    const addPlaylist = (p: Playlist) => setPlaylists(prev => [...prev, p]);
    const editPlaylist = (p: Playlist) => setPlaylists(prev => prev.map(pl => (pl.id === p.id ? p : pl)));
    const deletePlaylist = (id: number) => setPlaylists(prev => prev.filter(pl => pl.id !== id));

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists, addPlaylist, editPlaylist, deletePlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
};
