import {playlist} from '../../data/example_data'
import { PlaylistComponent } from '@/components/PlaylistComponent';

export default function Home() {
    const playlistEl = playlist.map((el) => 
        <PlaylistComponent 
            id = {el.id}
            name = {el.title}
            description = {el.description}
            songs = {el.songs}
        />
    )
    return(
        <div className='flex justify-center items-center flex-col h-screen'>
            {playlistEl}
        </div>
    );
}