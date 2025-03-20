export function PlaylistComponent(playlist: Playlist) {
    return (
            <div className="flex justify-center items-center flex-col m-3 bg-black h-40 w-150 rounded-md text-[#ddd5f3] text-1xl cursor-pointer hover:text-black hover:bg-[white] duration-300 delay-50">
                <h2 className="text-xl font-bold m-4">{playlist.name}</h2>
                <h2 className="text-md">"{playlist.description}"</h2>
            </div>
    );
}