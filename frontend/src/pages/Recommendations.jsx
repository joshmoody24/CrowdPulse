import {useState, useEffect} from "react";
import io from 'socket.io-client';
import SongCard from "../components/SongCard";

const socket = io("localhost:8080");

export default function Recommendations(){

    const [isConnected, setIsConnected] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('DJ Page');
        });

        socket.on('update', (data) => {
            console.log(data);
            setSongs(data);
        });

        return () => {
            socket.off('connect');
        }
    });

    // the classNames don't do anything, it's just to make it more readable
    // but we could move the styling information into the css file
    // instead of doing it inline
    return (
        <div className="dj-page-container flex gap" style={{justifyContent: 'center', maxWidth: '1320px'}}>
            <div className="dj-page-column border-orange border-curved flex flex-column gap">
                <h2>Crowd Requests</h2>
                {songs.map(song => (
                    <SongCard
                        key={song.request_id}
                        song={song}
                    />
                ))}
            </div>
            <div className="dj-page-column recommendations-column" style={{display: 'flex'}}>
                <h2>Recommendations</h2>
            </div>
        </div>
    );
}