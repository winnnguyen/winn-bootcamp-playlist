import {playlist} from '../../data/example_data'
import { PlaylistComponent } from '@/components/PlaylistComponent';
import Link from 'next/link'

export default function Home() {
    const playlistEl = playlist.map((el) =>
        <Link href={`/playlists/${el.id}`}>
            <PlaylistComponent 
                id = {el.id}
                name = {el.title}
                description = {el.description}
                songs = {el.songs}
            />
        </Link>
    )
    return(
        <div>
            <div className='flex items-center bg-black outline-solid p-5 h-30'>
                <h1 className='text-5xl font-bold m-9 text-[#ddd5f3]'>Winn's Playlists</h1>
            </div>
            <div className='flex mt-10 items-center flex-col h-screen'>
                {playlistEl}
            </div>
        </div>
    );
}