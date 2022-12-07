import UpvoteDownvote from "./UpvoteDownvote"

export default function VoteOption({
    song,
    onClick,
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
        <div className="voting-card" onClick={onClick}>
            <img src={song.album_art} style={{width: "15%", margin: 8}} />
            <div style={{padding: "0, 8"}}>
                <div className="songname">{song.title}</div>
                <div className="artistname">{song.artist}</div>
            </div>
            <div className="votecount songname" style={{marginRight: "16px", marginLeft:"auto"}}>{song.vote_count}</div>
        </div>
    )
}
