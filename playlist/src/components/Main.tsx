import Link from 'next/link'

export default function Main() {
    return(
        <div className="flex justify-center items-center grow">
            <Link href='/playlists'>
                <button className="bg-black h-15 w-40 rounded-md font-bold text-[#ddd5f3] text-1xl cursor-pointer hover:text-black hover:bg-[white] duration-300 delay-50">Go To Playlists</button>
            </Link>
        </div>
    )
}