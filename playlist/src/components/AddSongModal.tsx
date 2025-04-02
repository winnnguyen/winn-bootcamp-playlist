import { PlaylistContext } from '@/context/PlaylistContext';
import React from 'react';
import { useContext } from 'react';

export default function AddSongModal({isOpen, onClose, pl} : any) {
    if (!isOpen) {
        return null;
    }
    const { editPlaylist } = useContext(PlaylistContext)!;
    function handleSubmit(event : any) {
        event.preventDefault()
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const newTitle = formData.get('title') as string;
        const newArtist = formData.get('artist') as string;
        const newAlbum = formData.get('album') as string;
        const newDuration = formData.get('duration') as string;
        const newSong : Song = {
            id: Date.now().toString(),
            title: newTitle,
            artist: newArtist,
            album: newAlbum,
            duration: newDuration
        }
        const replacementPlaylist : Playlist = {
            id: pl.id,
            title: pl.title,
            description: pl.description,
            songs: [...pl.songs, newSong]
        }
        editPlaylist(replacementPlaylist);
        formEl.reset();
        onClose();
    }

    return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center"
      onClick={onClose}
      >
        <div 
            className='bg-[#212121] h-180 w-200 rounded-md'
            onClick={(e) => e.stopPropagation()}
            >
            <form onSubmit={handleSubmit} className='m-10'>
                <div className='flex flex-col'>
                    <label htmlFor='title' className='text-xl font-bold mb-3'>Song Name:</label>
                    <input 
                    className='bg-black rounded-md pl-2 focus:outline-none focus:border-[white] text-white placeholder-gray-400 w-[max] h-15 text-xl mb-10'
                    type='text'
                    name='title'
                    required />
                    <label htmlFor='artist' className='text-xl font-bold mb-3'>By:</label>
                    <input 
                    className='bg-black rounded-md pl-2 focus:outline-none focus:border-[white] text-white placeholder-gray-400 w-[max] h-15 text-xl mb-10'
                    type='text'
                    name='artist'
                    required />
                    <label htmlFor='album' className='text-xl font-bold mb-3'>Album:</label>
                    <input 
                    className='bg-black rounded-md pl-2 focus:outline-none focus:border-[white] text-white placeholder-gray-400 w-[max] h-15 text-xl mb-10'
                    type='text'
                    name='album'
                    required />
                    <label htmlFor='duration' className='text-xl font-bold mb-3'>Duration:</label>
                    <input 
                    className='bg-black rounded-md pl-2 focus:outline-none focus:border-[white] text-white placeholder-gray-400 w-[max] h-15 text-xl mb-10'
                    type='text'
                    name='duration'
                    required />

                    <div className='flex justify-center items-center'>
                    <button type='submit'
                    className="flex justify-center items-center m-3 bg-black h-15 w-27 rounded-md text-[#ddd5f3] text-1xl font-extrabold cursor-pointer hover:text-black hover:bg-[white] duration-300 delay-50">
                        Add
                    </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};
