import {useState, useEffect} from "react";
import io from 'socket.io-client';
import SongCard from "../components/SongCard";
import SongDetails from "../components/SongDetails";

const socket = io("/api");

export default function Recommendations(){

    const [isConnected, setIsConnected] = useState(false);
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);

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
    }, []);

    const totalVotes = songs.reduce((sum, song) => sum + song.vote_count, 0) ?? 1; // avoid dividing by zero

    // the classNames don't do anything, it's just to make it more readable
    // but we could move the styling information into the css file
    // instead of doing it inline
    return (
        <div className="dj-page-container flex gap" style={{justifyContent: 'center', maxWidth: '1320px'}}>
            <div className="dj-page-column border-orange border-curved flex flex-column gap">
                <h2>Crowd Requests</h2>
                {songs.sort((a, b) => a.vote_count < b.vote_count ? 1 : -1).map(song => (
                    <SongCard
                        key={song.request_id}
                        song={song}
                        onClick={(song) => setSelectedSong(song)}
                        percentFilled={song.vote_count / totalVotes}
                        showDetails
                    />
                ))}
            </div>
            <div className="dj-page-column recommendations-column border-orange border-curved" style={{display: 'flex'}}>
                <SongDetails song={selectedSong} />
            </div>
        </div>
    );
}