

export default function SongCard({
    song,
    onClick,
    percentFilled = 0,
}){
    if(!song) return <p>No song</p>
    return (
        <div className="border-white border-curved padded" style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: "#33333399"
        }}>
            <div className="flex gap">
                <div>
                    {song.title}
                </div>
                <div>
                    {song.artist}
                </div>
            </div>

            {/* dynamic background color based on votes */}
            <div className="bg-orange" style={{
                position: 'absolute',
                width: `${percentFilled}%`,
                height: '100%',
                left: 0,
                top: 0,
                zIndex: -1
            }} />
        </div>
    )
}