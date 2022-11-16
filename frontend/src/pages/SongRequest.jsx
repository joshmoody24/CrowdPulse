import SongList from "../components/SongList"
import {useState} from "react"

export default function SongRequest(){

    const [songId, setSongId] = useState(-1);

    async function requestSong(id){
        if(!songId) return;
        const response = await fetch('/requests', {
            method: "POST",
            body: JSON.stringify({songId}),
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
    }

    return (
        <>
        <h1>Song Request Page</h1>
        <input type="text" onChange={console.log("TODO: debounce to search endpoint")} />
        {/* TODO: search list goes here */}
        <button onClick={() => requestSong(songId)}>Request Song</button>
        
        <SongList />
        </>
    )
}