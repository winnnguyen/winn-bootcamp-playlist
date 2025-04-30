import { PlaylistComponent } from '@/components/PlaylistComponent';
import Link from 'next/link';
import { useState, useContext } from 'react';
import AddPlaylistModal from '@/components/AddPlaylistModal';
import EditPlaylistModal from '@/components/EditPlaylistModal';
import { PlaylistContext } from '@/context/PlaylistContext';
import { Playlist } from '@/types/playlist';

export default function Home() {
    const {playlists, setPlaylists} = useContext(PlaylistContext)!;

    if (!playlists) return <div>Loading...</div>; // <-handles the first empty render

    const playlistEl = playlists.map((el) => 
            <div className='flex flex-row justify-center items-center'>
            <button onClick={() => deletePlaylist(el)} className='cursor-pointer mr-10 font-extrabold text-2xl'>x</button>
            <Link href={`/playlists/${el.id.toString()}`}>
                <PlaylistComponent 
                    id = {el.id}
                    title = {el.title}
                    description = {el.description}
                    songs = {el.songs}
                />
            </Link>
            <button 
                className="flex justify-center items-center ml-5 w-10 h-10 rounded-full cursor-pointer"
                onClick={() => {
                    setOpenEditPlaylist((prevOpen) => !prevOpen)
                    setSelectedPlaylistEdit(el)
                    }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                    >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313 3 21l1.687-4.5L16.862 3.487z"
                    />
                </svg>
            </button>
        </div>
    )
    function deletePlaylist(p : Playlist ) {
        setPlaylists((prev) => prev.filter((playlist) => playlist.id !== p.id));
    }

    const [selectedPlaylistEdit, setSelectedPlaylistEdit] = useState<Playlist | null>(null);
    const [isOpenAddPlaylist, setOpenAddPlaylist] = useState<boolean>(false);
    const [isOpenEditPlaylist, setOpenEditPlaylist] = useState<boolean>(false);
    return(
        <div>
            <div className='flex items-center bg-black outline-solid p-5 h-30'>
                <h1 className='text-5xl font-bold m-9 text-[#ddd5f3]'>Winn's Playlists</h1>
            </div>
            <div className='flex mt-10 items-center flex-col h-screen'>
                {playlistEl}
            </div>
                <AddPlaylistModal isOpen={isOpenAddPlaylist} onClose={() => setOpenAddPlaylist(false)}/>
                <EditPlaylistModal isOpen={isOpenEditPlaylist} onClose={() => setOpenEditPlaylist(false)} currPlaylist={selectedPlaylistEdit}/>
            <button 
                className="fixed bottom-10 right-10 w-17 h-17 rounded-full bg-black text-white text-3xl shadow-lg hover:bg-[white] hover:text-black duration-300 delay-50"
                onClick={() => setOpenAddPlaylist((prevOpen) => !prevOpen)}>
                +
            </button>
        </div>
    );
}