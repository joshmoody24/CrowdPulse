import react, {useEffect, useState} from "react";

export default function SongList(){

    // store the songs as state
    const [songs, setSongs] = useState([]);

    // load data from the api on component load
    // the empty array at the end means "only run this function when the component loads, never again"
    useEffect(() => {
        async function loadSongs(){
            const response = await fetch('/api/songs');
            const songs = await response.json()
            setSongs(songs);
        }
        loadSongs();
    }, [])
    
    // example of how to create a song
    // it's not being used at the moment,
    // just for future reference
    /*
    async function createSong(){
        const response = await fetch('/api/songs', {
            method: "POST",
            body: JSON.stringify({
                title: "test song",
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
    }
    */

    return (
        <>
        <h2>Song List</h2>
            <ul>
                {songs.map(s => (
                    <li key={s.id}>{s.title}</li>
                ))}
            </ul>
        </>
    )
}