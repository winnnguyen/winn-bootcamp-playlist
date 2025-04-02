import React from 'react';
import { useContext, useState } from 'react'
import { PlaylistContext } from '@/context/PlaylistContext';

export default function EditPlaylistModal({isOpen, onClose, currPlaylist} : any) {
    if (!isOpen || !currPlaylist) return null;

    const context = useContext(PlaylistContext);
    if (!context) return null;

    const { editPlaylist } = context;

    function handleSubmit(event : any) {
        event.preventDefault()
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const newTitle = (formData.get('title') as string) || "";
        const newDescription = (formData.get('description') as string) || "";
        const updatedPlaylist = { ...currPlaylist, title: newTitle, description: newDescription };
        editPlaylist(updatedPlaylist);
        formEl.reset();
        onClose();
    }

    return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center"
      onClick={onClose}
      >
        <div 
            className='bg-[#212121] h-170 w-200 rounded-md'
            onClick={(e) => e.stopPropagation()}
            >
            <form onSubmit={handleSubmit} className='m-10'>
                <div className='flex flex-col'>
                    <input 
                    className='bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-[white] text-white placeholder-gray-400 w-[max] h-20 text-5xl font-extrabold mb-13'
                    type='text'
                    defaultValue={currPlaylist.title}
                    name='title'
                    required />

                    <label className='mb-5 font-extrabold text-[20px]' htmlFor='description'>Enter a short description</label>
                    <textarea 
                    className='resize-none bg-black/60 h-50 text-xl mb-25 p-1 rounded-md shadow-2xl'
                    defaultValue={currPlaylist.description}
                    maxLength={75}
                    name='description' 
                    required />
                    <div className='flex justify-center items-center'>
                    <button type='submit'
                    className="flex justify-center items-center m-3 bg-black h-15 w-35 rounded-md text-[#ddd5f3] text-1xl font-extrabold cursor-pointer hover:text-black hover:bg-[white] duration-300 delay-50">
                        Save Changes
                    </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};
