import SongList from "../components/SongList"
import {useState} from "react"
import debounce from "lodash/debounce"

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

    async function searchSongs(text){
        console.log("Searching for songs that include: " + text + " (not implemented)");
    }

    const handleChange = debounce(text => searchSongs(text), 1000)

    return (
        <>
        <h1>Song Request Page</h1>
        <input type="text" onChange={(event) => handleChange(event.target.value)} />
        {/* TODO: search list goes here */}
        <button onClick={() => requestSong(songId)}>Request Song</button>
        
        <SongList />
        </>
    )
}