import {useEffect, useState} from "react";

export default function Vote() {
    const [songs, setSongs] = useState([]);
    console.log("Hello")

    useEffect(() => {
        async function loadRequests() {
            const data = await fetch('http://localhost:8080/requests');
            const songs = await data.json()
            console.log("start")
            console.log(songs)
            console.log("end")
            setSongs(songs);
        }
        loadRequests();
    }, []);
    
    return (

        <div className="dj-page-container flex gap" style={{justifyContent: 'center', maxWidth: '1320px'}}>
            <div className="dj-page-column border-orange border-curved flex flex-column gap">
                <h2>Requested Songs</h2>
                {songs.map(song => (
                    <p key={song.request_id}>{song.title}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                        </svg>
                    </p>

                    ))}
            </div>
        </div>
    )
}
