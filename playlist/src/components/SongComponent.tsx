import {Song} from '@/types/playlist'

export function SongComponent(song: Song) {
    return (
        <div className="flex justify-center items-center flex-col m-3 bg-black h-40 w-150 rounded-md text-[#ddd5f3] text-1xl">
            <h2 className="text-2xl font-bold m-1">{song.title}</h2>
            <h2 className="text-xl">{song.artist}</h2>
            <h2 className="text-md">{song.album}</h2>
            <h2 className="text-md">{song.duration}</h2>
        </div>
    );
}