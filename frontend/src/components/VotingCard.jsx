import UpvoteDownvote from "./UpvoteDownvote"
import { useState } from "react"

export default function VoteOption({
    song,
    onUpvote,
    onDownvote,
    maxCharWidth = 50,
}){    
    const votecheck = `voted-${song.request_id}`;
    const [checked, setChecked] = useState(localStorage.getItem(votecheck));
    if(!song) return <p>No Song</p>
    const ellipsisStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        width: `${maxCharWidth}ch`
    }

    function handleClick(){
        if(!localStorage.getItem(votecheck)){
            localStorage.setItem(votecheck, 'True');
            setChecked(true);
            onUpvote();
        }
        else{
            localStorage.removeItem(votecheck);
            setChecked(false);
            onDownvote();
        }        
    }

    return (
        <div className={localStorage.getItem(votecheck) ? "voting-card bg-orange" :"voting-card" } onClick={handleClick} style={{cursor: "pointer"}}>
            <img src={song.album_art} style={{width: "15%", margin: 8}} />
            <div style={{padding: "0, 8"}}>
                <div className="songname">{song.title}</div>
                <div className="artistname">{song.artist}</div>
            </div>
            <div style={{marginRight:16, marginLeft:"auto"}} className="text-center">
                <div className="votecount songname" style={{marginLeft:"auto"}}>{song.vote_count}</div>
                <div>Votes</div>
            </div>
        </div>
    )
}
