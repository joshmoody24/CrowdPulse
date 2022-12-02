import SongCard from "./SongCard"
import { formattedLength, key } from "../utils"

export default function SongDetails({
    song
}){
    if(!song) return <>Click a request to see details</>

    return (
        <div className="flex flex-column">
            <h2>{song.title}</h2>
            <h3 style={{opacity: "85%"}}>by {song.artist}</h3>
            <ul>
                <li>Duration: {formattedLength(song.length)}</li>
                <li>Key: {key(song.key)}</li>
                <li>Bpm: {song.bpm}</li>
                <li>Votes: {song.vote_count}</li>
            </ul>
            <h3>Recommendations</h3>
            <div className="flex flex-column gap">
            {song.Recommendations.map(r => (
                    <SongCard song={r} percentFilled={0} showDetails />
            ))}
            </div>
        </div>
    )
}