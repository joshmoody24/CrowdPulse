import {useState, useEffect} from "react";
import io from 'socket.io-client';

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

    return (
        <div>
            <div>Hey there!</div>
            <div>Connection status: { isConnected ? 'True!' : 'False.' }</div>
            { songs.map(x => (
                <div key={ x.request_id }>
                    <h1>{ x.title }</h1>
                    { x.Recommendations.map(r => (
                        <div key={ r.recommendation_id }>
                            <p>{ r.title }</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}