import {useEffect, useState} from "react";

export default function Vote() {
    const [songs, setSongs] = useState([]);
    console.log("Hello")

    useEffect(() => {
        async function loadRequests() {
            const data = await fetch('/requests');
            const songs = await data.json()
            console.log("start")
            console.log(songs)
            console.log("end")
            setSongs(songs);
        }
        loadRequests();
    }, []);
    
    return (
        <div>
            {songs.map(song => (
                <p>{{song}}</p>
                ))}
        </div>
    )
}
