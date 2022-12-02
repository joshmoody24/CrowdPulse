

export default function SongCard({
    song,
    onClick,
    percentFilled = 0.5,
    height = "5rem"
}){

    if(!song) return <p>No song</p>

    return (
        <div className="border-white border-curved" onClick={() => onClick ? onClick(song) : console.log("clicked", song)} style={{
            backgroundColor: "#33333399",
            cursor: "pointer"
        }}>
            <div className="flex" style={{maxHeight: height}}>
                <img src={song.album_art} style={{objectFit: "contain", aspectRatio: 1, width: height}} />
                <div className="flex gap" style={{position: "relative", zIndex: 1, width: '100%'}}>
                    <div className="flex align-items-center padded gap">
                        <div>
                            {song.title}
                        </div>
                        <div>
                            ({song.artist})
                        </div>
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