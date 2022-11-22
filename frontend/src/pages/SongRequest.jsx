import SongList from "../components/SongList"
import {useState} from "react"
import debounce from "lodash/debounce"

export default function SongRequest(){

    const [songId, setSongId] = useState(-1);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [loading, setLoading] = useState(false);
    const [requested, setRequested] = useState(false);

    async function requestSong(id){
        if(!songId) return;
        const response = await fetch('/api/requests', {
            method: "POST",
            body: JSON.stringify({
                song: selectedSong
            }),
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
        console.log(response);
        setRequested(true);
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
    
    function clear(){
        setSelectedSong(null);
        setSearchResults([]);
    }

    if(requested){
        return (
            <h1>Your Song {selectedSong.name} has been requested. Thank you!</h1> 
        )
    }

    return (
        <div style={{position:"relative"}}>
        <h1>Song Request Page</h1>
        <div style={{display:'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>

            {selectedSong && (
                <div>
                    <button onClick={clear}>X</button>&nbsp;
                    Selected Song: {selectedSong.name}&nbsp;
                </div>
            )}

            {!selectedSong && (
                <input type="text" onChange={(event) => handleChange(event.target.value)} />
            )}

            <button onClick={() => requestSong(songId)}>Request Song</button>
        </div>

        {searchResults.length > 0 && !selectedSong && (
            <SongList songs={searchResults} onSongSelect={(song) => setSelectedSong(song)} />
        )}
        </div>
    )
}