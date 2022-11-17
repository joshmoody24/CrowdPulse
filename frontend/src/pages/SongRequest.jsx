import SongList from "../components/SongList"
import {useState} from "react"
import debounce from "lodash/debounce"

export default function SongRequest(){

    const [songId, setSongId] = useState(-1);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    async function requestSong(id){
        if(!songId) return;
        const response = await fetch('/requests', {
            method: "POST",
            body: JSON.stringify({songId}),
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
    }

    async function searchSongs(text){
        if(!text){
            setSearchResults([])
            return
        }
        const response = await fetch(`/api/search/${text}`)
        const songs = await response.json()
        console.log(songs)
        setSearchResults(songs)
    }

    const handleChange = debounce(text => searchSongs(text), 500)

    return (
        <>
        <h1>Song Request Page</h1>
        <input type="text" onChange={(event) => handleChange(event.target.value)} />
        {/* TODO: search list goes here */}
        <button onClick={() => requestSong(songId)}>Request Song</button>

        Search Results
        {searchResults.length > 0 && (
            <>
            {searchResults.map(r => (
                <button key={r}>{r}</button>
            ))}
            </>
        )}
        </>
    )
}