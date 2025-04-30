import { useRouter } from 'next/router'
import { SongComponent } from '@/components/SongComponent';
import { useState, useEffect } from 'react';
import AddSongModal from '@/components/AddSongModal';
import { useContext } from 'react';
import { PlaylistContext } from '@/context/PlaylistContext';
import { Song, Playlist } from '@/types/playlist';

export default function Playlists() {
    const { playlists, setPlaylists } = useContext(PlaylistContext)!;
    const router = useRouter();
    const { id } = router.query;
    const currPlaylist = playlists.find((p: Playlist) => p.id === id);
    if (!currPlaylist) {
        return <div>Loading...</div>;
    }
    const songsList = currPlaylist.songs!.map((song: Song) => 
        <div className='flex flex-row justify-center items-center'>
        <button className='cursor-pointer mr-10 font-extrabold text-2xl' onClick={() => deleteSong(song)}>x</button>
        <SongComponent
            id = {song.id}
            title = {song.title}
            artist = {song.artist}
            duration = {song.duration}
            album = {song.album}
        />
        </div>
    );
    function deleteSong(s: Song) {
        setPlaylists(prev => 
            prev.map(p => 
                p.id === currPlaylist!.id 
                    ? { ...p, songs: p.songs!.filter((song:Song) => song.id !== s.id) } 
                    : p
            )
        );
    };

    const [openAddSong, setOpenAddSong] = useState(false);

    return(
        <div>
            <div className='bg-black outline-solid p-5'>
                <h1 className='text-6xl font-bold mb-2 text-[#ddd5f3]'>{currPlaylist.title}</h1>
                <h1 className='text-2xl'>"{currPlaylist.description}"</h1>
            </div>
            <div className='flex justify-center items-center flex-col mt-10'>
                {songsList}
            </div>
            <AddSongModal p={currPlaylist} isOpen={openAddSong} onClose={() => setOpenAddSong(false)} pl={currPlaylist}/>
            <button 
                className="fixed bottom-10 right-10 w-17 h-17 rounded-full bg-black text-white text-3xl shadow-lg hover:bg-[white] hover:text-black duration-300 delay-50"
                onClick={() => setOpenAddSong((prevOpen) => !prevOpen)}>
                +
            </button>
        </div>
    );
}