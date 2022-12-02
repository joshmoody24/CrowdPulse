export default function SongDetails({
    song
}){
    if(!song) return <>Click a request to see details</>

    // convert song milliseconds to "m:ss"
    function formattedLength(ms){
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60)
        const remainingSeconds = Math.round(totalSeconds % 60);
        // pad with zero if necessary
        const formattedSeconds = (remainingSeconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        return `${minutes}:${formattedSeconds}`
    }

    function key(keyNum){
        // not a music theory guy. I know for sure 0 = C, I guessed on the rest
        if(keyNum < 0 || keyNum > 11) return "Unknown"
        const keys = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
        return keys[keyNum];
    }

    return (
        <div className="flex flex-column">
            <h2>Song Details</h2>
            <ul>
                <li>Title: {song.title}</li>
                <li>Artist: {song.artist}</li>
                <li>Length: {formattedLength(song.length)}</li>
                <li>Key: {key(song.key)}</li>
                <li>Bpm: {song.bpm}</li>
                <li>Votes: {song.vote_count}</li>
            </ul>
            <h3>Recommendations (work in progress)</h3>
            <ul>
            {song.Recommendations.map(r => (
                    <li key={r.recommendation_id}>Title: {r.title}</li>
            ))}
            </ul>
        </div>
    )
}