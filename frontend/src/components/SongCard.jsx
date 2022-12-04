import { formattedLength, key } from "../utils"

export default function SongCard({
    song,
    onClick,
    percentFilled = 0.5,
    height = "5rem",
    maxCharWidth = 50,
    showDetails = false,
}){

    if(!song) return <p>No song</p>

    const ellipsisStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        width: `${maxCharWidth}ch`
    }

    return (
        <div className={`border-white border-curved ${onClick ? 'hover-grow' : ''}`} onClick={() => {
            if(onClick) onClick(song)
        }} style={{
            backgroundColor: "#33333399",
            cursor: onClick ? "pointer" : "default"
        }}>
            <div className="flex" style={{maxHeight: height}}>
                <img src={song.album_art} style={{objectFit: "contain", aspectRatio: 1, width: height}} />
                <div className="flex gap" style={{position: "relative", zIndex: 1, width: '100%'}}>
                    <div className="flex align-items-center justify-content-center text-center gap-small padded-small flex-column m-auto">
                        {/* truncates text with ellipsis */}
                        <div style={ellipsisStyle} className="bold">
                            {song.title} ({song.artist})
                        </div>
                        {showDetails && (
                            <div style={{justifyContent: 'space-evenly', display: 'flex', width: '100%'}}>
                                <div>Duration: {formattedLength(song.length)}</div>
                                <div>Key: {key(song.key)}</div>
                                <div>BPM: {song.bpm}</div>
                            </div>
                        )}
                    </div>


                    {/* dynamic background color based on votes */}
                    <div className="bg-orange" style={{
                        position: 'absolute',
                        width: `${percentFilled * 100}%`,
                        height: '100%',
                        left: 0,
                        top: 0,
                        zIndex: -1
                    }} />
                </div>
            </div>
        </div>
    )
}