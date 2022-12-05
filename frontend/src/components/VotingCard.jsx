export default function VoteOption({
    song,
    // onClick,
    maxCharWidth = 50,
}){
    if(!song) return <p>No Song</p>

    const ellipsisStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        width: `${maxCharWidth}ch`
    }

    return (
        <div className="voting-card">
            <img src={song.album_art} style={{width: "15%", margin: 8}} />
            <div style={{padding: "0, 8"}}>
                <div className="songname">{song.title}</div>
                <div className="artistname">{song.artist}</div>
            </div>
            <div style={{visibility: "hidden"}}>8</div>
        </div>
    )
}
