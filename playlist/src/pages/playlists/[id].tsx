import { useRouter } from 'next/router'
import {playlist} from '../../data/example_data'
import { SongComponent } from '@/components/SongComponent';

export default function Playlist() {
    const router = useRouter();
    const { id } = router.query;
    const currPlaylist = playlist.find((p: any) => p.id == id);
    const songsList = currPlaylist.songs.map((song: Song) => 
        <SongComponent
            id = {song.id}
            title = {song.title}
            artist = {song.artist}
            duration = {song.duration}
            album = {song.album}
        />
        )
    return(
        <div>
            <div className='bg-black outline-solid p-5'>
                <h1 className='text-6xl font-bold mb-2 text-[#ddd5f3]'>{currPlaylist.title}</h1>
                <h1 className='text-2xl'>"{currPlaylist.description}"</h1>
            </div>
            <h1>{currPlaylist.songs.title}</h1>
            <div className='flex justify-center items-center flex-col mt-10'>
                {songsList}
            </div>
        </div>
    );
}