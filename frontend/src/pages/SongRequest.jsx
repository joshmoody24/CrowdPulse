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
        if(!id) return;
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
        <div className="container">
            <div className="row text-center">
                <h1><b>Request a Song for the DJ to Play!</b></h1>
                <h3>Powered by Spotify</h3>
            </div>
            <div className="row">
                <div className="col-7 text-center">
                    {selectedSong && (
                    <div className="row">
                        <div className="col-3">
                            <button onClick={clear} className="rounded-3 h-100 w-100" style = {{backgroundColor: "#ff683c"}}>X</button>&nbsp;
                        </div>
                        <div className="col">
                            <div className="mt-2">Selected Song: {selectedSong.name}</div>
                        </div>
                    </div>
                    )}

                    {!selectedSong && (
                        <input type="text" placeholder="Request a Song" className="rounded-3 p-3 w-50 w-100" style = {{maxWidth: "700px"}} onChange={(event) => handleChange(event.target.value)} />
                     )}
                </div>
                <div className="col-5 text-center">
                    <button className="rounded-3 text-white p-3 w-100" style = {{backgroundColor: "#ff683c", maxWidth: "400px"}} onClick={() => requestSong(songId)}><b>Submit</b></button>
                </div>
            </div>
            <div className="row text-center">
                <div className="col text-center">
                {searchResults.length > 0 && !selectedSong && (
                    <SongList songs={searchResults} onSongSelect={(song) => setSelectedSong(song)} />
                )}
                </div>
            </div>
        </div>
    )
}