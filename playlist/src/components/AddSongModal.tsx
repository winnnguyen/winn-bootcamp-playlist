import { PlaylistContext } from '@/context/PlaylistContext';
import React from 'react';
import { useContext, useState, useEffect } from 'react';

export default function AddSongModal({isOpen, onClose, pl} : any) {
    if (!isOpen) {
        return null;
    }

    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const { editPlaylist } = useContext(PlaylistContext)!;
    const [selectedSong, setSelectedSong] = useState(null);

    const searchTracks = async (term: string) => {
        const res = await fetch(`/api/spotify-search?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data.tracks.items);
      };

      useEffect(() => {
        const timeout = setTimeout(() => {
          if (searchInput.trim() !== '') {
            searchTracks(searchInput);
          }
        }, 400);
    
        return () => clearTimeout(timeout);
      }, [searchInput]);
    
    function handleSubmit(track : any) {
        const newSong : Song = {
            id: track.id,
            title: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            album: '',
            duration: ''
        }

        const replacementPlaylist : Playlist = {
            id: pl.id,
            title: pl.title,
            description: pl.description,
            songs: [...pl.songs, newSong]
        }
        editPlaylist(replacementPlaylist);
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
                <div className='flex justify-center items-center mb-5'>
                    <input
                        type="text"
                        placeholder="Search for tracks"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="border w-100 pl-5 h-13 bg-white text-black rounded-sm font-bold text-lg mt-10"
                    />
                </div>
                <div className='flex flex-col'>
                    {searchInput.trim() == '' ? (
                    <p></p>
                    ) : (
                        results.map((track: any) => (
                            <div className='flex justify-center items-center'>
                            <button className='cursor-pointer hover:text-black hover:bg-[white] duration-300 delay-50 mb-3 w-150 rounded-sm'
                                    onClick={() => setSelectedSong(track)}>
                                { selectedSong && track.id == selectedSong.id ? (
                                    <div key={track.id} className="flex bg-white h-20 w-150 items-center rounded-sm">
                                        { track.album?.images?.[0]?.url && (
                                        <img
                                            src={track.album.images[0].url}
                                            alt={track.name}
                                            className="w-15 h-15 rounded ml-2"
                                        />
                                        )}
                                        <div className='ml-4'>
                                            <p className="text-black font-medium">{track.name}</p>
                                            <p className="text-sm text-gray-800">
                                                {track.artists.map((artist: any) => artist.name).join(', ')}
                                            </p>
                                        </div> 
                                    </div> 
                                    ) : (
                                // Not Selected View
                                    <div key={track.id} className="flex border-b border-white h-20 w-150 items-center">
                                        {track.album?.images?.[0]?.url && (
                                        <img
                                            src={track.album.images[0].url}
                                            alt={track.name}
                                            className="w-15 h-15 rounded ml-2"
                                        />
                                        )}
                                        <div className='ml-4'>
                                            <p className="font-medium">{track.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {track.artists.map((artist: any) => artist.name).join(', ')}
                                            </p>
                                        </div>
                                    </div> 
                                    )}
                            </button>
                            </div>
                            ))
                        )}
                </div>
                <div className='flex justify-center items-center'>
                    <button type='submit'
                    className="flex mt-10 justify-center items-center m-3 bg-black h-15 w-27 rounded-md text-[#ddd5f3] text-1xl font-extrabold cursor-pointer hover:text-black hover:bg-[white] duration-300 delay-50"
                    onClick={() => handleSubmit(selectedSong)}>
                        Add
                    </button>
                </div>
        </div>
    </div>
    );
};
